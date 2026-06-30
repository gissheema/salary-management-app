import { Request, Response } from "express";
import prisma from "../config/database";

export const healthCheck = async (_req: Request, res: Response) => {
    try {
        await prisma.$queryRaw`SELECT 1`;

        res.status(200).json({
            success: true,
            message: "API and Database are healthy",
            timestamp: new Date().toISOString(),
        });
    } catch {
        res.status(500).json({
            success: false,
            message: "Database connection failed",
        });
    }

};