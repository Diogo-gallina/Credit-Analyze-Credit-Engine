import { AnalisisResultModel } from "@domain/models/analisesResult";
import { AddAnalisisResultModel } from "@domain/use-cases/addAnalisisResult";

export interface AddAnalisisResultRepository {
    add(analisisResult: AddAnalisisResultModel): Promise<AnalisisResultModel>;
}