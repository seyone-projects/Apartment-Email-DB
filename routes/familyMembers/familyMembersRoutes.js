import { Router } from "express";
const router = Router();

import {
  createFamilyMember,
  deleteFamilyMemberById,
  getAllFamilyMembers,
  getFamilyMemberById,
  updateFamilyMemberById
} from "../../controllers/familyMembersController.js";

import { verifyAllToken, onlyAdmin } from '../../utils/tokenAuthentication.js'
import { validateFamilyMember, validateFamilyMemberUpdate } from "./familyMembersValidation.js";

router.route("/create").post(verifyAllToken,validateFamilyMember, createFamilyMember);
router.route("/update/:id").put(verifyAllToken,validateFamilyMemberUpdate, updateFamilyMemberById);
router.route("/get/all/:id").get(verifyAllToken, getAllFamilyMembers);
router.route("/get/:id").get(verifyAllToken, getFamilyMemberById);
router.route("/delete/:id").delete(verifyAllToken, deleteFamilyMemberById);

export default router;
