from fastapi import APIRouter, Depends
from database import get_rooms_collection
from pymongo.collection import Collection
from schema.room import CreateRoomSchema


router = APIRouter(prefix="/room")


@router.post("/")
async def create_room(
    room: CreateRoomSchema,
    rooms_collection: Collection = Depends(get_rooms_collection)
):
    result = rooms_collection.insert_one(room.dict())
    return str(result.inserted_id)
