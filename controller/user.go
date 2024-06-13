package controller

import (
	"backend/models"
	"fmt"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
)

func (ops *BaseController) UserData(c *gin.Context) {
	var request models.User
	log.Printf("%v", c.Request)
	if err := c.ShouldBindJSON(&request); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid JSON data"})
		return
	}
	log.Println("Valid JSON data")
	if request.UserID == "" {
		ok := ops.Service.Create_user(request)
		if ok == nil {
			HandleSucccessResponse(c, "")
			return
		} else {
			HandleFailedResponse(c, http.StatusNotFound, fmt.Errorf("user %s not found", request.UserID))
		}
	} else {
		ok := ops.Service.Search_user(request.Email, request.Password)
		if ok {
			HandleSucccessResponse(c, "")
			return
		} else {
<<<<<<< HEAD
			HandleFailedResponse(c, http.StatusNotFound, fmt.Errorf("invalid syntax"))
		}
	}
=======
			HandleFailedResponse(c, http.StatusNotFound, fmt.Errorf("user %s not found", request.UserID))
		}
	}

>>>>>>> 0e73da2e318323ef157d3826be930a5761002671
}
