import { Router } from "express";

// import routes
import authRoutes from "./authRoutes.js";
import associationDetailsRoutes from "./associationDetailsRoutes.js";
import enquiryRoutes from "./enquiryRoutes.js";
import invoiceRoutes from "./invoiceRoutes.js";
import maintenanceConfigRoutes from "./maintenanceConfigurationRoutes.js";
import meetingRoutes from "./meetingRoutes.js";
import notificationRoutes from "./notificationRoutes.js";
import ownerDocumentRoutes from "./ownerDocumentRoutes.js";
import paymentRoutes from "./paymentRoutes.js";
import ticketRoutes from "./ticketRoutes.js";

const router = Router();

// routes path define here
router.use("/auth", authRoutes);
router.use("/owner", ownerDocumentRoutes);
router.use("/tickets", ticketRoutes);
router.use("/association/details", associationDetailsRoutes);
router.use("/maintenance/config", maintenanceConfigRoutes);
router.use("/notification", notificationRoutes);
router.use("/invoice", invoiceRoutes);
router.use("/meeting", meetingRoutes);
router.use("/enquiry", enquiryRoutes);
router.use("/payment", paymentRoutes);

export default router;
