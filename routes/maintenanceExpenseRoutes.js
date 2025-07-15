import { Router } from "express";
const router = Router();

import {
  createMaintenanceExpense,
  getAllMaintananceExpense,
  updateMaintenanceCalc,
  // getTotalAmountByExpenseType,
  removeMaintenanceCalc,
  getAllInvoiceMembers,
  // updateExpense,
  // getExpenseById,
  // deleteExpense,
  getExpenseByExpenseNumber
} from "../controllers/maintenanceExpenseController.js";
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
    createMaintenanceExpense
  );
router
  .route("/update/:id")
  .put(
    verifyAllToken,
    authorizeRoles(superAdmin_Builder),
    updateMaintenanceCalc
  );
router
  .route("/remove/:id")
  .put(
    verifyAllToken,
    authorizeRoles(superAdmin_Builder),
    removeMaintenanceCalc
  );

router
  .route("/get")
  .get(
    verifyAllToken,
    authorizeRoles(superAdmin_Builder),
    getAllMaintananceExpense
  );

  router
  .route("/get/expenseNmber")
  .get(
    verifyAllToken,
    authorizeRoles(superAdmin_Builder),
    getExpenseByExpenseNumber
  );
// router
//   .route("/get/amount")
//   .get(verifyAllToken, onlyAdmin, getTotalAmountByExpenseType);
router
  .route("/members/invoice")
  .get(
    verifyAllToken,
    authorizeRoles(superAdmin_Builder),
    getAllInvoiceMembers
  );

// router.route("/update/expense").put(verifyAllToken, onlyAdmin, updateExpense);
// router.route("/get/expense/:id").get(verifyAllToken, onlyAdmin, getExpenseById);
// router.route("/delete/expense/:id").delete(verifyAllToken, onlyAdmin, deleteExpense);

export default router;
