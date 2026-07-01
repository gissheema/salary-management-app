import prisma from "../../config/database";
import { Prisma } from "@prisma/client";

export class EmployeeRepository {
  async create(data: Prisma.EmployeeCreateInput) {
    return prisma.employee.create({ data });
  }

  async findById(id: string) {
    return prisma.employee.findUnique({
      where: { id },
    });
  }

  async findByEmployeeCode(employeeCode: string) {
    return prisma.employee.findUnique({
      where: { employeeCode },
    });
  }

  async findByEmail(email: string) {
    return prisma.employee.findUnique({
      where: { email },
    });
  }

  async findAll(skip: number, take: number) {
    return prisma.employee.findMany({
      skip,
      take,
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async update(id: string, data: Prisma.EmployeeUpdateInput) {
    return prisma.employee.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    return prisma.employee.delete({
      where: { id },
    });
  }

  async count() {
    return prisma.employee.count();
  }
}