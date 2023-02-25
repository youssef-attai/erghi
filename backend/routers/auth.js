import { Router } from "express";
import { createAccount, login, logout } from "../controllers/auth.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import fieldsExist from "../middlewares/fieldsExist.js";

const router = Router();

router.post('/create', fieldsExist('username', 'password'), createAccount);

router.post('/login', fieldsExist('username', 'password'), login);

router.get('/logout', isAuthenticated, logout);

export default router;