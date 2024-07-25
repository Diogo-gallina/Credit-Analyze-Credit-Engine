import { AnalysisResultUseCase } from '@app/use-cases/analisisResult/analysisResult';
import { SendAnalysisResultToQueueUseCase } from '@app/use-cases/send-analysis-result-to-queue/SendAnalysisResultToQueue';
import { DbAddAnalysisResult } from '@data/use-cases/add-analisis-result/dbAddAnalysisResult';
import { AddAnalysisResultModel } from '@domain/use-cases/addAnalysisResult';
import { AnalyzeDataDto } from '@presentation/dtos/analyzeDataDto';
import { badRequest, ok } from '@presentation/helper/httpHelper';
import { Controller, HttpRequest, HttpResponse } from '@presentation/protocols';

export class AnalyzeController implements Controller {
  constructor(
    private readonly analysisResultUseCase: AnalysisResultUseCase,
    private readonly dbAddAnalysisResult: DbAddAnalysisResult,
    private readonly sendAnalysisResultToQueueUseCase: SendAnalysisResultToQueueUseCase,
  ) {
    this.analysisResultUseCase = analysisResultUseCase;
    this.dbAddAnalysisResult = dbAddAnalysisResult;
    this.sendAnalysisResultToQueueUseCase = sendAnalysisResultToQueueUseCase;
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const analysisReultRequestBody: AnalyzeDataDto = httpRequest.body;
      const { invoice, user } = analysisReultRequestBody;
      const analysisResultData: AddAnalysisResultModel = await this.analysisResultUseCase.execute(invoice, user);
      const analysisResult = await this.dbAddAnalysisResult.add(analysisResultData);
      await this.sendAnalysisResultToQueueUseCase.execute(analysisResult);
      return ok('Send result successfully');
    } catch (error) {
      return badRequest(error);
    }
  }
}
