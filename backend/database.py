from fastapi import Depends
from pymongo import MongoClient
from pymongo.collection import Collection
from auth.jwt_utils import get_user_id

from env import MONGODB_CONNECTION_URL

client = MongoClient(MONGODB_CONNECTION_URL)
db = client.get_database('test_database')


def get_users_collection():
    users_collection = db.get_collection("users")
    return users_collection


def get_rooms_collection():
    rooms_collection = db.get_collection("rooms")
    return rooms_collection


def get_user_rooms(
    user_id: str = Depends(get_user_id),
    rooms_collection: Collection = Depends(get_rooms_collection)
):
    # Get all rooms with user_id in the users field
    all_rooms = rooms_collection.find({"users": user_id})
    return all_rooms
