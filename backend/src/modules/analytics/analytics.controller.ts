import { Request, Response } from "express";
import { ApiResponse } from "../../utils/ApiResponse";

import { AnalyticsService } from "./analytics.service";

const service = new AnalyticsService();

export class AnalyticsController {
  dashboard = async (req: Request, res: Response) => {
    const analytics = await service.getDashboard();

    return res.json(
      ApiResponse.success(
        analytics,
        "Dashboard analytics fetched successfully"
      )
    );
  };
}