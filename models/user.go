package models

import (
	"context"
	"log"
	"time"

	"go.mongodb.org/mongo-driver/bson"
)

type User struct {
	UserID    string    `json:"user_id" bson:"user_id"`
	Email     string    `json:"email" bson:"email"`
	Password  string    `json:"password" bson:"password"`
	Role      string    `json:"role" bson:"role"`
	Name      string    `json:"name" bson:"name"`
	Phone     string    `json:"phone" bson:"phone"`
	CreatedAt time.Time `json:"created_at" bson:"created_at"`
	UpdatedAt time.Time `json:"update_at" bson:"update_at"`
}

type UserService interface {
	Search_user(email string, password string) bool
	Create_user(user User) error
}

func (t *controllerOps) Search_user(email string, password string) bool {
	c := t.Client.Database("ET").Collection("user")
	// log.Println(id)
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	selector := bson.M{
		"email":    email,
		"password": password,
	}
	u := &User{}
	if err := c.FindOne(ctx, selector).Decode(u); err != nil {
		return false
	}

	new := bson.M{
		"updated_at": time.Now(),
	}
	if i, err := c.InsertOne(ctx, new); err != nil {
		return false
	} else {
		log.Println(i)
		return true
	}
	// log.Println(u)

}

func (t *controllerOps) Create_user(user User) error {
	c := t.Client.Database("ET").Collection("user")
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	selector := bson.M{
		"email": user.Email,
	}
	// check if the email and password are already used.
	u := &User{}
	if err := c.FindOne(ctx, selector).Decode(u); err == nil {
		return err
	}
	new := bson.M{
		"email":      user.Email,
		"password":   user.Password,
		"phone":      user.Phone,
		"name":       user.Name,
		"role":       user.Role,
		"created_at": time.Now(),
		"updated_at": time.Now(),
	}
	if i, err := c.InsertOne(ctx, new); err != nil {
		return err
	} else {
		log.Println(i)
		return nil
	}
	// return nil
}
