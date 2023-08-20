import { Router } from "express";
import { login, getUser, logout } from "../controllers/userControllers.js";
import { verifyJwt } from "../services/middleware/verifyJwt.js";

const router = Router();

router.post("/login", login);
router.post("/me", verifyJwt, getUser);
router.post("/logout", logout);

export default router;
