import { Router } from "express";
import { EmployeeController } from "./employee.controller";
import { asyncHandler } from "../../utils/asyncHandler";
import { validate } from "../../middleware/validation.middleware";
import {
  createEmployeeSchema
} from "./employee.validator";

const router = Router();

const controller = new EmployeeController();

router.post(
  "/",
  validate(createEmployeeSchema),
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