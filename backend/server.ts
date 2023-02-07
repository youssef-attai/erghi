import express, { Express } from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

import authRouter from './routers/auth.js'
import roomRouter from './routers/room.js'

import { PORT } from './env.js'
import './database/database.js'

const app: Express = express()

app.use(cookieParser())
app.use(cors({
    origin: ['http://127.0.0.1:5173', 'http://localhost:5173'],
    credentials: true
}))
app.use(express.json())

app.use('/auth', authRouter)
app.use('/room', roomRouter)

app.listen(PORT, () => {
    console.log(`Server running on http://127.0.0.1:${PORT}`)
})