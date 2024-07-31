import { AnalysisResultModel } from '@domain/models/analysisResult';
import { AnalyzeDataDto } from '@presentation/dtos/analyzeDataDto';

export interface IMessagingAdapter {
  sendAnalysisResultToQueue(message: AnalysisResultModel, queueName: string, messageGroupId: string): Promise<void>;
  consumesInvoiceData(queueName: string): Promise<AnalyzeDataDto[]>;
}
