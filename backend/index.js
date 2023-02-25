import express from "express";
import sessions from 'express-session';
import connectDB from "./database.js";
import { SESSION_SECRET } from './env.js';

connectDB();

const app = express();

app.use(sessions({
    secret: SESSION_SECRET,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24
    },
    resave: true,
    saveUninitialized: false,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(3000, () => {
    console.log('Server started: http://localhost:3000');
});
