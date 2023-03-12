import { Router } from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import Room from "../models/Room.js";

const router = Router();

router.get("/", isAuthenticated, async (req, res) => {
  const rooms = await Room.find(
    { users: req.session.userId },
    { _id: 1, roomName: 1 }
  );

  return res.json({ rooms });
});

router.get("/:id", isAuthenticated, async (req, res) => {
  const room = await Room.findById(req.params.id);
  return res.json({ room });
});

router.post("/", isAuthenticated, async (req, res) => {
  const room = new Room({
    roomName: req.body.roomName,
    users: [req.session.userId],
  });
  await room.save();
  return res.json({ room });
});

router.post('/:id/join', isAuthenticated, (req, res) => {
  // TODO: Add the current user to the room with the given id
});

export default router;