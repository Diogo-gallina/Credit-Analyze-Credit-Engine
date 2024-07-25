export class InvalidInvoiceError extends Error {
  constructor(message: string) {
    super(`Invalid invoice: ${message}`);
    this.name = 'InvalidInvoiceError';
  }
}
