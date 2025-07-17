import Router from "express";
const router = Router();
import { updateDocumentStatus } from "../controllers/ownerDocumentController.js";

router.route("/update/document/status").patch(updateDocumentStatus);

export default router;
