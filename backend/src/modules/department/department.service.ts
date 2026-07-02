import { NotFoundError } from "../../errors/NotFoundError";
import { DepartmentRepository } from "./department.repository";
import { CreateDepartmentDto } from "./department.validator";

export class DepartmentService {
  private repository = new DepartmentRepository();

  async create(data: CreateDepartmentDto) {

    const {  ...departmentData } = data;

    return this.repository.create({
      ...departmentData,
    });
  }

  async getAll(page = 1, limit = 10, all: boolean = false) {
    const skip = (page - 1) * limit;

    const departments = await this.repository.findAll(skip, limit, all);

    return {
      data: departments,
      total: await this.repository.count(),
      page,
      limit,
      totalPages: Math.ceil(await this.repository.count() / limit),
    };
  }

  
  async getById(id: string) {
    const department = await this.repository.findById(id);

    if (!department) {
      throw new NotFoundError("Department not found.");
    }

    return department;
  }

  async update(id: string, payload: any) {
    return this.repository.update(id, payload);
  }

  async delete(id: string) {
    return this.repository.delete(id);
  }
}