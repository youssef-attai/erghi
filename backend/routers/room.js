import { Router } from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import Room from "../models/Room.js";

const router = Router();

// Might me redundant
// router.get('/', isAuthenticated, (req, res) => {
//   // TODO: Get the current user's rooms from the database (Name and id only)
//   // TODO: Return the rooms
// });

router.get('/:id', isAuthenticated, (req, res) => {
  // TODO: Get the room with the given id from the database (With everything)
  // TODO: Return the room
});

router.post('/', isAuthenticated, (req, res) => {
  // TODO: Create a new room 
  // TODO: Add the current user to the room
  // TODO: Return the new room's id
});

router.post('/:id/join', isAuthenticated, (req, res) => {
  // TODO: Add the current user to the room with the given id
});

export default router;