from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_jwt_extended import create_access_token, get_jwt, get_jwt_identity, \
    unset_jwt_cookies, jwt_required, JWTManager
from datetime import datetime, timezone, timedelta
from apidb import *
from apiuser import *
from werkzeug.security import generate_password_hash, check_password_hash
import json

app = Flask(__name__)
CORS(app)
app.secret_key = "super secret key"
app.config["JWT_SECRET_KEY"] = "please-remember-to-change-this"
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=1)
jwt = JWTManager(app)


@app.after_request
def refresh_expiring_jwts(response):
    try:
        exp_timestamp = get_jwt()["exp"]
        now = datetime.now(timezone.utc)
        target_timestamp = datetime.timestamp(now + timedelta(minutes=30))
        if target_timestamp > exp_timestamp:
            access_token = create_access_token(identity=get_jwt_identity())
            data = response.get_json()
            if type(data) is dict:
                data["access_token"] = access_token
                response.data = json.dumps(data)
        return response
    except (RuntimeError, KeyError):
        # Case where there is not a valid JWT. Just return the original respone
        return response


@app.route('/tasks', methods=['GET'])
def get_tasks():
    return jsonify(getAllTasks())


@app.route('/tasks', methods=['POST'])
@jwt_required()
def add_task():
    data = request.get_json()
    author = getUserByMail(get_jwt_identity())
    title = data['title']
    description = data['description']
    price = data['price']
    addTask(author, title, description, price)
    return jsonify({'message': 'Task added'}), 200


@app.route('/accept', methods=['POST'])
def accept_task():
    data = request.get_json()
    acceptor = data['acceptor']
    task_id = data['task_id']
    acceptTask(acceptor, task_id)
    return jsonify({'message': 'Task accepted'}), 200

@app.route('/complete', methods=['POST'])
@jwt_required()
def complete_task():
    data = request.get_json()
    task_id = data['task_id']
    username = getUserByMail(get_jwt_identity())
    completeTask(username, task_id)
    return jsonify({'message': 'Task completed'}), 200


@app.route('/register', methods=['POST'])
def signup():
    data = request.get_json()
    username = data['username']
    email = data['email']
    print(data)
    name_exist = name_already_exist(username)
    email_exist = mail_already_exist(email)
    if name_exist:
        return jsonify({"msg": "user_alr_exit"}), 401
    if email_exist:
        return jsonify({"msg": "mail_alr_exist"}), 401
    pwd = generate_password_hash(data['password'], method='sha256')
    addUser(username, email, pwd)
    return jsonify({"msg": "user_created"}), 200


@app.route('/login', methods=['POST'])
def connect():
    form = request.get_json()
    email_enter = form['email']
    mdp_enter = form['password']
    db = sqlite3.connect('./database.db')
    cursor = db.cursor()
    cursor.execute(
        """ SELECT password, username, id_user FROM users WHERE email = ?;""", (email_enter,))
    L = cursor.fetchall()
    db.close()
    if L == []:
        return {"msg": "user_dont_exist"}, 401
    else:
        mdp_crypt, name, id = L[0]
        if not (check_password_hash(mdp_crypt, mdp_enter)):
            return jsonify({"msg": "wrong_mdp"}), 401
        access_token = create_access_token(identity=email_enter)
        username = getUserByMail(email_enter)
        return jsonify({"access_token": access_token, "name": username}), 200


@app.route('/logout', methods=['POST'])
def logout():
    resp = jsonify({'logout': True})
    unset_jwt_cookies(resp)
    return resp, 200


@app.route('/profil', methods=['GET'])
@jwt_required()
def my_profile():
    identity = get_jwt_identity()
    acces_token = create_access_token(identity=identity)
    username = getUserByMail(identity)
    posted = getUserPosted(username)
    accepted = getUserAccepted(username)
    data = {"username": username, "posted": posted, "accepted": accepted, "access_token": acces_token}
    return jsonify(data), 200

@app.route('/username', methods=['GET'])
@jwt_required()
def get_username():
    identity = get_jwt_identity()
    username = getUserByMail(identity)
    data = {"username": username}
    return jsonify(data), 200

@app.route('/notePost', methods=['POST'])
def note_post():
    data = request.get_json()
    note = data['note']
    task_id = data['task_id']
    noteTaskPosted(note, task_id)
    return jsonify({'message': 'Task noted'}), 200

@app.route('/noteAccept', methods=['POST'])
def note_accept():
    data = request.get_json()
    note = data['note']
    task_id = data['task_id']
    noteTaskAccepted(note, task_id)
    return jsonify({'message': 'Task noted'}), 200



if __name__ == '__main__':
    app.run()
