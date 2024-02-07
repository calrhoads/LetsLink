#!/usr/bin/env python3

# Standard library imports
from random import randint

# Remote library imports
from faker import Faker
from werkzeug.security import generate_password_hash
# Local imports
from app import app
from models import db, User, Match, Message, Post

fake = Faker()

def generate_fake_data():
    users = []
    for _ in range(10): 
        user = User(
            username=fake.user_name(),
            # password_hash=123,  
            gender=fake.random_element(elements=('Male', 'Female')),
            age=randint(18, 60),
            location=fake.city(),
            profile_pic=fake.image_url(),
            bio=fake.text(),
            preferences=fake.text()
        )
        user.password_hash = '123'
        users.append(user)

    matches = []
    for i in range(10):  
        match = Match(
            matcher=users[i],
            matchee=users[(i + 1) % 10]  
        )
        matches.append(match)

    messages = []
    for i in range(10):  
        message = Message(
            sender=users[i],
            recipient=users[(i + 1) % 10],  
            body=fake.text(),
            created_at=fake.date_time_this_year()
        )
        messages.append(message)

    posts = []
    for user in users: 
        post = Post(
            user=user,
            title=fake.sentence(),
            body=fake.paragraph(),
            status=fake.random_element(elements=('Draft', 'Published')),
            created_at=fake.date_time_this_year()
        )
        posts.append(post)

    return users, matches, messages, posts

if __name__ == '__main__':
    with app.app_context():
        print("Starting seed...")

        users, matches, messages, posts = generate_fake_data()

        db.session.add_all(users)
        db.session.add_all(matches)
        db.session.add_all(messages)
        db.session.add_all(posts)
        db.session.commit()
        
        print("Seed completed.")
