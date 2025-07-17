import { Router } from "express";
const router = Router();
import { createNotification } from "../controllers/notificationController.js";

router.route("/create").post(createNotification);
export default router;
