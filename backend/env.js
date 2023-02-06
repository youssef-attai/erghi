import * as dotenv from 'dotenv';

dotenv.config()

export const MONGODB_CONNECTION_URL = process.env.MONGODB_CONNECTION_URL;
export const PORT = process.env.PORT || 3030;