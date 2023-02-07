import jwt from 'jsonwebtoken'
import { ACCESS_TOKEN_EXPIRE_SECONDS, ACCESS_TOKEN_SECRET_KEY, REFRESH_TOKEN_EXPIRE_SECONDS, REFRESH_TOKEN_SECRET_KEY } from './env.js'

export interface IAccessTokenPayload {
    userId: string
}

export interface IRefreshTokenPayload {
    userId: string
}

export function createAccessToken({ userId }: IAccessTokenPayload) {
    return jwt.sign({ userId }, ACCESS_TOKEN_SECRET_KEY!, { expiresIn: `${ACCESS_TOKEN_EXPIRE_SECONDS!}s` })
}

export function createRefreshToken({ userId }: IRefreshTokenPayload) {
    return jwt.sign({ userId }, REFRESH_TOKEN_SECRET_KEY!, { expiresIn: `${REFRESH_TOKEN_EXPIRE_SECONDS!}s` })
}