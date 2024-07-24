import { AnalisisResultModel } from "../models/analisesResult";

export class AddAnalisisResultModel {
    userId: string;
    invoiceId: string;
    invoiveWasApproved: boolean;
}

export interface AddAnalisisResult {
    add(analisisResult: AddAnalisisResultModel): Promise<AnalisisResultModel>;
}