export class InvalidMessageBodyError extends Error {
    constructor(message: string) {
      super(`Invalid message body: ${message}`);
      this.name = 'InvalidMessageBodyError';
    }
  }
  