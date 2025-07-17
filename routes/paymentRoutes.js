import { Router } from "express";
const router = Router();

import { paymentMaintenanceVerification, paymentAmenityVerification } from "../controllers/paymentController.js";

router.route("/maintenance/verify").post(paymentMaintenanceVerification);
router.route("/amenity/verify").post(paymentAmenityVerification);

export default router;
