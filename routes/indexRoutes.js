import { Router } from "express";

// import routes
import authRoutes from "./authRoutes.js";

const router = Router();

// routes path define here
router.use("/auth", authRoutes);

export default router;
