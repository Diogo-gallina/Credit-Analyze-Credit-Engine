import { AddAnalisisResultRepository } from '@data/protocols/addAnalisisResultRepository';
import { AnalisisResultModel } from '@domain/models/analisesResult';
import { AddAnalisisResult, AddAnalisisResultModel } from '@domain/use-cases/addAnalisisResult';

export class dbAddAnalisisResult implements AddAnalisisResult {
  constructor(private readonly addAnalisisResultRepository: AddAnalisisResultRepository) {
    this.addAnalisisResultRepository = addAnalisisResultRepository;
  }

  async add(analisisResultData: AddAnalisisResultModel): Promise<AnalisisResultModel> {
    const analisesResult = await this.addAnalisisResultRepository.add(analisisResultData);
    return new Promise<AnalisisResultModel>((resolve, reject) => resolve(analisesResult));
  }
}
