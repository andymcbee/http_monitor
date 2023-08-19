import { Router } from "express";
import { login, getUser } from "../controllers/userControllers.js";
import { verifyJwt } from "../services/middleware/verifyJwt.js";

const router = Router();

router.post("/login", login);
router.post("/me", verifyJwt, getUser);

export default router;
