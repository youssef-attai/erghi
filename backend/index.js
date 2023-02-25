import express from "express";
import sessions from 'express-session';
import connectDB from "./database.js";

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(3000, () => {
    console.log('Server started: http://localhost:3000');
});
