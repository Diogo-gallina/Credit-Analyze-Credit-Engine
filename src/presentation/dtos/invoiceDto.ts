export interface InvoiceDto {
  id: string;
  userId: string;
  issuerName: string;
  document: string;
  paymentDate: Date;
  paymentAmount: number;
}
