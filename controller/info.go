package controller

import (
	"backend/models"
	"net/http"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func (ops *BaseController) GetInfo(c *gin.Context) {
	info, err := ops.Service.FetchAllInfo()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch infomation"})
		return
	}
	c.JSON(http.StatusOK, info)
}

func (ops *BaseController) AddInfo(c *gin.Context) {
	var info models.Information
	if err := c.BindJSON(&info); err != nil {
		HandleFailedResponse(c, http.StatusBadRequest, err)
		return
	}
	err := ops.Service.CreateInfo(info)
	if err != nil {
		HandleFailedResponse(c, http.StatusBadRequest, err)
		return
	}
	c.JSON(http.StatusOK, info)
}

func (ops *BaseController) DeleteInfo(c *gin.Context) {
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
