import { AnalysisResultUseCase } from '@app/use-cases/analysisResult/analysisResult';
import { SendAnalysisResultToQueueUseCase } from '@app/use-cases/send-analysis-result-to-queue/sendAnalysisResultToQueue';
import { DbAddAnalysisResult } from '@data/use-cases/add-analisis-result/dbAddAnalysisResult';
import { MessagingAdapter } from '@infra/cloud/adapters/messaging/messagingAdapter';
import { sqsHelper } from '@infra/cloud/aws/helpers/messaging/sqsHelper';
import { AnalysisResultMongoRepository } from '@infra/db/analysis-result-repository/analysisResult';
import { AnalyzeController } from '@presentation/controllers/analyze.controller';
import { Controller } from '@presentation/protocols';

export const makeAnalyzeController = (): Controller => {
  const analysisResultMongoRepository = new AnalysisResultMongoRepository();

  const dbAddAnalysisResult = new DbAddAnalysisResult(analysisResultMongoRepository);

  const messagingAdapter = new MessagingAdapter(sqsHelper);
  const sendAnalysisResultToQueueUseCase = new SendAnalysisResultToQueueUseCase(messagingAdapter);

  const analysisResultUseCase = new AnalysisResultUseCase();

  return new AnalyzeController(analysisResultUseCase, dbAddAnalysisResult, sendAnalysisResultToQueueUseCase);
};
