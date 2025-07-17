import { Router } from "express";
const router = Router();

import {
  updateAmount,
  updatePettyCashLimit,
} from "../controllers/associationDetailsController.js";

router.route("/amount/update").post(updateAmount);

router.route("/amount/update").post(updatePettyCashLimit);

export default router;

