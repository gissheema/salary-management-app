import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class AnalyticsService {
  async getDashboard() {
    const [
      totalEmployees,
      activeEmployees,
      inactiveEmployees,
      recentEmployees,
    ] = await Promise.all([
      prisma.employee.count(),

      prisma.employee.count({
        where: {
          employmentStatus:  'ACTIVE',
        },
      }),

      prisma.employee.count({
        where: {
          employmentStatus:  'INACTIVE',
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
    ]);

    return {
      totalEmployees,
      activeEmployees,
      inactiveEmployees,
      recentEmployees,
    };
  }
}