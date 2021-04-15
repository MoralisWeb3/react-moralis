export class ReactMoralisError extends Error {
  static isReactMoraliserrpr = true;

  constructor(message: string) {
    super(`[react-moralis]: ${message}`);
    this.name = "ReactMoralisError";
    this.message = message;
  }
}

export class NoMoralisContextProviderError extends ReactMoralisError {
  constructor(message: string) {
    super(message);
    this.name = "NoMoralisContextProviderError";
  }
}

export class NotAuthenticatedError extends ReactMoralisError {
  constructor(message: string) {
    super(message);
    this.name = "NotAuthenticatedError";
  }
}

export class ValidationError extends ReactMoralisError {
  constructor(message: string) {
    super(message);
    this.name = "ValidationError";
  }
}
