import { Router } from "express";
import { createAccount, login, logout } from "../controllers/auth.js";
import ensureAuthenticated from "../middlewares/ensureAuthenticated.js";
import ensureFieldsExist from "../middlewares/ensureFieldsExist.js";

const router = Router();

router.post('/create', ensureFieldsExist('username', 'password'), createAccount);

router.post('/login', ensureFieldsExist('username', 'password'), login);

router.get('/logout', ensureAuthenticated, logout);

export default router;