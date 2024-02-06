from flask import request, session, make_response, jsonify, redirect, url_for, render_template
from sqlalchemy import func
from config import app, db, CORS
from models import db, User, Match, Message, Post


@app.route('/')
def home():
    if 'user_id' not in session:
        return redirect(url_for('login'))
    else:
        return redirect(url_for('swipe'))

@app.before_request
def route_filter():
    bypass_routes = ["signup","login"]
    if request.endpoint not in bypass_routes and not session.get("user_id"):
        return {"Error": "Unauthorized"},401

@app.route('/signup', methods = ['POST'])
def signup():
    if request.method == 'POST':
        try:
            data = request.get_json()
            new_user = User(
                username = data["username"],
                _password = data["password"]

            )
            new_user.password_hash = data["password"]
            db.session.add(new_user)
            db.session.commit()
            session['user_id'] = new_user.user_id
            return new_user.to_dict(rules = ()),201
        except Exception as e:
            print(e)
            return {"Error": "Could not make user"},422
        
@app.route('/checksession',methods=['GET'])
def check_session():
    if request.method == 'GET':
        print(session)
        user = User.query.filter(User.user_id == session["user_id"]).first()
        return user.to_dict(rules = ()),200

@app.route('/login', methods=['POST'])
def login():
    if request.method == 'POST':
        data = request.get_json()
        user = User.query.filter(User.username == data['username']).first()
        if user and user.authenticate(data['password']):
            session['user_id'] = user.user_id
            print(session)
            return user.to_dict(rules = ()), 200
        else:
            return {"Error": "Not a valid username or password"}, 401
        
@app.route('/logout', methods=['DELETE'])
def logout():
    if request.method == 'DELETE':
        session['user_id'] = None
        return {},204

@app.route('/users', methods=['GET'])
def users():
    if request.method == 'GET':
        current_user_id = session.get('user_id')
        all_users = User.query.filter(User.user_id != current_user_id).all()
        dict_users = [user.to_dict() for user in all_users]
        return jsonify(dict_users), 200

@app.route('/swipe')
def swipe():
    if 'user_id' not in session:
        return redirect(url_for('login')) 
    
    current_user_id = session.get('user_id')
    random_user = User.query.filter(User.user_id != current_user_id).order_by(func.random()).first()
    
    return render_template('swipe.html', user=random_user)

if __name__ == '__main__':
    app.run(port=5555, debug=True)
