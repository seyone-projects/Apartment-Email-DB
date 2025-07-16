import { Router } from "express";
const router = Router();

import { signUp } from "../controllers/authController.js";

router.route("/signup").post(signUp);

export default router;
