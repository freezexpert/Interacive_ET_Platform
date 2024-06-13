package models

import (
	"context"
	"log"
	"time"

	"go.mongodb.org/mongo-driver/bson"
)

type History struct {
	From  string `json:"from" bson:"from"`
	To    string `json:"to" bson:"to"`
	Chats []Chat `json:"chats" bson:"chats"`
}

type Chat struct {
	Sender   string `json:"sender" bson:"sender"`
	Content  string `json:"content" bson:"content"`
	Time     string `json:"time" bson:"time"`
	Date     string `json:"date" bson:"date"`
	Fulltime string `json:"fulltime" bson:"fulltime"`
}

type HistoryService interface {
	Search_chat(id string) (bool, []Chat)
	Create_chat(his History) error
	Insert_chat(to string, chats []Chat) error
	// Delete_db(id string) error

}

func (t *controllerOps) Search_chat(email string) (bool, []Chat) {
	c := t.Client.Database("ET").Collection("history")
	// log.Println(id)
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	selector := bson.M{
		"$or": []bson.M{
			{"from": email},
			{"to": email},
		},
	}
	u := &History{}
	if err := c.FindOne(ctx, selector).Decode(u); err != nil {
		return false, nil
	}
	// log.Println(u)
	return true, u.Chats
}

func (t *controllerOps) Create_chat(his History) error {
	c := t.Client.Database("ET").Collection("history")
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	new := bson.M{
		"from":  his.From,
		"to":    his.To,
		"chats": his.Chats,
	}
	if i, err := c.InsertOne(ctx, new); err != nil {
		return err
	} else {
		log.Println(i)
		return nil
	}
	// return nil
}

func (t *controllerOps) Insert_chat(to string, chats []Chat) error {
	c := t.Client.Database("ET").Collection("history")
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	selector := bson.M{
		"to": to,
	}
	u := &History{}
	if err := c.FindOne(ctx, selector).Decode(u); err != nil {
		return err
	} else {
		u.Chats = append(u.Chats, chats...)
		_, err = c.UpdateOne(ctx, selector, bson.M{"$set": u})
		if err != nil {
			return err
		}
		log.Print(u.Chats)
	}
	return nil
}
