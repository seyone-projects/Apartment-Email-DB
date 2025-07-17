import { Router } from "express";
const router = Router();
import { createTicket } from "../controllers/ticketController.js";

router.route("/create").post(createTicket);

export default router;
