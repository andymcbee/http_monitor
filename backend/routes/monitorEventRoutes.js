import { Router } from "express";
import { fetchAllMonitorEvents } from "../controllers/monitorEventControllers.js";

const router = Router();

router.get("/all/:monitorId", fetchAllMonitorEvents);

export default router;
