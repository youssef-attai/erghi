from fastapi import APIRouter, Depends
from pymongo.collection import Collection

from database import get_users_collection
from model.profile import Profile
from model.user import User
from schema.user import CreateUserSchema
from utils import hash_password

router = APIRouter(prefix="/user")


@router.post("/")
async def create_user(
    user: CreateUserSchema,
    users_collection: Collection = Depends(get_users_collection)
):
    new_user = User(
        profile=Profile(
            username=user.username,
            bio=""
        ),
        rooms=[],
        password=hash_password(user.password)
    )

    result = users_collection.insert_one(new_user.dict())
    return str(result.inserted_id)
