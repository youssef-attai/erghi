import { NextFunction, Response } from "express";
import jwt from 'jsonwebtoken'

import User from "../models/user.js";
import { ACCESS_TOKEN_SECRET_KEY } from "../env.js";
import { IAccessTokenPayload } from "../utils.js";
import { AuthenticatedRequest } from "../types/express.js";


export default async function (req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const { authorization } = req.headers

    if (!authorization) return res.status(401).json({ message: 'Unauthorized: missing Authorization header' })

    const accessToken = authorization.split(' ')[1]

    try {
        const { userId } = jwt.verify(accessToken, ACCESS_TOKEN_SECRET_KEY!) as IAccessTokenPayload
        
        const foundUser = await User.findById(userId)
        
        if (!foundUser) return res.status(403).json({ mesage: 'Forbidden: invalid access token' })

        req.userId = foundUser._id.toString()

        next()
    } catch (error) {
        return res.sendStatus(403)
    }
}