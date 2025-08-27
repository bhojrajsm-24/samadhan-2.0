// task-5 of hackathon.....
from flask import Flask, jsonify

app = Flask(__name__)

# Sample students data
students = [
    {"id": 1, "name": "Amit", "age": 20, "course": "CSE"},
    {"id": 2, "name": "Neha", "age": 21, "course": "IT"},
    {"id": 3, "name": "Rahul", "age": 19, "course": "AIDS"}
]

@app.route('/students', methods=['GET'])
def get_students():
    return jsonify(students)

if __name__ == '__main__':
    app.run(debug=True)
