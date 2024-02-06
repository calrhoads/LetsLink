from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import relationship, validates
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.ext.hybrid import hybrid_property

from config import db, bcrypt

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'
    
    user_id = Column(Integer, primary_key=True)
    username = Column(String, unique=True, nullable=False)
    _password = Column(String, nullable=False)
    gender = Column(String)
    age = Column(Integer)
    location = Column(String)
    profile_pic = Column(String)
    bio = Column(String)
    preferences = Column(String)
    matches_as_matcher = relationship('Match', foreign_keys='Match.matcher_id', back_populates='matcher')
    matches_as_matchee = relationship('Match', foreign_keys='Match.matchee_id', back_populates='matchee')
    posts = relationship('Post', back_populates='user')

    serialize_rules = ('-matches_as_matcher.matcher','-matches_as_matchee.matchee','-posts.user')

    @hybrid_property
    def password_hash(self):
        raise AttributeError("Can't access this")
    
    @password_hash.setter
    def password_hash(self, password):
        hashed_password = bcrypt.generate_password_hash(password.encode('utf-8'))
        self._password_hash = hashed_password.decode('utf-8')

    def authenticate(self,password):
        return bcrypt.check_password_hash(self._password_hash, password.encode('utf-8'))
    
    @validates('user')
    def validate_trainer(self,key,value):
        if value:
            return value
        else:
            raise ValueError("Not valid user")

class Match(db.Model):
    __tablename__ = 'matches'
    
    match_id = Column(Integer, primary_key=True)
    matcher_id = Column(Integer, ForeignKey('users.user_id')) 
    matchee_id = Column(Integer, ForeignKey('users.user_id'))  

    matcher = relationship('User', foreign_keys='Match.matcher_id', back_populates='matches_as_matcher')
    matchee = relationship('User', foreign_keys='Match.matchee_id', back_populates='matches_as_matchee')

    serialize_rules = ('-matcher.matches_as_matcher','-matchee.matches_as_matchee')

class Message(db.Model):
    __tablename__ = 'messages'
    
    message_id = Column(Integer, primary_key=True)
    sender_id = Column(Integer, ForeignKey('users.user_id'))
    recipient_id = Column(Integer, ForeignKey('users.user_id'))
    body = Column(Text)
    created_at = Column(DateTime)

    sender = relationship('User', foreign_keys='Message.sender_id')
    recipient = relationship('User', foreign_keys='Message.recipient_id')

    serialize_rules = ('-sender','-recipient')

class Post(db.Model):
    __tablename__ = 'posts'
    
    post_id = Column(Integer, primary_key=True)
    title = Column(String)
    body = Column(Text)
    user_id = Column(Integer, ForeignKey('users.user_id'))
    status = Column(String)
    created_at = Column(DateTime)

    user = relationship('User', back_populates='posts')

    serialize_rules = ('-user.posts',)