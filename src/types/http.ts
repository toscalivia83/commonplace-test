export interface HttpError extends Error {
  notFound?: boolean;
  status?: number;
}

export interface BaseResponse<T> {
  statusCode: number;
  result: T | null;
}