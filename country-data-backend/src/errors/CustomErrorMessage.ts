import { CustomError } from './CustomError';

export default class CustomErrorMessage extends CustomError {
  private static readonly _statusCode = 400;
  private readonly _code: number;
  private readonly _logging: boolean;

  constructor(params?: { code?: number; data?: string; logging?: boolean; context?: { [key: string]: any } }) {
    const { code, data, logging } = params || {};

    super(data || 'Bad request');
    this._code = code || CustomErrorMessage._statusCode;
    this._logging = logging || false;

    // Only because we are extending a built in class
    Object.setPrototypeOf(this, CustomErrorMessage.prototype);
  }

  get errors() {
    return { data: this.message };
  }

  get statusCode() {
    return this._code;
  }

  get logging() {
    return this._logging;
  }

  public getErroMsg = (error: unknown): string => {
    if (error instanceof Error) {
      console.error('Error message:', error.message);
      return error.message;
    } else {
      return 'Unhandled error';
    }
  };
}
