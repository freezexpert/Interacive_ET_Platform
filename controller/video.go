package controller

import (
	"backend/models"
	"fmt"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
)

func (ops *BaseController) GetVideo(c *gin.Context) {
	var request models.Video
	log.Printf("%v", c.Request)
	if err := c.ShouldBindJSON(&request); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid JSON data"})
		return
	}
	log.Println("Valid JSON data")
	ok, video, _ := ops.Service.Get_video(request.Email)
	if ok {
		HandleSucccessResponse(c, "", video)
		return
	} else {
		HandleFailedResponse(c, http.StatusNotFound, fmt.Errorf("user %s not found", video.Email))
	}
}

func (ops *BaseController) PostVideo(c *gin.Context) {
	email := c.PostForm("email")
	date := c.PostForm("date")
	description := c.PostForm("description")
	file, err := c.FormFile("file")
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "File upload failed"})
		return
	}

	video := models.Video{
		Email:       email,
		Date:        date,
		Description: description,
		Reply:       "",
	}

	err = ops.Service.Create_video(video, file)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to save video"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "File uploaded successfully"})
}
