import { Request, Response } from "express";
import { DesignationService } from "./designation.service";
import { ApiResponse } from "../../utils/ApiResponse";
import { getPagination } from "../../utils/pagination";

const service = new DesignationService();

export class DesignationController {
  create = async (req: Request, res: Response) => {
    const designation = await service.create(req.body);

    return res
      .status(201)
      .json(ApiResponse.success(designation, "Designation created successfully"));
  };

  getAll = async (req: Request, res: Response) => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const pagination = getPagination(page, limit);

    const designations = await service.getAll(
      pagination.page,
      pagination.limit
    );

    const meta = {
      total: designations.total,
      page: designations.page,
      limit: designations.limit,
      totalPages: designations.totalPages,
    };

    return res.json(
      ApiResponse.success(
        designations.data,
        "Designations fetched successfully",
        meta
      )
    );
  };

  getById = async (req: Request, res: Response) => {
    const id = String(req.params.id);
    const designation = await service.getById(id);

    return res.json(
      ApiResponse.success(designation, "Designation fetched successfully")
    );
  };

  update = async (req: Request, res: Response) => {
    const id = String(req.params.id);
    const designation = await service.update(id, req.body);

    return res.json(
      ApiResponse.success(designation, "Designation updated successfully")
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