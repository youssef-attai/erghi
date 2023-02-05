from typing import Dict
from pydantic import BaseModel

from model.profile import Profile


class CreateUser(BaseModel):
    username: str
    password: str


class CurrentUser(BaseModel):
    uid: str
    profile: Profile
    rooms: Dict[str, Dict[str, Profile]]