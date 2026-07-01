import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class AnalyticsService {
  async getDashboard() {
    const [
      totalEmployees,
      activeEmployees,
      inactiveEmployees,
      recentEmployees,
      averageSalary,
      highestSalary,
      lowestSalary,
      salaryByDepartment,
      salaryByDesignation
    ] = await Promise.all([
      prisma.employee.count(),

      prisma.employee.count({
        where: {
          employmentStatus: 'ACTIVE',
        },
      }),

      prisma.employee.count({
        where: {
          employmentStatus: 'INACTIVE',
        },
      }),


      prisma.employee.count({
        where: {
          createdAt: {
            gte: new Date(
              new Date().getFullYear(),
              new Date().getMonth(),
              1
            ),
          },
        },
      }),
      prisma.employee.aggregate({
        _avg: {
          salary: true
        }
      }),
      prisma.employee.aggregate({ _max: { salary: true } }),
      prisma.employee.aggregate({ _min: { salary: true } }),
      prisma.employee.groupBy({
        by: ['departmentId'],
        _sum: {
          salary: true,
        },
        _avg: {
          salary: true,
        },
        _min: {
          salary: true,
        },
        _max: {
          salary: true,
        },
        _count: {
          _all: true,
        },

      }),

      prisma.employee.groupBy({
        by: ['designationId'],
        _sum: {
          salary: true,
        },
        _avg: {
          salary: true,
        },
        _min: {
          salary: true,
        },
        _max: {
          salary: true,
        },
        _count: {
          _all: true,
        },

      })



    ]);

    return {
      totalEmployees,
      activeEmployees,
      inactiveEmployees,
      recentEmployees,
      averageSalary,
      highestSalary,
      lowestSalary,
      salaryByDepartment,
      salaryByDesignation
    };
  }
}