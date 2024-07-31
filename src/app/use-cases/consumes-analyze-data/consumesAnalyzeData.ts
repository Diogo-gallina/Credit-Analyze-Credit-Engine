import { IMessagingAdapter } from '@infra/cloud/adapters/protocols/messagingAdapterInterface';
import { makeAnalyzeController } from '@app/factories/analysisResult';

const CONSUME_QUEUE_NAME = 'invoice-data-extracted.fifo';

export class ConsumesAnalyzeDataUseCase {
  constructor(private readonly messagingAdapter: IMessagingAdapter) {}

  async execute() {
    const analyzeDataMessages = await this.messagingAdapter.consumesInvoiceData(CONSUME_QUEUE_NAME);

    for (const analyzeData of analyzeDataMessages) {
      try {
        const analyzeController = makeAnalyzeController();
        const request = { body: analyzeData };
        await analyzeController.handle(request);
      } catch (error) {
        console.error('Error processing analyze data:', error);
      }
    }
  }
}
