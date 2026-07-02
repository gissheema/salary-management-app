import { Request, Response } from "express";
import { DepartmentService } from "./department.service";
import { ApiResponse } from "../../utils/ApiResponse";
import { getPagination } from "../../utils/pagination";

const service = new DepartmentService();

export class DepartmentController {
  create = async (req: Request, res: Response) => {
    const department = await service.create(req.body);

    return res
      .status(201)
      .json(ApiResponse.success(department, "Department created successfully"));
  };

  getAll = async (req: Request, res: Response) => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const pagination = getPagination(page, limit);

    const departments = await service.getAll(
      pagination.page,
      pagination.limit
    );

    const meta = {
      total: departments.total,
      page: departments.page,
      limit: departments.limit,
      totalPages: departments.totalPages,
    };

    return res.json(
      ApiResponse.success(
        departments.data,
        "Departments fetched successfully",
        meta
      )
    );
  };

  getById = async (req: Request, res: Response) => {
    const id = String(req.params.id);
    const department = await service.getById(id);

    return res.json(
      ApiResponse.success(department, "Department fetched successfully")
    );
  };

  update = async (req: Request, res: Response) => {
    const id = String(req.params.id);
    const department = await service.update(id, req.body);

    return res.json(
      ApiResponse.success(department, "Department updated successfully")
    );
  };

  delete = async (req: Request, res: Response) => {
    const id = String(req.params.id);
    await service.delete(id);

    return res
      .status(204)
      .send();
  };
}