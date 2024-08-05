import { MessagingAdapter } from '@infra/cloud/adapters/messaging/messagingAdapter';
import { ConsumesAnalyzeDataUseCase } from './consumesAnalyzeData';
import { IMessagingAdapter } from '@infra/cloud/adapters/protocols/messagingAdapterInterface';
import { IMessagingHelper } from '@infra/cloud/aws/protocols/messagingHelperInterface';
import { AnalyzeDataDto } from '@presentation/dtos/analyzeDataDto';

const makeFakeConsumesMessageResult = (): AnalyzeDataDto[] => [
  {
    invoice: {
      id: 'anyId',
      userId: 'anyUserId',
      issuerName: 'anyIssuerName',
      document: 'anyDocument',
      paymentDate: new Date(),
      paymentAmount: 100,
    },
    user: {
      id: 'anyId',
      name: 'anyName',
      document: 'anyDocument',
      email: 'anyEmail',
    },
  },
  {
    invoice: {
      id: 'anyId',
      userId: 'anyUserId',
      issuerName: 'anyIssuerName',
      document: 'anyDocument',
      paymentDate: new Date(),
      paymentAmount: 350,
    },
    user: {
      id: 'anyId',
      name: 'anyName',
      document: 'anyDocument',
      email: 'anyEmail',
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
}

const makeSut = (): SutTypes => {
  const messagingHelperStub = makeMessagingHelper();
  const messagingAdapterStub = new MessagingAdapter(messagingHelperStub);
  const sut = new ConsumesAnalyzeDataUseCase(messagingAdapterStub);
  return { sut, messagingAdapterStub };
};

describe('Consumes Analyze Data Use Case', () => {
  it('should call consumesInvoiceData with correct params', async () => {
    const { sut, messagingAdapterStub } = makeSut();
    const consumesInvoiceDataSpy = jest.spyOn(messagingAdapterStub, 'consumesInvoiceData');
    const CONSUME_QUEUE_NAME = 'invoice-data-extracted.fifo';
    await sut.execute();

    expect(consumesInvoiceDataSpy).toHaveBeenCalledWith(CONSUME_QUEUE_NAME);
  });
});
