package models

import (
	"context"
	"log"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Student struct {
	T_email string             `json:"t_email" bson:"t_email"`
	ID      primitive.ObjectID `json:"_id" bson:"user_id"`
	Email   string             `json:"email" bson:"email"`
	Name    string             `json:"name" bson:"name"`
	Phone   string             `json:"phone" bson:"phone"`
}

type StudentService interface {
	Search_student() ([]Student, error)
	Create_student(student Student) error
	Delete_Student(id primitive.ObjectID) error
}

func (t *controllerOps) Search_student() ([]Student, error) {
	c := t.Client.Database("ET").Collection("student")
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	var students []Student
	cursor, err := c.Find(ctx, bson.M{})
	if err != nil {
		return nil, err
	}
	defer cursor.Close(ctx)
	for cursor.Next(ctx) {
		var s Student
		if err := cursor.Decode(&s); err != nil {
			return nil, err
		}
		students = append(students, s)
	}
	return students, nil
}

func (t *controllerOps) Create_student(student Student) error {
	c := t.Client.Database("ET").Collection("user")
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	new := bson.M{
		"t_email": student.T_email,
		"email":   student.Email,
		"phone":   student.Phone,
		"name":    student.Name,
	}
	if i, err := c.InsertOne(ctx, new); err != nil {
		return err
	} else {
		log.Println(i)
		return nil
	}
	// return nil
}

func (t *controllerOps) Delete_Student(id primitive.ObjectID) error {
	c := t.Client.Database("ET").Collection("student")
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
