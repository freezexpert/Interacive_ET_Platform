package models

import (
	"context"
	"time"

	"go.mongodb.org/mongo-driver/bson"
)

type Announcement struct {
	ID        string    `json:"id" bson:"id"`
	Text      string    `json:"text" bson:"text"`
	Timestamp time.Time `json:"timestamp" bson:"timestamp"`
}

type AnnouncementService interface {
	FetchAllAnnouncements() ([]Announcement, error)
	SaveAnnouncement(announcement Announcement) error
}

func (t *controllerOps) FetchAllAnnouncements() ([]Announcement, error) {
	c := t.Client.Database("ET").Collection("announcements")
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	var announcements []Announcement
	cursor, err := c.Find(ctx, bson.M{})
	if err != nil {
		return nil, err
	}
	defer cursor.Close(ctx)
	for cursor.Next(ctx) {
		var announcement Announcement
		if err := cursor.Decode(&announcement); err != nil {
			return nil, err
		}
		announcements = append(announcements, announcement)
	}
	return announcements, nil
}

func (t *controllerOps) SaveAnnouncement(announcement Announcement) error {
	c := t.Client.Database("ET").Collection("announcements")
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	_, err := c.InsertOne(ctx, announcement)
	return err
}
