package controller

import (
	"backend/models"
	"net/http"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func (ops *BaseController) GetStudent(c *gin.Context) {
	student, err := ops.Service.Search_student()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch infomation"})
		return
	}
	c.JSON(http.StatusOK, student)
}

func (ops *BaseController) AddStudent(c *gin.Context) {
	var s models.Student
	if err := c.BindJSON(&s); err != nil {
		HandleFailedResponse(c, http.StatusBadRequest, err)
		return
	}
	err := ops.Service.Create_student(s)
	if err != nil {
		HandleFailedResponse(c, http.StatusBadRequest, err)
		return
	}
	c.JSON(http.StatusOK, s)
}

func (ops *BaseController) Delete_Student(c *gin.Context) {
	id := c.Param("id")
	objID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		HandleFailedResponse(c, http.StatusBadRequest, err)
		return
	}
	err = ops.Service.DeleteInfo(objID)
	if err != nil {
		HandleFailedResponse(c, http.StatusBadRequest, err)
		return
	}
	HandleSucccessResponse(c, "")
}
