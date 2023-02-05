from bson import ObjectId
import bson
from fastapi import APIRouter, Depends, HTTPException, status
from auth.jwt_utils import get_current_user
from pymongo.collection import Collection
from database.collections import get_rooms_collection, get_users_collection
from schema.room import CreateRoomSchema
from schema.user import CurrentUser


router = APIRouter(prefix="/room")


@router.post("/")
async def create_room(
    room: CreateRoomSchema,
    current_user: CurrentUser = Depends(get_current_user),
    rooms_collection: Collection = Depends(get_rooms_collection),
    users_collection: Collection = Depends(get_users_collection)
):
    for uid in room.users:
        try:
            if users_collection.count_documents({"_id": ObjectId(uid)}) != 1:
                raise HTTPException(
                    status.HTTP_400_BAD_REQUEST,
                    f"User {uid} does not exist"
                )
        except bson.errors.InvalidId:
            raise HTTPException(
                status.HTTP_400_BAD_REQUEST,
                f'Invalid ID: {uid}'
            )

    room.users.append(current_user.uid)
    result = rooms_collection.insert_one(room.dict())
    users_collection.update_many({"_id": {"$in": [ObjectId(i) for i in room.users]}}, {
        "$set": {
            f"rooms.{result.inserted_id}": {}
        }
    })
    return {"message": f"Created room {result.inserted_id}"}
