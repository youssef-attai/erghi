from typing import List
from bson import ObjectId
from pydantic import BaseModel


class Room(BaseModel):
    users: List[ObjectId]
    