from datetime import datetime, timedelta
from bson import ObjectId
from jose import JWTError, jwt
from fastapi import Depends, HTTPException, status
from pymongo.collection import Collection
from auth.oauth2_scheme import oauth2_scheme
from database.collections import get_users_collection
from schema.user import CurrentUser

SECRET_KEY = "potato"
ALGORITHM = "HS256"

def create_access_token(data: dict, expires_delta: timedelta):
    to_encode = data.copy()

    expire = datetime.utcnow() + expires_delta
    to_encode.update({"exp": expire})

    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


def get_current_user(
    token: str = Depends(oauth2_scheme),
    users_collection: Collection = Depends(get_users_collection)
) -> CurrentUser:
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )

    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: str = payload.get("sub")
        if user_id is None:
            raise credentials_exception
        
        user = users_collection.find_one({"_id": ObjectId(user_id)})
        if user is None:
            raise credentials_exception
        
    except JWTError:
        raise credentials_exception
    
    return CurrentUser(uid=user_id, profile=user["profile"], rooms=user["rooms"])
