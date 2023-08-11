import { Router } from "express";
import { createAccount } from "../controllers/accountControllers.js";

const router = Router();

router.post("/", createAccount);

export default router;
