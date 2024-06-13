package controller

import (
	"backend/models"
	"net/http"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func (ops *BaseController) GetQA(c *gin.Context) {
	info, err := ops.Service.FetchAllQA()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch infomation"})
		return
	}
	c.JSON(http.StatusOK, info)
}

func (ops *BaseController) AddQA(c *gin.Context) {
	var qa models.QA
	if err := c.BindJSON(&qa); err != nil {
		HandleFailedResponse(c, http.StatusBadRequest, err)
		return
	}
	err := ops.Service.CreateQA(qa)
	if err != nil {
		HandleFailedResponse(c, http.StatusBadRequest, err)
		return
	}
	c.JSON(http.StatusOK, qa)
}

func (ops *BaseController) DeleteQA(c *gin.Context) {
	id := c.Param("id")
	objID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		HandleFailedResponse(c, http.StatusBadRequest, err)
		return
	}
	err = ops.Service.DeleteQA(objID)
	if err != nil {
		HandleFailedResponse(c, http.StatusBadRequest, err)
		return
	}
	HandleSucccessResponse(c, "")
}
