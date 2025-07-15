import { Router } from "express";
const router = Router();
import {
  createEvents,
  getEvent,
  deleteEvent,
  updateEvent,
  getAllEvent,
} from "../../controllers/eventController.js";
import {
  verifyAllToken,
  onlyAdmin,
  authorizeRoles,
} from "../../utils/tokenAuthentication.js";
import { validateEvent, validateEventUpdate } from "./eventsValidation.js";
import { BUILDER, SUPER_ADMIN } from "../../constants/roles.js";

router
  .route("/create")
  .post(
    verifyAllToken,
    authorizeRoles([SUPER_ADMIN, BUILDER]),
    validateEvent,
    createEvents
  );
router.route("/get/all").get(verifyAllToken, getAllEvent);
router.route("/get").get(verifyAllToken, getEvent);
router
  .route("/update/:id")
  .put(
    verifyAllToken,
    authorizeRoles([SUPER_ADMIN, BUILDER]),
    validateEventUpdate,
    updateEvent
  );
router
  .route("/delete/:id")
  .delete(verifyAllToken, authorizeRoles([SUPER_ADMIN, BUILDER]), deleteEvent);

export default router;
