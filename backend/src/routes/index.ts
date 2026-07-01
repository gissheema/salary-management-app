import { Router } from "express";
import { healthCheck } from "../modules/health/health.controller";
import employeeRoutes from "../modules/employee/employee.routes";

const router = Router();

router.get("/health", healthCheck);
router.use("/employees", employeeRoutes);

export default router;