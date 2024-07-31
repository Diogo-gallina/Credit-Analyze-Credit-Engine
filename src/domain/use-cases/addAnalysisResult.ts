import { AnalysisResultModel } from '../models/analysisResult';

export class AddAnalysisResultModel {
  userId: string;
  invoiceId: string;
  invoiveWasApproved: boolean;
  createdAt: Date;
}

export interface AddAnalysisResult {
  add(analysisResult: AddAnalysisResultModel): Promise<AnalysisResultModel>;
}
