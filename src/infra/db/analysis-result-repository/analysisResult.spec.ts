import env from '@app/config/env';
import { MongoHelper } from '../helpers/mongoHelper';
import { AnalysisResultMongoRepository } from './analysisResult';

const makeSut = (): AnalysisResultMongoRepository => {
  return new AnalysisResultMongoRepository();
};

describe('Analysis Result Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(env.mongoUrl);
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  beforeEach(async () => {
    const accountCollection = await MongoHelper.getCollection('analysisResults');
    await accountCollection.deleteMany({});
  });

  it('should return an analysis result on success', async () => {
    const sut = makeSut();
    const analysisResult = await sut.add({
      userId: 'anyUserId',
      invoiceId: 'anyInvoiceId',
      invoiveWasApproved: true,
      createdAt: new Date('2024-08-06T14:14:36.480Z'),
    });

    expect(analysisResult).toBeTruthy();
    expect(analysisResult.id).toBeTruthy();
    expect(analysisResult.userId).toBe('anyUserId');
    expect(analysisResult.invoiceId).toBe('anyInvoiceId');
    expect(analysisResult.invoiveWasApproved).toBe(true);
    expect(analysisResult.createdAt).toBeInstanceOf(new Date('2024-08-06T14:14:36.480Z'));
  });
});
