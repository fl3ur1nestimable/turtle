from flask import Flask, request, jsonify
from flask_cors import CORS
from apidb import *

app = Flask(__name__)
CORS(app)

liste = [
    { "author" : "", "title" : "", "description" : "", "price" : "", "status" : "" },
]

@app.route('/liste', methods=['GET'])
def get_liste():
    getAllTasks()

@app.route('/liste', methods=['POST'])
def add_element():
    # Récupération des données du formulaire
    data = request.get_json()
    author = data['author']
    title = data['title']
    description = data['description']
    price = data['price']
    print(author, title, description, price)
    addTask(author, title, description, price)
    return jsonify({'message': 'Book added successfully'})  

if __name__ == '__main__':
    app.run()
