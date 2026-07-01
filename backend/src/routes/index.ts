import { Router } from "express";
import { healthCheck } from "../modules/health/health.controller";
import employeeRoutes from "../modules/employee/employee.routes";
import analyticsRoutes from "../modules/analytics/analytics.routes";

const router = Router();

router.get("/health", healthCheck);
router.use("/employees", employeeRoutes);
router.use("/analytics", analyticsRoutes)

export default router;