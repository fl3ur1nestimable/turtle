from flask import Flask, request, jsonify, flash, redirect, session
from flask_cors import CORS
from apidb import *
from apiuser import *
from werkzeug.security import generate_password_hash,check_password_hash

app = Flask(__name__)
CORS(app)

@app.route('/tasks', methods=['GET'])
def get_tasks():
    return jsonify(getAllTasks())

@app.route('/tasks', methods=['POST'])
def add_task():
    data = request.get_json()
    author = data['author']
    title = data['title']
    description = data['description']
    price = data['price']
    addTask(author, title, description, price)
    return jsonify({'message': 'Task added'}),200

@app.route('/accept', methods=['POST'])
def accept_task():
    data = request.get_json()
    acceptor = data['acceptor']
    task_id = data['task_id']
    acceptTask(acceptor, task_id)
    return jsonify({'message': 'Task accepted'}),200

@app.route('/complete', methods=['POST'])
def complete_task():
    data = request.get_json()
    task_id = data['task_id']
    completeTask(task_id)
    return jsonify({'message': 'Task completed'}),200

@app.route('/register',methods=['POST'])
def signup():
    data = request.get_json()
    username = data['username']
    email = data['email']
    name_exist = name_already_exist(username)
    email_exist = mail_already_exist(email)
    if name_already_exist :
        flash("This username already exist")
        return {"msg" : "user_alr_exit"},401
    if mail_already_exist:
        flash("This email is already registered")
        return {"msg" : "mail_alr_exist"},401
    pwd = generate_password_hash(data['password'],method='sha256')
    addUser(username,email,pwd)
    session['name']=username
    id = get_id(username)
    session['id']=id
    
@app.route('/login', methods=['POST'])
def connect():
    form = request.get_json()
    email_enter=form['email']
    mdp_enter=form['password']
    db = sqlite3.connect('./database.db')
    cursor = db.cursor()
    cursor.execute(""" SELECT password, username, id_user FROM users WHERE email = ?;""",(email_enter,))
    L = cursor.fetchall()
    db.close()
    if L==[]:
        flash("Ce compte n'existe pas")
        return {"msg" : "user_dont_exist"},401
    else:
        mdp_crypt, name, id = L[0]
        if not(check_password_hash(mdp_crypt,mdp_enter)) :
            flash("Oups, le mail ou mot de passe est éronné")
            return {"msg" : "wrong_mdp"},401
        session['name']= name
        session['id']=id


if __name__ == '__main__':
    app.run()