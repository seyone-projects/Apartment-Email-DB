import { Router } from "express";
const router = Router();

import { createMaintenanceConfiguration } from "../controllers/maintenanceConfigurationController.js";

router.route("/create").post(createMaintenanceConfiguration);
export default router;
