import { AnalysisResultModel } from '@domain/models/analysisResult';
import { IMessagingHelper } from '@infra/cloud/aws/protocols/messagingHelperInterface';
import { AnalyzeDataDto } from '@presentation/dtos/analyzeDataDto';
import { IMessagingAdapter } from '../protocols/messagingAdapterInterface';

export class MessagingAdapter implements IMessagingAdapter {
  constructor(private readonly messagingHelper: IMessagingHelper) {
    this.messagingHelper = messagingHelper;
  }
  async sendAnalysisResultToQueue(
    message: AnalysisResultModel,
    queueName: string,
    messageGroupId: string,
  ): Promise<void> {
    return this.messagingHelper.sendMessageToQueue(message, queueName, messageGroupId);
  }
  async consumesInvoiceData(queueName: string): Promise<AnalyzeDataDto[]> {
    return this.messagingHelper.consumesMessage<AnalyzeDataDto>(queueName);
  }
}
