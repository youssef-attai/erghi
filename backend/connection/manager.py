from typing import List, Dict
from fastapi import WebSocket


class ConnectionManager:
    def __init__(self) -> None:
        # Room = { room_id: list of connected users }
        self.rooms: Dict[str, List[WebSocket]] = dict()

    async def connect(self, room_id: str, websocket: WebSocket):
        # If room with ID `room_id` does not exist
        if self.rooms.get(room_id, None) is None:
            # Create an empty room with ID `room_id`
            self.rooms[room_id] = []

        # Add a new connection to this room
        await websocket.accept()
        self.rooms[room_id].append(websocket)

    def disconnect(self, room_id: str, websocket: WebSocket):
        # Remove the connection from the room
        self.rooms[room_id].remove(websocket)

        # If the room became empty
        if len(self.rooms[room_id]) == 0:
            # Delete the room
            del self.rooms[room_id]

    async def broadcast(self, message: dict):
        room_id = message["room_id"]

        if self.rooms.get(room_id, None) is None:
            return

        for websocket in self.rooms[room_id]:
            await websocket.send_json(message)


