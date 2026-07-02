import prisma from "../../config/database";
import { Prisma } from "@prisma/client";

export class DesignationRepository {
  async create(data: Prisma.DesignationCreateInput) {
    return prisma.designation.create({ data });
  }

  async findById(id: string) {
    return prisma.designation.findUnique({
      where: { id },
    });
  }


  async findAll(skip: number, take: number, all: boolean = false) {
    if (all) {
      return prisma.designation.findMany({
        orderBy: {
          createdAt: "desc",
        }
      });
    } else {
      return prisma.designation.findMany({
        skip,
        take,
        orderBy: {
          createdAt: "desc",
        }
      });
    }
  }

  async update(id: string, data: Prisma.DesignationUpdateInput) {
    return prisma.designation.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    return prisma.designation.delete({
      where: { id },
    });
  }

  async count() {
    return prisma.designation.count();
  }
}