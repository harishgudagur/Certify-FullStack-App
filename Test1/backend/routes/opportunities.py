from flask import Blueprint, request, jsonify

from models import db, Opportunity

import jwt

opportunities = Blueprint(
    'opportunities',
    __name__
)

SECRET_KEY = "qatar_foundation_secret_key"


def get_admin_id(request):

    auth_header = request.headers.get(
        'Authorization'
    )

    if not auth_header:
        return None

    try:

        token = auth_header.split(" ")[1]

        data = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=["HS256"]
        )

        return data['admin_id']

    except:
        return None


@opportunities.route(
    '/opportunities',
    methods=['GET']
)
def get_opportunities():

    admin_id = get_admin_id(request)

    if not admin_id:
        return jsonify({
            "error": "Unauthorized"
        }), 401

    opportunities = Opportunity.query.filter_by(
        admin_id=admin_id
    ).all()

    result = []

    for opp in opportunities:

        result.append({

            "id": opp.id,

            "name": opp.name,

            "duration": opp.duration,

            "start_date": opp.start_date,

            "description": opp.description,

            "skills": opp.skills,

            "category": opp.category,

            "future_opportunities":
            opp.future_opportunities,

            "max_applicants":
            opp.max_applicants
        })

    return jsonify(result)


@opportunities.route(
    '/opportunities',
    methods=['POST']
)
def create_opportunity():

    admin_id = get_admin_id(request)

    data = request.get_json()

    new_opp = Opportunity(

        admin_id=admin_id,

        name=data['name'],

        duration=data['duration'],

        start_date=data['start_date'],

        description=data['description'],

        skills=data['skills'],

        category=data['category'],

        future_opportunities=data[
            'future_opportunities'
        ],

        max_applicants=data.get(
            'max_applicants'
        )
    )

    db.session.add(new_opp)

    db.session.commit()

    return jsonify({
        "message":
        "Opportunity created successfully"
    })


@opportunities.route(
    '/opportunities/<int:id>',
    methods=['PUT']
)
def update_opportunity(id):

    admin_id = get_admin_id(request)

    opportunity = Opportunity.query.filter_by(
        id=id,
        admin_id=admin_id
    ).first()

    data = request.get_json()

    opportunity.name = data['name']

    opportunity.duration = data['duration']

    opportunity.start_date = data[
        'start_date'
    ]

    opportunity.description = data[
        'description'
    ]

    opportunity.skills = data['skills']

    opportunity.category = data[
        'category'
    ]

    opportunity.future_opportunities = data[
        'future_opportunities'
    ]

    opportunity.max_applicants = data.get(
        'max_applicants'
    )

    db.session.commit()

    return jsonify({
        "message":
        "Opportunity updated"
    })


@opportunities.route(
    '/opportunities/<int:id>',
    methods=['DELETE']
)
def delete_opportunity(id):

    admin_id = get_admin_id(request)

    opportunity = Opportunity.query.filter_by(
        id=id,
        admin_id=admin_id
    ).first()

    db.session.delete(opportunity)

    db.session.commit()

    return jsonify({
        "message":
        "Opportunity deleted"
    })
