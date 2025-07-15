import { Router } from "express";
const router = Router();
import {
  verifyAllToken,
  onlyAdmin,
  authorizeRoles,
} from "../../utils/tokenAuthentication.js";
import {
  createAssociation,
  updateAssociation,
  getAssociation,
  getAssociationLogo,
} from "../../controllers/associationController.js";
import {
  validateCreateAssociation,
  validateUpdateAssociation,
} from "./associationValidation.js";
import { BUILDER, OWNER, RENTAL, SUPER_ADMIN } from "../../constants/roles.js";

router
  .route("/create")
  .post(
    verifyAllToken,
    authorizeRoles([SUPER_ADMIN]),
    validateCreateAssociation,
    createAssociation
  );
router
  .route("/update/:id")
  .put(
    verifyAllToken,
    authorizeRoles([SUPER_ADMIN]),
    validateUpdateAssociation,
    updateAssociation
  );
router.route("/get").get(verifyAllToken, getAssociation);
router
  .route("/get/logo")
  .get(
    verifyAllToken,
    authorizeRoles([SUPER_ADMIN, BUILDER, OWNER, RENTAL]),
    getAssociationLogo
  );

export default router;
 