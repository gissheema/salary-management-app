import { Router } from "express";
import { AnalyticsController } from "./analytics.controller";
import { asyncHandler } from "../../utils/asyncHandler";

const router = Router();

const controller = new AnalyticsController();

router.get(
  "/dashboard",
  asyncHandler(controller.dashboard)
);

export default router;