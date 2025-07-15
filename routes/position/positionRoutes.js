import { Router } from "express";
const router = Router();
import { verifyAllToken } from "../../utils/tokenAuthentication.js";
import { createPosition, getPositionList, updateUserToPosition } from "../../controllers/positionController.js";
import { createPositionValidate, updatePositionValidate } from "./positionValidation.js";

router.route("/create").post(verifyAllToken, createPositionValidate, createPosition);
router.route("/update/:id").put(verifyAllToken, updatePositionValidate, updateUserToPosition);
router.route("/get").get(verifyAllToken, getPositionList);

export default router;