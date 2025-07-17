import { Router } from "express";
const router = Router();
import { createMeeting } from "../controllers/meetingController.js";

router.route("/create").post(createMeeting);

export default router;
