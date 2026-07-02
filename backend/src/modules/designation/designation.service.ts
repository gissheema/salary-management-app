import { NotFoundError } from "../../errors/NotFoundError";
import { DesignationRepository } from "./designation.repository";
import { CreateDesignationDto } from "./designation.validator";

export class DesignationService {
  private repository = new DesignationRepository();

  async create(data: CreateDesignationDto) {

    const {  ...designationData } = data;

    return this.repository.create({
      ...designationData,
    });
  }

  async getAll(page = 1, limit = 10 ,all: boolean = false) {
    const skip = (page - 1) * limit;

    const designations = await this.repository.findAll(skip, limit, all);

    return {
      data: designations,
      total: await this.repository.count(),
      page,
      limit,
      totalPages: Math.ceil(await this.repository.count() / limit),
    };
  }

  
  async getById(id: string) {
    const designation = await this.repository.findById(id);

    if (!designation) {
      throw new NotFoundError("Designation not found.");
    }

    return designation;
  }

  async update(id: string, payload: any) {
    return this.repository.update(id, payload);
  }

  async delete(id: string) {
    return this.repository.delete(id);
  }
}