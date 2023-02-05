from typing import Dict, List
from model.profile import Profile
from pydantic import BaseModel


class User(BaseModel):
    profile: Profile
    rooms: Dict[str, Dict[str, Profile]]
    password: str