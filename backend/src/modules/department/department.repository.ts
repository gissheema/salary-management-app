import prisma from "../../config/database";
import { Prisma } from "@prisma/client";

export class DepartmentRepository {
  async create(data: Prisma.DepartmentCreateInput) {
    return prisma.department.create({ data });
  }

  async findById(id: string) {
    return prisma.department.findUnique({
      where: { id },
    });
  }


  async findAll(skip: number, take: number, all: boolean = false) {
    if (all) {
      return prisma.department.findMany({
        orderBy: {
          createdAt: "desc",
        }
      });
    } else {
      return prisma.department.findMany({
        skip,
        take,
        orderBy: {
          createdAt: "desc",
        }
      });
    }


  }

  async update(id: string, data: Prisma.DepartmentUpdateInput) {
    return prisma.department.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    return prisma.department.delete({
      where: { id },
    });
  }

  async count() {
    return prisma.department.count();
  }
}