import { AnalysisResultUseCase } from '@app/use-cases/analysisResult/analysisResult';
import { SendAnalysisResultToQueueUseCase } from '@app/use-cases/send-analysis-result-to-queue/sendAnalysisResultToQueue';
import { DbAddAnalysisResult } from '@data/use-cases/add-analisis-result/dbAddAnalysisResult';
import { AddAnalysisResultModel } from '@domain/use-cases/addAnalysisResult';
import { AnalyzeDataDto } from '@presentation/dtos/analyzeDataDto';
import { Controller, Request } from '@presentation/protocols';

export class AnalyzeController implements Controller {
  constructor(
    private readonly analysisResultUseCase: AnalysisResultUseCase,
    private readonly dbAddAnalysisResult: DbAddAnalysisResult,
    private readonly sendAnalysisResultToQueueUseCase: SendAnalysisResultToQueueUseCase,
  ) {}

  async handle(request: Request): Promise<void> {
    try {
      const analysisReultRequestBody: AnalyzeDataDto = request.body;
      const { invoice, user } = analysisReultRequestBody;
      const analysisResultData: AddAnalysisResultModel = await this.analysisResultUseCase.execute(invoice, user);
      const analysisResult = await this.dbAddAnalysisResult.add(analysisResultData);
      await this.sendAnalysisResultToQueueUseCase.execute(analysisResult);
    } catch (error) {
      console.error('Controller error: ' + error);
    }
  }
}
