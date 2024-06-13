package models

import (
	"context"
	"fmt"
	"log"
	"mime/multipart"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

type Video struct {
	Email       string `json:"email" bson:"email"`
	Date        string `json:"date" bson:"date"`
	Description string `json:"description" bson:"description"`
	File        File   `json:"file" bson:"file"`
	Reply       string `json:"reply" bson:"reply"`
}

type File struct {
	Name string `json:"name" bson:"name"`
	// Content []byte `json:"content" bson:"content"`
}

type VideoService interface {
	Create_video(video Video, fileHeader *multipart.FileHeader) error
	Get_video(email string) (bool, Video, error)
}

func (t *controllerOps) Get_video(email string) (bool, Video, error) {
	c := t.Client.Database("ET").Collection("video")
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	selector := bson.M{
		"email": email,
	}

	v := &Video{}
	if err := c.FindOne(ctx, selector).Decode(v); err != nil {
		if err == mongo.ErrNoDocuments {
			return false, Video{}, fmt.Errorf("video not found for email %s", email)
		}
		return false, Video{}, err
	}

	// If no error occurred during decoding, return the fetched video
	return true, *v, nil
}

func (t *controllerOps) Create_video(video Video, fileHeader *multipart.FileHeader) error {
	c := t.Client.Database("ET").Collection("video")
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	file, err := fileHeader.Open()
	if err != nil {
		return err
	}
	defer file.Close()

	// fileContent, err := io.ReadAll(file)
	// if err != nil {
	// 	return err
	// }

	// Prepare the video file data
	videoFile := File{
		Name: fileHeader.Filename,
		// Content: fileContent,
	}

	video.File = videoFile

	new := bson.M{
		"email":       video.Email,
		"date":        video.Date,
		"description": video.Description,
		"file":        video.File,
		"reply":       video.Reply,
	}
	if i, err := c.InsertOne(ctx, new); err != nil {
		return err
	} else {
		log.Println(i)
		return nil
	}
	// return nil
}
