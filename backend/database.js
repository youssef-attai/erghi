import mongoose from "mongoose";
import { MONGO_URI } from "./env.js";

mongoose.set('strictQuery', true);

const establishConnection = async () => {
  try {
    const conn = await mongoose.connect(MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true
    });

    console.log(`Connected to MongoDB: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error while connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

export default establishConnection;
