export default class ResponseError extends Error {
  message: string;
  status: number;
  constructor(errorMessage: string, status: number) {
    super(errorMessage);
    this.message = errorMessage;
    this.status = status;
  }
}
