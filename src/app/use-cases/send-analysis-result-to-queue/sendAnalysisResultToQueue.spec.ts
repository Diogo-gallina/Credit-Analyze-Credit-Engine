import { AnalysisResultModel } from '@domain/models/analysisResult';
import { SendAnalysisResultToQueueUseCase } from './sendAnalysisResultToQueue';
import { IMessagingAdapter } from '@infra/cloud/adapters/protocols/messagingAdapterInterface';
import { MessagingAdapter } from '@infra/cloud/adapters/messaging/messagingAdapter';
import { IMessagingHelper } from '@infra/cloud/aws/protocols/messagingHelperInterface';

const makeFakeMessage = (): AnalysisResultModel => ({
  id: 'anyMessageId',
  userId: 'anyUserId',
  invoiceId: 'anyInvoiceId',
  invoiveWasApproved: true,
  createdAt: new Date(),
});

const makeMessagingHelper = (): IMessagingHelper => ({
  sendMessageToQueue: jest.fn().mockResolvedValue(void 0),
  consumesMessage: jest.fn().mockResolvedValue([]),
});

interface SutTypes {
  sut: SendAnalysisResultToQueueUseCase;
  messagingAdapterStub: IMessagingAdapter;
}

const makeSut = (): SutTypes => {
  const messagingHelperStub = makeMessagingHelper();
  const messagingAdapterStub = new MessagingAdapter(messagingHelperStub);
  const sut = new SendAnalysisResultToQueueUseCase(messagingAdapterStub);
  return { sut, messagingAdapterStub };
};

describe('Send Analysis Result To Queue Use Case', () => {
  it('should call sendAnalysisResultToQueue message adapter method with correct params', async () => {
    const { sut, messagingAdapterStub } = makeSut();
    const sendAnalysisResultToQueueSpy = jest.spyOn(messagingAdapterStub, 'sendAnalysisResultToQueue');
    const message = makeFakeMessage();
    const queueName = 'invoice-validation-result.fifo';
    const messageGroupId = 'result-analyze-group';
    await sut.execute(message);

    expect(sendAnalysisResultToQueueSpy).toHaveBeenCalledWith(message, queueName, messageGroupId);
  });
});
