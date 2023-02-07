import { Router, Response } from "express";
import mongoose from "mongoose";

import isAuthenticated from "../middlewares/isAuthenticated.js";
import Room from "../models/room.js";
import User from "../models/user.js";
import { AuthenticatedRequest } from "../types/express.js";

const router = Router()

router.post('/', isAuthenticated, async (req: AuthenticatedRequest, res: Response) => {
    const roomId = new mongoose.Types.ObjectId()

    const members = [req.userId, ...req.body.members]

    try {
        const newRoom = new Room({
            roomName: req.body.roomName,
            members
        })
        newRoom._id = roomId

        await User.updateMany({ _id: { $in: members } }, {
            $push: { rooms: { roomId } }
        })
        await newRoom.save()

        return res.status(201).json({ message: `Created room with ID: ${roomId}` })
    } catch (error) {
        return res.status(400).json({ message: 'Invalid user IDs' })
    }
})

export default router