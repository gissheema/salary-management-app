export class ApiResponse<T> {
  constructor(
    public success: boolean,
    public message: string,
    public data?: T,
    public meta?: unknown
  ) {}

  static success<T>(
    data: T,
    message = "Success",
    meta?: unknown
  ): ApiResponse<T> {
    return new ApiResponse(true, message, data, meta);
  }

  static error(
    message = "Something went wrong"
  ): ApiResponse<null> {
    return new ApiResponse(false, message);
  }
}