export class AppException extends Error {
  message: string;

  constructor(exceptionName: string, message: string) {
    super();
    this.message = `[${exceptionName}] ${message}`;
  }
}
export class JwtTokenNotFoundError extends AppException {
  constructor() {
    super('JwtTokenNotFoundError', 'jwt not found!');
  }
}
