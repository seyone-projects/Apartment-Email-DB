import { Router } from "express";
const router = Router();

import {
  createMaintenanceOption,
  getMaintenanceOption,
} from "../controllers/maintenanceOptionController.js";
import {
  verifyAllToken,
  authorizeRoles,
} from "../utils/tokenAuthentication.js";
import { BUILDER, SUPER_ADMIN } from "../constants/roles.js";
const superAdmin_Builder = [SUPER_ADMIN, BUILDER];

router
  .route("/create")
  .post(
    verifyAllToken,
    authorizeRoles(superAdmin_Builder),
    createMaintenanceOption
  );

router
  .route("/get")
  .get(
    verifyAllToken,
    authorizeRoles(superAdmin_Builder),
    getMaintenanceOption
  );

export default router;
