from fastapi import APIRouter, Depends, WebSocket, WebSocketDisconnect

from connection.manager import ConnectionManager
from database import get_user_rooms

router = APIRouter("/ws")

room_manager = ConnectionManager()

@router.websocket("/")
async def connect(websocket: WebSocket, rooms = Depends(get_user_rooms)):
    for room_id in rooms:
        await room_manager.connect(room_id, websocket)

    try:
        while True:
            message = await websocket.receive_json()
            await room_manager.broadcast(message)
    except WebSocketDisconnect:
        for room_id in rooms:
            room_manager.disconnect(room_id, websocket)
