from datetime import timedelta
from fastapi import Depends, APIRouter, HTTPException, status
from auth.jwt_utils import create_access_token
from fastapi.security import OAuth2PasswordRequestForm
from database import get_users_collection
from utils import verify_password
from pymongo.collection import Collection


router = APIRouter(prefix="/auth")


@router.post("/token")
async def create_token(
    form: OAuth2PasswordRequestForm = Depends(),
    users_collection: Collection = Depends(get_users_collection)
):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Incorrect username or password",
        headers={"WWW-Authenticate": "Bearer"},
    )

    username = form.username
    password = form.password

    user = users_collection.find_one({"username": username})

    if user is None:
        raise credentials_exception

    if not verify_password(password, user["password"]):
        raise credentials_exception

    token = create_access_token({
        'sub': username
    }, timedelta(minutes=10))

    return {
        "access_token": token,
        "token_type": "bearer"
    }
