import { AddAnalysisResultRepository } from '@data/protocols/addAnalysisResultRepository';
import { DbAddAnalysisResult } from './dbAddAnalysisResult';
import { AddAnalysisResultModel } from '@domain/use-cases/addAnalysisResult';
import { AnalysisResultModel } from '@domain/models/analysisResult';

const makeFakeAnalysisResultData = (): AddAnalysisResultModel => ({
    userId: 'anyUserId',
    invoiceId: 'anyInvoiceId',
    invoiveWasApproved: true,
    createdAt: new Date(),
  });
  

const makeFakeAnalysisResult = (): AnalysisResultModel => ({
  id: 'anyId',
  userId: 'anyUserId',
  invoiceId: 'anyInvoiceId',
  invoiveWasApproved: true,
  createdAt: new Date(),
});

const makeAddAnalysisResultRepository = (): AddAnalysisResultRepository => {
  class AddAnalysisResultRepositoryStub implements AddAnalysisResultRepository {
    async add(analysisResult: AddAnalysisResultModel): Promise<AnalysisResultModel> {
      const fakeAnalysisResult = makeFakeAnalysisResult();
      return new Promise((resolve) => resolve(fakeAnalysisResult));
    }
  }
  return new AddAnalysisResultRepositoryStub();
};

interface SutTypes {
  sut: DbAddAnalysisResult;
  addAnalysisResultRepository: AddAnalysisResultRepository;
}

const makeSut = (): SutTypes => {
  const addAnalysisResultRepository = makeAddAnalysisResultRepository();
  const sut = new DbAddAnalysisResult(addAnalysisResultRepository);
  return { sut, addAnalysisResultRepository };
};

describe.only('Db Add Analysis Result Use Case', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should call addAnalysisResultRepository with correct values', async () => {
    const { sut, addAnalysisResultRepository } = makeSut();
    const addAnalysisResultRepositorySpy = jest.spyOn(addAnalysisResultRepository, 'add')

    await sut.add(makeFakeAnalysisResultData());

    expect(addAnalysisResultRepositorySpy).toHaveBeenCalledTimes(1)
    expect(addAnalysisResultRepositorySpy).toHaveBeenCalledWith(makeFakeAnalysisResultData())
  });

  it('should return analysis result on success case', async () => {
    const { sut } = makeSut();
    const analysisResultData = makeFakeAnalysisResultData();
    const analysisResult = await sut.add(analysisResultData);

    expect(analysisResult).toEqual(makeFakeAnalysisResult())
  });
});
