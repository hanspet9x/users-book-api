export default class ResponseError extends Error {
  message: string;
  status: number;

  static NOT_FOUND = 404;
  static REQUEST_TIMEOUT = 408;
  static UNPROCESSABLE = 422;
  
  constructor(errorMessage: string, status: number) {
    super(errorMessage);
    this.message = errorMessage;
    this.status = status;
  }
}
