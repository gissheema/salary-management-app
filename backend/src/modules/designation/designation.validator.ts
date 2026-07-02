import { z } from "zod";

export const createDesignationSchema = z.object({
  name: z.string().min(2),
  level: z.number().int().min(2),
  });

export type CreateDesignationDto = z.infer<typeof createDesignationSchema>;