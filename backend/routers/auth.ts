import { Router, Request, Response } from 'express'
import bcrypt from 'bcrypt'
import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'

import User from '../models/user.js'
import { IRefreshTokenPayload, createAccessToken, createRefreshToken } from '../utils.js'
import { REFRESH_TOKEN_EXPIRE_SECONDS, REFRESH_TOKEN_SECRET_KEY } from '../env.js'
import Room from '../models/room.js'

const router = Router()

// Login endpoint
// Returns a new refresh token and an access token
// Stores the new refresh token in the database
// Removes the current refresh token from cookies (if exists)
router.post("/login", async (req: Request, res: Response) => {
    const { username, password } = req.body

    if (!username) return res.status(400).json({ 'message': 'username field is missing' })

    if (!password) return res.status(400).json({ 'message': 'password field is missing' })

    const foundUser = await User.findOne({ "profile.username": username })

    if (!foundUser) return res.sendStatus(401)
    const userId = foundUser._id

    if (!(await bcrypt.compare(password, foundUser.password))) return res.sendStatus(401)

    try {
        const refreshToken = createRefreshToken({ userId: userId.toString() })
        const accessToken = createAccessToken({ userId: userId.toString() })

        await foundUser.updateOne({
            $set: { refresh: refreshToken }
        })

        const userRooms = await Room.find({
            _id: { $in: foundUser.rooms.map(r => r.roomId) }
        })

        res.cookie('refresh', refreshToken, {
            httpOnly: true,
            sameSite: 'none',
            maxAge: REFRESH_TOKEN_EXPIRE_SECONDS,
            secure: true
        })

        return res.status(201).json({
            accessToken,
            user: {
                profile: {
                    username: foundUser.profile.username,
                    bio: foundUser.profile.bio
                },
                rooms: userRooms.map(r => { return { members: r.members, roomName: r.roomName, roomId: r._id.toString()}} )
            }
        })
    } catch (error) {
        console.log(error);
        return res.status(400)
    }
})

// Signup endpoint
// Creates a new user in the database
// Then logs the user in
router.post("/new", async (req: Request, res: Response) => {
    const { username, password } = req.body

    if (!username) {
        return res.status(400).json({ 'message': 'username field is missing' })
    }

    if (!password) {
        return res.status(400).json({ 'message': 'password field is missing' })
    }

    try {
        const userId = new mongoose.Types.ObjectId()
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const refreshToken = createRefreshToken({ userId: userId.toString() })
        const accessToken = createAccessToken({ userId: userId.toString() })

        const newUser = new User({
            profile: {
                username,
                bio: "Hey, there!"
            },
            password: hashedPassword,
            refresh: refreshToken
        })

        newUser._id = userId
        await newUser.save()

        res.cookie('refresh', refreshToken, {
            httpOnly: true,
            sameSite: 'none',
            maxAge: REFRESH_TOKEN_EXPIRE_SECONDS,
            secure: true
        })

        return res.status(201).json({
            accessToken,
            user: {
                profile: {
                    username: newUser.profile.username,
                    bio: newUser.profile.bio
                },
                rooms: []
            }
        })
    } catch (error) {
        console.log(error);
        return res.sendStatus(500)
    }
})

// Request access token endpoint
// Needs a valid refresh token in the cookies to work
router.get("/refresh", async (req: Request, res: Response) => {
    // Make sure a refresh token is sent
    if (!req.cookies.refresh) return res.status(401).json({ message: 'Unauthorized: missing refresh token' });

    const refreshToken = req.cookies.refresh;

    // Get the user with this refresh token
    const foundUser = await User.findOne({
        refresh: refreshToken
    })

    // If no user has this refresh token, then it is invalid
    if (!foundUser) return res.status(403).json({ message: 'Forbidden: invalid refresh token' });

    try {
        const decoded = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET_KEY!) as IRefreshTokenPayload

        const newRefreshToken = createRefreshToken({ userId: decoded.userId })
        const accessToken = createAccessToken({ userId: decoded.userId })

        await User.updateOne({ _id: decoded.userId }, {
            $set: {
                refresh: newRefreshToken
            }
        })

        const userRooms = await Room.find({
            _id: { $in: foundUser.rooms.map(r => r.roomId) }
        })

        res.cookie('refresh', newRefreshToken, {
            httpOnly: true,
            sameSite: 'none',
            maxAge: REFRESH_TOKEN_EXPIRE_SECONDS,
            secure: true
        })

        return res.status(200).json({
            accessToken,
            user: {
                profile: {
                    username: foundUser.profile.username,
                    bio: foundUser.profile.bio
                },
                rooms: userRooms.map(r => { return { members: r.members, roomName: r.roomName, roomId: r._id.toString()}} )
            }
        })
    } catch (error) {
        // Token might be expired
        console.log(error);
        return res.sendStatus(403)
    }
})

// Logout endpoint
// Removes the refresh token in the cookies from the database
router.get("/logout", async (req: Request, res: Response) => {
    if (!req.cookies.refresh) return res.sendStatus(204)

    const refreshToken = req.cookies.refresh

    try {
        await User.updateOne({ refresh: refreshToken }, {
            $set: { refresh: "" }
        })

        res.clearCookie('refresh', {
            httpOnly: true,
            sameSite: 'none',
            secure: true
        })

        return res.sendStatus(204)
    } catch (error) {
        console.log(error);
        return res.sendStatus(500)
    }
})

export default router