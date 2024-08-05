import { InvoiceDto } from '@presentation/dtos/invoiceDto';
import { UserDto } from '@presentation/dtos/userDto';
import { AnalysisResultUseCase } from './analysisResult';

const makeFakeInvoice = (): InvoiceDto => {
  return {
    id: 'anyId',
    userId: 'anyUserId',
    issuerName: 'anyIssuerName',
    document: 'anyDocument',
    paymentDate: new Date(),
    paymentAmount: 100,
  };
};

const makeFakeUser = (): UserDto => {
  return {
    id: 'anyId',
    name: 'anyName',
    document: 'anyDocument',
    email: 'anyEmail',
  };
};

interface SutTypes {
  sut: AnalysisResultUseCase;
}

const makeSut = (): SutTypes => {
  const sut = new AnalysisResultUseCase();
  return { sut };
};

describe('Analysis Result Use Case', () => {
  it('should insert random boolean in invoiveWasApproved', async () => {
    const { sut } = makeSut();
    const analysisResult = await sut.execute(makeFakeInvoice(), makeFakeUser())

    expect(typeof analysisResult.invoiveWasApproved).toBe('boolean');
  });
});
