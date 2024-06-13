package controller

import (
	"backend/models"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
)

func (ops *BaseController) GetAnnouncements(c *gin.Context) {
	announcements, err := ops.Service.FetchAllAnnouncements()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch announcements"})
		return
	}
	c.JSON(http.StatusOK, announcements)
}

func (ops *BaseController) AddAnnouncement(c *gin.Context) {
	var announcement models.Announcement
	if err := c.BindJSON(&announcement); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid JSON"})
		return
	}
	announcement.Timestamp = time.Now()
	err := ops.Service.SaveAnnouncement(announcement)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to save announcement"})
		return
	}
	c.JSON(http.StatusOK, announcement)
}
