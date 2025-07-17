import { Router } from "express";
const router = Router();
import { sendInvoice } from "../controllers/invoiceController.js";

router.route("/send").post(sendInvoice);

export default router;
