export class ApiError<T> extends Error {
  constructor(
    public message: string,
    public statusCode: number,
    public data?: T
  ) {
    super(message);
  }
}

export const handleApiError = <T>(error: unknown): ApiError<T> => {
  if (error instanceof ApiError) {
    return error;
  }
  return new ApiError<T>('An unknown error occurred', 500);
};
