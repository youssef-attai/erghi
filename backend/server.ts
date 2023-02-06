import express, { Express } from 'express'

import authRouter from './routers/auth.js';

import { PORT } from './env.js';
import './database/database.js';

const app: Express = express()

app.use('/auth', authRouter);

app.listen(PORT, () => {
    console.log(`Server running on http://127.0.0.1:${PORT}`);
})