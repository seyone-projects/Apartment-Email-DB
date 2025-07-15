import { Router } from "express";
const router = Router();

import {
  createMaintenanceConfiguration,
  getMaintenanceConfiguration,
  mailForUnpaidUser,
  sendBulkMail,
  getMaintenanceConfigurationByMonthYear,
  updatePaymentStatus,
  getMaintenanceConfigurationByYear,
  getMaintenanceWithFlats,
  createDues,
  getUnpaidDues,
  getMaintenanceHistory,
  getLatestMaintenanceMonth,
  getByInvoiceNumber,
} from "../controllers/maintenanceConfigurationController.js";
import {
  verifyAllToken,
  authorizeRoles,
} from "../utils/tokenAuthentication.js";
import { SUPER_ADMIN, RENTAL, BUILDER, OWNER } from "../constants/roles.js";

router
  .route("/create")
  .post(
    verifyAllToken,
    authorizeRoles([SUPER_ADMIN, BUILDER]),
    createMaintenanceConfiguration
  );
router
  .route("/dues/create")
  .post(verifyAllToken, authorizeRoles([SUPER_ADMIN, BUILDER]), createDues);
router
  .route("/dues/:flatId")
  .get(verifyAllToken, authorizeRoles([SUPER_ADMIN, BUILDER]), getUnpaidDues);
// router.route("/flats/get").get(verifyAllToken, getMaintenanceWithFlats);
router
  .route("/get/:userId")
  .get(
    verifyAllToken,
    authorizeRoles([SUPER_ADMIN, RENTAL, BUILDER]),
    getMaintenanceConfiguration
  );

router.route("/get").get(
  verifyAllToken,
  // authorizeRoles([SUPER_ADMIN, RENTAL]),
  getMaintenanceConfiguration
);

router.route("/get/by/ivnumber/:ivnumber").get(
  verifyAllToken,
  // authorizeRoles([SUPER_ADMIN, RENTAL]),
  getByInvoiceNumber
);

router.route("/get/latest/month").get(
  verifyAllToken,
  // authorizeRoles([SUPER_ADMIN, RENTAL]),
  getLatestMaintenanceMonth
);

router
  .route("/get/all/history")
  .get(
    verifyAllToken,
    authorizeRoles([SUPER_ADMIN, OWNER, BUILDER, RENTAL]),
    getMaintenanceHistory
  );

// router.route("/update/payment/status/:id").put(verifyAllToken, onlyAdmin, updatePaymentStatus);
// router.route("/send/mail").post(verifyAllToken, onlyAdmin, mailForUnpaidUser);
// router.route("/send/bulk/mail").post(verifyAllToken, onlyAdmin, sendBulkMail);
// router.route("/get/by/month").post(verifyAllToken, onlyAdmin, getMaintenanceConfigurationByMonthYear);
// router.route("/get/by/year").post(verifyAllToken, getMaintenanceConfigurationByYear);

export default router;
