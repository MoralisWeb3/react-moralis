class ReactMoralisError extends Error {
  static isReactMoraliserrpr = true;

  constructor(message: string) {
    super(`[react-moralis]: ${message}`);
    this.name = this.constructor.name;
    this.message = message;
  }
}

class NoMoralisContextProviderError extends ReactMoralisError {
  constructor() {
    super('No Moralis context provider found. Please make sure that you have wrapped your app with the `MoralisProvider` component.');
  }
}

class NotAuthenticatedError extends ReactMoralisError {
  constructor() {
    super('You are not authenticated. Please make sure that you have called the `authenticate` method and that it succeeded.');
  }
}

class ValidationError extends ReactMoralisError {
  constructor(message: string) {
    super(message);
  }
}
