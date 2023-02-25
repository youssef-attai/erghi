import dotenv from "dotenv";

dotenv.config();

export const PORT = process.env.PORT;
export const MONGO_URI = process.env.MONGO_URI;
export const SESSION_SECRET = process.env.SESSION_SECRET;
export const CLIENT_ADDRESS = process.env.CLIENT_ADDRESS;