from typing import List
from bson import ObjectId
from pydantic import BaseModel


class CreateRoomSchema(BaseModel):
    users: List[str]