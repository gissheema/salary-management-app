import { Router } from "express";
import { DepartmentController } from "./department.controller";
import { asyncHandler } from "../../utils/asyncHandler";
import { validate } from "../../middleware/validation.middleware";
import {
  createDepartmentSchema
} from "./department.validator";

const router = Router();

const controller = new DepartmentController();

router.post(
  "/",
  validate(createDepartmentSchema),
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