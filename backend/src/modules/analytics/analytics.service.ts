import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class AnalyticsService {
  async getDashboard() {

    const groupedDesignations = await prisma.employee.groupBy({
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
    });

    const designations = await prisma.designation.findMany({
      where: {
        id: {
          in: groupedDesignations.map(item => item.designationId),
        },
      },
      select: {
        id: true,
        name: true,
      },
    });

    const resultGroupedDesignations = groupedDesignations.map(item => ({
      ...item,
      designationName: designations.find(
        d => d.id === item.designationId
      )?.name,
    }));

    const groupedDepartments = await prisma.employee.groupBy({
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
    });



    const departments = await prisma.department.findMany({
      where: {
        id: {
          in: groupedDepartments.map(item => item.departmentId),
        },
      },
      select: {
        id: true,
        name: true,
      },
    });

    const resultGroupedDepartments = groupedDepartments.map(item => ({
      ...item,
      departmentName: departments.find(
        d => d.id === item.departmentId
      )?.name,
    }));



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
      resultGroupedDepartments,
      resultGroupedDesignations
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