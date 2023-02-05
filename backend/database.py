from pymongo import MongoClient
from pymongo.collection import Collection
from env import MONGODB_CONNECTION_URL

client = MongoClient(MONGODB_CONNECTION_URL)
db = client.get_database('test_database')


def get_users_collection():
    users_collection = db.get_collection("users")
    return users_collection


def get_rooms_collection():
    rooms_collection = db.get_collection("rooms")
    return rooms_collection
