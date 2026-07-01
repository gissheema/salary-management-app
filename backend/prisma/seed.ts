import { PrismaClient, Prisma, EmploymentStatus } from "@prisma/client";

const prisma = new PrismaClient();

const departments = [
  { name: "IT", code: "IT" },
  { name: "HR", code: "HR" },
  { name: "Finance", code: "FIN" },
  { name: "Sales", code: "SAL" },
  { name: "Marketing", code: "MKT" },
  { name: "Operations", code: "OPS" },
  { name: "Support", code: "SUP" },
  { name: "Administration", code: "ADM" },
];

const designations = [
  "Software Engineer",
  "Senior Software Engineer",
  "Tech Lead",
  "QA Engineer",
  "DevOps Engineer",
  "Business Analyst",
  "Project Manager",
  "HR Executive",
  "HR Manager",
  "Accountant",
  "Sales Executive",
  "Marketing Executive",
  "UI/UX Designer",
  "Product Manager",
];

const countries = [
  { country: "India", currency: "INR" },
  { country: "USA", currency: "USD" },
  { country: "UK", currency: "GBP" },
  { country: "Canada", currency: "CAD" },
  { country: "Australia", currency: "AUD" },
  { country: "Singapore", currency: "SGD" },
];

async function main() {
  console.log("Cleaning database...");

  await prisma.employee.deleteMany();
  await prisma.department.deleteMany();
  await prisma.designation.deleteMany();

  console.log("Creating departments...");

  await prisma.department.createMany({
    data: departments,
  });

  console.log("Creating designations...");

  await prisma.designation.createMany({
    data: designations.map((name) => ({ name })),
  });

  const departmentList = await prisma.department.findMany();
  const designationList = await prisma.designation.findMany();

  console.log("Generating employees...");

  const { faker } = await import("@faker-js/faker");

  const employees: Prisma.EmployeeCreateManyInput[] = [];

  for (let i = 1; i <= 10000; i++) {
    const department = faker.helpers.arrayElement<typeof departmentList[number]>(departmentList);
    const designation = faker.helpers.arrayElement<typeof designationList[number]>(designationList);
    const location = faker.helpers.arrayElement(countries);

    employees.push({
      employeeCode: `EMP${String(i).padStart(5, "0")}`,
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: `employee${i}@company.com`,

      departmentId: department.id,
      designationId: designation.id,

      country: location.country,
      currency: location.currency,
      joiningDate: faker.date.past({ years: 5 }).toISOString(),

      salary: new Prisma.Decimal(
        faker.number.int({
          min: 25000,
          max: 180000,
        })
      ),

      employmentStatus: faker.helpers.arrayElement([
        EmploymentStatus.ACTIVE,
        EmploymentStatus.INACTIVE,
      ]),
    });
  }

  console.log("Inserting employees...");

  const batchSize = 1000;

  for (let i = 0; i < employees.length; i += batchSize) {
    await prisma.employee.createMany({
      data: employees.slice(i, i + batchSize),
    });

    console.log(
      `Inserted ${Math.min(i + batchSize, employees.length)} / ${employees.length}`
    );
  }

  console.log("Seed completed successfully.");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });