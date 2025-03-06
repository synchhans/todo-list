from flask import Blueprint, jsonify, request
from models import Task
from extensions import db
from utils import logger

bp = Blueprint("api", __name__)

@bp.route("/tasks", methods=["GET"])
def get_tasks():
    tasks = Task.query.all()
    logger.info("get_tasks", task_count=len(tasks))
    return jsonify([task.to_dict() for task in tasks])

@bp.route("/tasks", methods=["POST"])
def add_task():
    data = request.get_json()
    if not data or "title" not in data:
        logger.warning("add_task_invalid_input", data=data)
        return jsonify({"error": "Title is required"}), 400

    new_task = Task(title=data["title"], is_completed=False)
    db.session.add(new_task)
    db.session.commit()
    logger.info("add_task_success", task_id=new_task.id, title=new_task.title)
    return jsonify({"message": "Task added successfully!", "task": new_task.to_dict()}), 201

@bp.route("/tasks/<int:task_id>", methods=["PUT"])
def update_task(task_id):
    task = Task.query.get_or_404(task_id)
    data = request.get_json()
    task.title = data.get("title", task.title)
    task.is_completed = data.get("is_completed", task.is_completed)
    db.session.commit()
    logger.info("update_task_success", task_id=task.id, title=task.title)
    return jsonify({"message": "Task updated successfully!", "task": task.to_dict()})

@bp.route("/tasks/<int:task_id>", methods=["DELETE"])
def delete_task(task_id):
    task = Task.query.get_or_404(task_id)
    db.session.delete(task)
    db.session.commit()
    logger.info("delete_task_success", task_id=task.id, title=task.title)
    return jsonify({"message": "Task deleted successfully!"})