import mongoose from "mongoose";
import { MONGODB_CONNECTION_URL } from './env.js'

mongoose.connect(MONGODB_CONNECTION_URL);

const db = mongoose.connection;

db.on("error", (err) => {
    console.error(err);
});

db.once("open", () => {
    console.log("Connected to database");
});
