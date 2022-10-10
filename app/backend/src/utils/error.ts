export enum statusCode {
  'BAD_REQUEST' = 400,
  'UNAUTHORIZED' = 401,
  'NOT_FOUND' = 404,
  'INTERNAL_SERVER_ERROR' = 500,
}

export default class AppError extends Error {
  code: statusCode;

  constructor(code: statusCode, message: string) {
    super(message);
    this.code = code;
  }
}
