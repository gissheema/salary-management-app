import { ConflictError } from "../../errors/ConflictError";
import { NotFoundError } from "../../errors/NotFoundError";
import { EmployeeRepository } from "./employee.repositary";
import { CreateEmployeeDto } from "./employee.validator";

export class EmployeeService {
  private repository = new EmployeeRepository();

  async create(data: CreateEmployeeDto) {

    const lastEmployee = await this.repository.findLastEmployeeCode();
    let employeeCode = "EMP00001";

    if (lastEmployee) {
      const lastNumber = Number(
        lastEmployee.employeeCode.replace("EMP", "")
      );
    employeeCode = `EMP${String(lastNumber + 1).padStart(5, "0")}`;
    }
   if(data.employeeCode)
    {
    const existingEmployee =
      await this.repository.findByEmployeeCode(data.employeeCode);

    if (existingEmployee) {
      throw new ConflictError("Employee code already exists.");
    }
  }
    const existingEmail = await this.repository.findByEmail(data.email);

    if (existingEmail) {
      throw new ConflictError("Email already exists.");
    }

    const { department, designation, ...employeeData } = data;

    return this.repository.create({
      ...employeeData,
      employeeCode: employeeCode,
      salary: data.salary,
      joiningDate: new Date(),
      department: { connect: { id: department } },
      designation: { connect: { id: designation } },
    });
  }

  async getAll(page = 1, limit = 10) {
    const skip = (page - 1) * limit;

    const employees = await this.repository.findAll(skip, limit);

    const total = await this.repository.count();

    return {
      data: employees,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async getById(id: string) {
    const employee = await this.repository.findById(id);

    if (!employee) {
      throw new NotFoundError("Employee not found.");
    }

    return employee;
  }

  async update(id: string, payload: any) {
    return this.repository.update(id, payload);
  }

  async delete(id: string) {
    return this.repository.delete(id);
  }
}