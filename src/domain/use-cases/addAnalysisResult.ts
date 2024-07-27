import { AnalysisResultModel } from '../models/analysisResult';

export class AddAnalysisResultModel {
  userId: string;
  invoiceId: string;
  invoiveWasApproved: boolean;
}

export interface AddAnalysisResult {
  add(analysisResult: AddAnalysisResultModel): Promise<AnalysisResultModel>;
}
