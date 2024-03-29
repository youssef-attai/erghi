import express from "express";
import sessions from "express-session";
import handleSocketConnections from "./socket.js";
import establishConnection from "./database.js";
import authRouter from "./routers/auth.js";
import roomRouter from "./routers/room.js";
import { CLIENT_ADDRESS, PORT, SESSION_SECRET } from "./env.js";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";

establishConnection();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: CLIENT_ADDRESS,
  },
});

app.use(
  sessions({
    secret: SESSION_SECRET,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
      // secure: true,
      httpOnly: true,
    },
    resave: false,
    saveUninitialized: false,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: CLIENT_ADDRESS,
    credentials: true,
  })
);

app.use("/auth", authRouter);
app.use("/rooms", roomRouter);

handleSocketConnections(io);

server.listen(PORT, () => {
  console.log(`Server running on: http://localhost:${PORT}`);
});
