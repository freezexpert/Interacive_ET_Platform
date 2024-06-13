package models

import (
	"context"
	"log"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type QA struct {
	ID       primitive.ObjectID `bson:"_id" json:"id"`
	Question string             `bson:"question" json:"question"`
	Answer   string             `bson:"answer" json:"answer"`
}

type QAService interface {
	FetchAllQA() ([]QA, error)
	CreateQA(qa QA) error
	DeleteQA(id primitive.ObjectID) error
}

func (t *controllerOps) FetchAllQA() ([]QA, error) {
	c := t.Client.Database("ET").Collection("qa")
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	var Q []QA
	cursor, err := c.Find(ctx, bson.M{})
	if err != nil {
		return nil, err
	}
	defer cursor.Close(ctx)
	for cursor.Next(ctx) {
		var q QA
		if err := cursor.Decode(&q); err != nil {
			return nil, err
		}
		Q = append(Q, q)
	}
	return Q, nil
}

func (t *controllerOps) CreateQA(qa QA) error {
	c := t.Client.Database("ET").Collection("qa")
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	new := bson.M{
		"_id,omitempty": qa.ID,
		"question":      qa.Question,
		"answer":        qa.Answer,
	}
	if i, err := c.InsertOne(ctx, new); err != nil {
		return err
	} else {
		log.Println(i)
		return nil
	}
}

func (t *controllerOps) DeleteQA(id primitive.ObjectID) error {
	c := t.Client.Database("ET").Collection("qa")
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
