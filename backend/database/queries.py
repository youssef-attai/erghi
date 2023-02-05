from fastapi import Depends
from pymongo.collection import Collection
from auth.jwt_utils import get_current_user
from database.collections import get_rooms_collection
from schema.user import CurrentUser


def get_user_rooms(
    current_user: CurrentUser = Depends(get_current_user),
    rooms_collection: Collection = Depends(get_rooms_collection)
):
    # Get all rooms with user_id in the users field
    all_rooms = rooms_collection.find({"users": current_user.uid})
    return all_rooms
