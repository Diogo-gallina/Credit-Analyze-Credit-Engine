import { MessagingAdapter } from '@infra/cloud/adapters/messaging/messagingAdapter';
import { ConsumesAnalyzeDataUseCase } from './consumesAnalyzeData';
import { IMessagingAdapter } from '@infra/cloud/adapters/protocols/messagingAdapterInterface';
import { IMessagingHelper } from '@infra/cloud/aws/protocols/messagingHelperInterface';
import { AnalyzeDataDto } from '@presentation/dtos/analyzeDataDto';
import { Controller } from '@presentation/protocols';

const makeFakeConsumesMessageResult = (): AnalyzeDataDto[] => [
  {
    invoice: {
      id: 'anyId1',
      userId: 'anyUserId1',
      issuerName: 'anyIssuerName1',
      document: 'anyDocument1',
      paymentDate: new Date(),
      paymentAmount: 100,
    },
    user: {
      id: 'anyId1',
      name: 'anyName1',
      document: 'anyDocument1',
      email: 'anyEmail1',
    },
  },
  {
    invoice: {
      id: 'anyId2',
      userId: 'anyUserId2',
      issuerName: 'anyIssuerName2',
      document: 'anyDocument2',
      paymentDate: new Date(),
      paymentAmount: 350,
    },
    user: {
      id: 'anyId2',
      name: 'anyName2',
      document: 'anyDocument2',
      email: 'anyEmail2',
    },
  },
];

const makeMessagingHelper = (): IMessagingHelper => ({
  sendMessageToQueue: jest.fn().mockResolvedValue(void 0),
  consumesMessage: jest.fn().mockResolvedValue(makeFakeConsumesMessageResult()),
});

interface SutTypes {
  sut: ConsumesAnalyzeDataUseCase;
  messagingAdapterStub: IMessagingAdapter;
  analyzeControllerStub: Controller;
}

const makeSut = (): SutTypes => {
  const messagingHelperStub = makeMessagingHelper();
  const messagingAdapterStub = new MessagingAdapter(messagingHelperStub);

  const analyzeControllerStub: Controller = {
    handle: jest.fn().mockResolvedValue(void 0),
  };

  const sut = new ConsumesAnalyzeDataUseCase(messagingAdapterStub);

  return { sut, messagingAdapterStub, analyzeControllerStub };
};

describe('Consumes Analyze Data Use Case', () => {
  it('should call consumesInvoiceData with correct params', async () => {
    const { sut, messagingAdapterStub } = makeSut();
    const consumesInvoiceDataSpy = jest.spyOn(messagingAdapterStub, 'consumesInvoiceData');
    const CONSUME_QUEUE_NAME = expect.any(String);
    await sut.execute();

    expect(consumesInvoiceDataSpy).toHaveBeenCalledWith(CONSUME_QUEUE_NAME);
  });
});
