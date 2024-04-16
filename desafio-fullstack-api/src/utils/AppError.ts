export class AppError{
  public message: string;
  public statusCode: number;

  constructor(message: string, statusCode: number = 400) {
    this.message = message;
    this.statusCode = statusCode;
  }
}


