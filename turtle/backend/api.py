from flask import Flask, request, jsonify
from flask_cors import CORS
from apidb import *

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