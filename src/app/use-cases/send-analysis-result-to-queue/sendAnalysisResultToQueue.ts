import { AnalysisResultModel } from '@domain/models/analysisResult';
import { IMessagingAdapter } from '@infra/cloud/adapters/protocols/messagingAdapterInterface';

const SEND_QUEUE_NAME = 'invoice-validation-result.fifo';
const MESSAGE_GROUP_ID = 'result-analyze-group';

export class SendAnalysisResultToQueueUseCase {
  constructor(private readonly messagingAdapter: IMessagingAdapter) {
    this.messagingAdapter = messagingAdapter;
  }

  async execute(message: AnalysisResultModel) {
    await this.messagingAdapter.sendAnalysisResultToQueue(message, SEND_QUEUE_NAME, MESSAGE_GROUP_ID);
  }
}
