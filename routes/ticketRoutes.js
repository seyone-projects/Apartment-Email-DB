import { Router } from "express";
const router = Router();
import { createTicket,updateTicket } from "../controllers/ticketController.js";

router.route("/create").post(createTicket);
router.route("/update/status").post(updateTicket);

export default router;
