import { Router } from "express";
const router = Router();

import {
    createVehicleDetails,
    deleteVehicleDetailsById,
    getAllVehicleDetails,
    getVehicleDetailsById,
    updateVehicleDetailsById,
    getUserByVehicleNumber
} from "../../controllers/vehiclDetailsController.js";
import { verifyAllToken } from "../../utils/tokenAuthentication.js";
import { validateUpdateVehicle, validateVehicle } from "./vehcileValidation.js";

router.route("/create").post(verifyAllToken, validateVehicle, createVehicleDetails);
router.route("/update/:id").put(verifyAllToken, validateUpdateVehicle, updateVehicleDetailsById);
router.route("/get/all/:id").get(verifyAllToken, getAllVehicleDetails);
router.route("/get/by/register/number").get(verifyAllToken, getUserByVehicleNumber);
router.route("/get/:id").get(verifyAllToken, getVehicleDetailsById);
router.route("/delete/:id").delete(verifyAllToken, deleteVehicleDetailsById);

export default router;