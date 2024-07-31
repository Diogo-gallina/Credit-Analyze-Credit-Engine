import { AddAnalysisResultRepository } from '@data/protocols/addAnalysisResultRepository';
import { AnalysisResultModel } from '@domain/models/analysisResult';
import { AddAnalysisResult, AddAnalysisResultModel } from '@domain/use-cases/addAnalysisResult';

export class DbAddAnalysisResult implements AddAnalysisResult {
  constructor(private readonly addAnalysisResultRepository: AddAnalysisResultRepository) {
    this.addAnalysisResultRepository = addAnalysisResultRepository;
  }

  async add(analysisResultData: AddAnalysisResultModel): Promise<AnalysisResultModel> {
    const analysisResult = await this.addAnalysisResultRepository.add(analysisResultData);
    return new Promise<AnalysisResultModel>((resolve, reject) => resolve(analysisResult));
  }
}
