import { Router } from "express";
const router = Router();
import { createEnquiry } from "../controllers/enquiryController.js";

router.route("/create").post(createEnquiry);

export default router;