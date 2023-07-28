import { Router } from "express";
import { createMonitor } from "../controllers/monitorControllers.js";

const router = Router();

router.post("/", createMonitor);

export default router;
