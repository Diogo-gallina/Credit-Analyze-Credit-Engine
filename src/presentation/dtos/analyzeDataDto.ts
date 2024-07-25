export interface AnalyzeDataDto {
  invoice: {
    id: string;
    userId: string;
    issuerName: string;
    document: string;
    paymentDate: Date;
    paymentAmount: number;
  };
  user: {
    id: string;
    name: string;
    email: string;
    document: string;
  };
}
