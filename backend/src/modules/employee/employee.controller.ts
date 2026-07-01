import { Request, Response } from "express";
import { EmployeeService } from "./employee.service";
import { ApiResponse } from "../../utils/ApiResponse";
import { getPagination } from "../../utils/pagination";

const service = new EmployeeService();

export class EmployeeController {
  create = async (req: Request, res: Response) => {
    const employee = await service.create(req.body);

    return res
      .status(201)
      .json(ApiResponse.success(employee, "Employee created successfully"));
  };

  getAll = async (req: Request, res: Response) => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const pagination = getPagination(page, limit);

    const employees = await service.getAll(
      pagination.page,
      pagination.limit
    );

    const meta = {
      total: employees.total,
      page: employees.page,
      limit: employees.limit,
      totalPages: employees.totalPages,
    };

    return res.json(
      ApiResponse.success(
        employees.data,
        "Employees fetched successfully",
        meta
      )
    );
  };

  getById = async (req: Request, res: Response) => {
    const id = String(req.params.id);
    const employee = await service.getById(id);

    return res.json(
      ApiResponse.success(employee, "Employee fetched successfully")
    );
  };

  update = async (req: Request, res: Response) => {
    const id = String(req.params.id);
    const employee = await service.update(id, req.body);

    return res.json(
      ApiResponse.success(employee, "Employee updated successfully")
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