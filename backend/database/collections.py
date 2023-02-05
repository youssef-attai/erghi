from .client import db


def get_users_collection():
    users_collection = db.get_collection("users")
    return users_collection


def get_rooms_collection():
    rooms_collection = db.get_collection("rooms")
    return rooms_collection

