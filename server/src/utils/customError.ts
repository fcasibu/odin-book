export default class CustomError extends Error {
  public status;
  constructor(message: string, statusCode: number) {
    super(message);
    this.name = this.constructor.name;
    this.status = statusCode || 500;
    Error.captureStackTrace && Error.captureStackTrace(this, this.constructor);
  }
}
