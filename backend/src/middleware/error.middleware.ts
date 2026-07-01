import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/AppError";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof AppError) {
    const payload: { success: boolean; message: string; errors?: unknown } = {
      success: false,
      message: err.message,
    };

    // include errors only when present to satisfy typing
    if ((err as any).errors) payload.errors = (err as any).errors;

    return res.status(err.statusCode).json(payload);
  }

  console.error(err);

  return res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
};