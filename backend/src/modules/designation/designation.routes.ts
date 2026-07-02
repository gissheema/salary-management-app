import { Router } from "express";
import { DesignationController } from "./designation.controller";
import { asyncHandler } from "../../utils/asyncHandler";
import { validate } from "../../middleware/validation.middleware";
import {
  createDesignationSchema
} from "./designation.validator";

const router = Router();

const controller = new DesignationController();

router.post(
  "/",
  validate(createDesignationSchema),
  asyncHandler(controller.create)
);

router.get("/", asyncHandler(controller.getAll));

router.get("/:id", asyncHandler(controller.getById));

router.put(
  "/:id",
  asyncHandler(controller.update)
);

router.delete("/:id", asyncHandler(controller.delete));

export default router;