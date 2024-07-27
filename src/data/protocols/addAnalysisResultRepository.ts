import { AnalysisResultModel } from '@domain/models/analysisResult';
import { AddAnalysisResultModel } from '@domain/use-cases/addAnalysisResult';

export interface AddAnalysisResultRepository {
  add(analysisResult: AddAnalysisResultModel): Promise<AnalysisResultModel>;
}
