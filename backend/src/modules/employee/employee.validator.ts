import { z } from "zod";

export const createEmployeeSchema = z.object({
  employeeCode: z.string().min(1),
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.string().email(),
  department: z.string().min(2),
  designation: z.string().min(2),
  country: z.string().min(2),
  currency: z.string().length(3),
  salary: z.number().positive(),
});

export type CreateEmployeeDto = z.infer<typeof createEmployeeSchema>;