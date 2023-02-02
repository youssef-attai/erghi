from pymongo import MongoClient

from env import MONGODB_CONNECTION_URL

client = MongoClient(MONGODB_CONNECTION_URL)
db = client.get_database('test_database')
collection = db.get_collection('test_collection')
