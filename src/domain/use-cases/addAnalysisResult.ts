import { AnalysisResultModel } from '../models/analysisResult';

export class AddAnalysisResultModel {
  userId: string;
  invoiceId: string;
  invoiveWasApproved: boolean;
}

export interface AddAnalysisResult {
  add(analisisResult: AddAnalysisResultModel): Promise<AnalysisResultModel>;
}
