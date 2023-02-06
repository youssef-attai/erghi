import { Router } from 'express';
const router = Router();
// Login endpoint
// Returns a new refresh token and an access token
// Stores the new refresh token in the database
// Removes the current refresh token from cookies (if exists)
// Signup endpoint
// Creates a new user in the database
// Then logs the user in
router.post("/user", (req, res) => {
});
// Request access token endpoint
// Needs a valid refresh token in the cookies to work
// Logout endpoint
// Removes the refresh token in the cookies from the database
export default router;
