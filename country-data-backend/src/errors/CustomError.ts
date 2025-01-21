export type CustomErrorContent = {
  data: string;
};

export abstract class CustomError extends Error {
  abstract readonly statusCode: number;
  abstract readonly errors: CustomErrorContent;
  abstract readonly logging: boolean;

  constructor(data: string) {
    super(data);

    // Only because we are extending a built in class
    Object.setPrototypeOf(this, CustomError.prototype);
  }
}
