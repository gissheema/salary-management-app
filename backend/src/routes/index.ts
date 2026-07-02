import { Router } from "express";
import { healthCheck } from "../modules/health/health.controller";
import employeeRoutes from "../modules/employee/employee.routes";
import analyticsRoutes from "../modules/analytics/analytics.routes";
import departmentRoutes from "../modules/department/department.routes";
import designationRoutes from "../modules/designation/designation.routes";

const router = Router();

router.get("/health", healthCheck);
router.use("/employees", employeeRoutes);
router.use("/analytics", analyticsRoutes);
router.use("/departments", departmentRoutes);
router.use("/designations", designationRoutes);

export default router;