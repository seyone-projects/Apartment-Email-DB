import { Router } from "express";
const router = Router();
import multer from "multer";
import {
  verifyAllToken,
  authorizeRoles,
} from "../utils/tokenAuthentication.js";
import {
  createInitialAmount,
  getAssociationAmount,
  createDetails,
  deleteDetails,
  updateDetails,
  getAssociationDetails,
  updateAmount,
  getAssociationDetailsForMember,
  updatePettyCashLimit,
  getLastThreeDays,
  createBulkUpload,
  updateExpenseData,
  updateCreditData,
  updateBalanceVisibleToMembers,
  deleteImage,
  getAssociationDetailsForPDF,
  getAssociationAccountDetails,
} from "../controllers/associationDetailsController.js";

import { uploadExcel, uploadImage } from "../utils/multerUploader.js";
import { BUILDER, SUPER_ADMIN } from "../constants/roles.js";


const storage = multer.memoryStorage();
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype.startsWith("image/") ||
      file.mimetype === "application/pdf"
    ) {
      cb(null, true);
    } else {
      cb(new Error("Only image and PDF files are allowed!!"), false);
    }
  },
});

router
  .route("/amount/create")
  .post(verifyAllToken, authorizeRoles([SUPER_ADMIN]), createInitialAmount);
router
  .route("/amount/update")
  .post(verifyAllToken, authorizeRoles([SUPER_ADMIN]), updateAmount);

router
  .route("/create")
  .post(verifyAllToken, authorizeRoles([SUPER_ADMIN, BUILDER]),  upload.array("bills", 10), createDetails);
router
  .route("/update/:id")
  .put(verifyAllToken, authorizeRoles([SUPER_ADMIN, BUILDER]),upload.array("bills", 10), updateDetails);
router
  .route("/delete/:id")
  .delete(
    verifyAllToken,
    authorizeRoles([SUPER_ADMIN, BUILDER]),
    deleteDetails
  );
router
  .route("/delete/image/:id")
  .delete(verifyAllToken, authorizeRoles([SUPER_ADMIN]), deleteImage);

router
  .route("/bulk/upload")
  .post(
    verifyAllToken,
    authorizeRoles([SUPER_ADMIN]),
    uploadExcel.single("file"),
    createBulkUpload
  );
router.route("/get").get(verifyAllToken, getAssociationDetails);
router.route("/account/get").get(verifyAllToken, getAssociationAccountDetails);
router
  .route("/get/pdfReport")
  .get(
    verifyAllToken,
    authorizeRoles([SUPER_ADMIN]),
    getAssociationDetailsForPDF
  );

router
  .route("/get/last/actvity/count")
  .get(verifyAllToken, authorizeRoles([SUPER_ADMIN]), getLastThreeDays);
router.route("/member/get").get(verifyAllToken, getAssociationDetailsForMember);
router.route("/amount/get").get(verifyAllToken, getAssociationAmount);
router
  .route("/amount/update/:id")
  .put(verifyAllToken, authorizeRoles([SUPER_ADMIN]), updatePettyCashLimit);
router
  .route("/update/expense/:id")
  .put(verifyAllToken, authorizeRoles([SUPER_ADMIN]), updateExpenseData);
router
  .route("/update/credit/:id")
  .put(verifyAllToken, authorizeRoles([SUPER_ADMIN]), updateCreditData);
router
  .route("/amount/visible/members/:id")
  .put(
    verifyAllToken,
    authorizeRoles([SUPER_ADMIN, BUILDER]),
    updateBalanceVisibleToMembers
  );

export default router;
