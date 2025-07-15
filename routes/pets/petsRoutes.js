import { Router } from "express";
const router = Router();

import {
  createPets,
  deletePetsById,
  getAllPets,
  getPetsById,
  updatePetsById,
} from "../../controllers/petsController.js";
import { verifyAllToken } from "../../utils/tokenAuthentication.js";
import { validatePet, validateupdatePet } from "./petsValidation.js";

router.route("/create").post(verifyAllToken, validatePet, createPets);
router
  .route("/update/:id")
  .put(verifyAllToken, validateupdatePet, updatePetsById);
router.route("/get").get(verifyAllToken, getAllPets);
router.route("/get/:id").get(verifyAllToken, getPetsById);
router.route("/delete/:id").delete(verifyAllToken, deletePetsById);

export default router;