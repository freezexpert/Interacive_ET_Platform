package models

import (
	"context"
	"log"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Information struct {
	ID   primitive.ObjectID `bson:"_id" json:"id"`
	Name string             `bson:"name" json:"name"`
	URL  string             `bson:"url" json:"url"`
}

type InfoService interface {
	FetchAllInfo() ([]Information, error)
	CreateInfo(info Information) error
	DeleteInfo(id primitive.ObjectID) error
}

func (t *controllerOps) FetchAllInfo() ([]Information, error) {
	c := t.Client.Database("ET").Collection("info")
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	var info []Information
	cursor, err := c.Find(ctx, bson.M{})
	if err != nil {
		return nil, err
	}
	defer cursor.Close(ctx)
	for cursor.Next(ctx) {
		var i Information
		if err := cursor.Decode(&i); err != nil {
			return nil, err
		}
		info = append(info, i)
	}
	return info, nil
}

func (t *controllerOps) CreateInfo(info Information) error {
	c := t.Client.Database("ET").Collection("info")
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	new_id := primitive.NewObjectID()
	new := bson.M{
		"_id":  new_id,
		"name": info.Name,
		"url":  info.URL,
	}
	if i, err := c.InsertOne(ctx, new); err != nil {
		return err
	} else {
		log.Println(i)
		return nil
	}
}

func (t *controllerOps) DeleteInfo(id primitive.ObjectID) error {
	c := t.Client.Database("ET").Collection("info")
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	selector := bson.M{
		"_id": id,
	}
	_, err := c.DeleteOne(ctx, selector)
	if err != nil {
		return err
	}
	return nil
}
