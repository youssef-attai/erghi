from fastapi import APIRouter, Depends
from pymongo.collection import Collection
from database.collections import get_users_collection
from model.profile import Profile
from model.user import User
from schema.user import CreateUser
from utils import hash_password

router = APIRouter(prefix="/user")


@router.post("/")
async def create_user(
    user: CreateUser,
    users_collection: Collection = Depends(get_users_collection)
):
    new_user = User(
        profile=Profile(
            username=user.username,
            bio="Hey, there!"
        ),
        rooms=[],
        password=hash_password(user.password)
    )

    result = users_collection.insert_one(new_user.dict())
    return {"message": f"Created user {result.inserted_id}"}
