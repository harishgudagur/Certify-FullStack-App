from flask import Blueprint, request, jsonify

from models import db, Admin

from flask_bcrypt import Bcrypt

import jwt
import datetime

auth = Blueprint('auth', __name__)

bcrypt = Bcrypt()

SECRET_KEY = "qatar_foundation_secret_key"


@auth.route('/signup', methods=['POST'])
def signup():

    data = request.get_json()

    full_name = data.get('full_name')
    email = data.get('email')
    password = data.get('password')
    confirm_password = data.get(
        'confirm_password'
    )

    if not all([
        full_name,
        email,
        password,
        confirm_password
    ]):
        return jsonify({
            "error": "All fields required"
        }), 400

    if len(password) < 8:
        return jsonify({
            "error": "Password must be at least 8 characters"
        }), 400

    if password != confirm_password:
        return jsonify({
            "error": "Passwords do not match"
        }), 400

    existing_user = Admin.query.filter_by(
        email=email
    ).first()

    if existing_user:
        return jsonify({
            "error": "Account already exists"
        }), 400

    hashed_password = bcrypt.generate_password_hash(
        password
    ).decode('utf-8')

    new_admin = Admin(
        full_name=full_name,
        email=email,
        password=hashed_password
    )

    db.session.add(new_admin)

    db.session.commit()

    return jsonify({
        "message": "Signup successful"
    }), 201


@auth.route('/login', methods=['POST'])
def login():

    data = request.get_json()

    email = data.get('email')

    password = data.get('password')

    user = Admin.query.filter_by(
        email=email
    ).first()

    if not user or not bcrypt.check_password_hash(
        user.password,
        password
    ):
        return jsonify({
            "error": "Invalid email or password"
        }), 401

    token = jwt.encode(
        {
            "admin_id": user.id,
            "exp": datetime.datetime.utcnow()
            + datetime.timedelta(hours=24)
        },
        SECRET_KEY,
        algorithm="HS256"
    )

    return jsonify({
        "token": token
    })


@auth.route('/forgot-password', methods=['POST'])
def forgot_password():

    return jsonify({
        "message":
        "If the email exists, reset link generated"
    })
