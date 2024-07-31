import { AddAnalysisResultModel } from '@domain/use-cases/addAnalysisResult';
import { InvoiceDto } from '@presentation/dtos/invoiceDto';
import { UserDto } from '@presentation/dtos/userDto';

export class AnalysisResultUseCase {
  async execute(invoice: InvoiceDto, user: UserDto): Promise<AddAnalysisResultModel> {
    let analysisResultStatus: boolean;

    const randomBooleanResult = Math.random() < 0.5;
    analysisResultStatus = randomBooleanResult;

    if (invoice.document !== user.document) analysisResultStatus = false;

    const analysisResult: AddAnalysisResultModel = {
      invoiceId: invoice.id,
      userId: user.id,
      invoiveWasApproved: analysisResultStatus,
    };

    return analysisResult;
  }
}
