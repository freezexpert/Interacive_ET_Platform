package server

import (
	"backend/controller"
	"net/http"
	"time"

	"github.com/gin-contrib/cors"
)

func (srv *server) routes() http.Handler {

	// srv.router.Use(gin.Logger())
	// srv.router.Use(gin.Recovery())

	srv.router.Use(cors.New(cors.Config{
		AllowAllOrigins:  true,
		AllowMethods:     []string{"POST, GET, OPTIONS, PUT, DELETE, UPDATE"},
		AllowHeaders:     []string{"Origin, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,

		MaxAge: 12 * time.Hour,
	}))

	controller := &controller.BaseController{
		Service: srv.service,
	}

	v1 := srv.router.Group("/")
	v1.Use()
	{
		v1.POST("/post_his", controller.PostHistory)
		v1.POST("/history", controller.GetHistory)
		v1.POST("/user_data", controller.UserData)
		v1.POST("/post_video", controller.PostVideo)
		v1.POST("/get_video", controller.GetVideo)
		v1.GET("/announcement", controller.GetAnnouncements)
		v1.POST("/announcement", controller.AddAnnouncement)
		v1.POST("/info", controller.AddInfo)
		v1.GET("/info", controller.GetInfo)
		v1.DELETE("info/:id", controller.DeleteInfo)
		v1.POST("/qa", controller.AddQA)
		v1.GET("/qa", controller.GetQA)
		v1.DELETE("qa/:id", controller.DeleteQA)
		// v1.POST("/student", controller.GetStudent)
		// v1.GET("/student", controller.AddStudent)
		// v1.DELETE("student/:id", controller.Delete_Student)

	}
	return srv.router
}
