import { AddAnalysisResultRepository } from '@data/protocols/addAnalysisResultRepository';
import { AnalysisResultModel } from '@domain/models/analysisResult';
import { AddAnalysisResultModel } from '@domain/use-cases/addAnalysisResult';
import { MongoHelper } from '../helpers/mongoHelper';

export class AnalisisResultMongoRepository implements AddAnalysisResultRepository {
  async add(analisisResult: AddAnalysisResultModel): Promise<AnalysisResultModel> {
    const analysisResultCollection = await MongoHelper.getCollection('analysisResults');
    const result = await analysisResultCollection.insertOne(analisisResult);
    const { insertedId } = result;
    return MongoHelper.map(await analysisResultCollection.findOne({ _id: insertedId }));
  }
}
