import { z } from "zod";

export const createDepartmentSchema = z.object({
  code: z.string().min(1),
  name: z.string().min(2),
  description: z.string().min(2),
  });

export type CreateDepartmentDto = z.infer<typeof createDepartmentSchema>;