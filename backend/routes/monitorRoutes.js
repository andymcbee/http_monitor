import { Router } from "express";
import {
  createMonitor,
  deleteMonitor,
  updateMonitor,
  fetchAllMonitors,
} from "../controllers/monitorControllers.js";

const router = Router();

router.post("/", createMonitor);
router.get("/all/:accountId", fetchAllMonitors);
router.delete("/:monitorId", deleteMonitor);
router.patch("/:monitorId", updateMonitor);

export default router;
