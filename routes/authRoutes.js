import { Router } from "express";
const router = Router();

import {
  signUp,
  createStaff,
  validateOTP,
  updateUserStatus,
  createBulkUpload,
  deactivateUser,
  forgotPassword,
  reVerifyTrigger,
  resendOtp,
  updateDocumentStatus,
  updateEmailId,
  updateTenantStatus,
} from "../controllers/authController.js";

router.route("/signup").post(signUp);

router.route("/bulk/upload").post(createBulkUpload);

router.route("/staff/create").post(createStaff);

router.route("/reverify/mail").post(reVerifyTrigger);

router.route("/tenants/status/update").post(updateTenantStatus);

router.route("/status/documents").post(updateDocumentStatus);

router.route("/validate/otp").post(validateOTP);

router.route("/resend/otp").post(resendOtp);

router.route("/forgot/password").post(forgotPassword);

router.route("/update/status").post(updateUserStatus);

router.route("/deactivate").post(deactivateUser);

router.route("/update/email").post(updateEmailId);

export default router;
