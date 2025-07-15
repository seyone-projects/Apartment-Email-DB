import { Router } from "express";
const router = Router();

import {
  // createMaintenance,
  // deleteMaintenanceById,
  // getAllMaintenance,
  // getMaintenanceById,
  // updateMaintenanceById,
  createCategory,
  getAllCategory,
} from "../controllers/maintenanceController.js";
import {
  verifyAllToken,
  authorizeRoles,
} from "../utils/tokenAuthentication.js";
import { BUILDER, SUPER_ADMIN } from "../constants/roles.js";
const superAdmin_Builder = [SUPER_ADMIN, BUILDER];

// router.route("/create").post(verifyAllToken, createMaintenance);
router
  .route("/category/create")
  .post(verifyAllToken, authorizeRoles(superAdmin_Builder), createCategory);
router
  .route("/category/get")
  .get(verifyAllToken, authorizeRoles(superAdmin_Builder), getAllCategory);
// router.route("/update/:id").put(verifyAllToken, updateMaintenanceById);
// router.route("/get/all").get(verifyAllToken, getAllMaintenance);
// router.route("/get/:id").get(verifyAllToken, getMaintenanceById);
// router.route("/delete/:id").delete(verifyAllToken, deleteMaintenanceById);

export default router;
