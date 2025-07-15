import { Router } from "express";
const router = Router();
import {
  getLedgerLogs,
  getLedgerLogHistory,
  getLedgerLogForPDF,
} from "../../controllers/ledgerLogsController.js";
import {
  verifyAllToken,
  authorizeRoles,
} from "../../utils/tokenAuthentication.js";
import { BUILDER, SUPER_ADMIN } from "../../constants/roles.js";

router
  .route("/get")
  .get(verifyAllToken, authorizeRoles([SUPER_ADMIN, BUILDER]), getLedgerLogs);

router.route("/get/history/:id").get(getLedgerLogHistory);

router
  .route("/get/pdfReport")
  .get(
    verifyAllToken,
    authorizeRoles([SUPER_ADMIN]),
    getLedgerLogForPDF
  );

export default router;
