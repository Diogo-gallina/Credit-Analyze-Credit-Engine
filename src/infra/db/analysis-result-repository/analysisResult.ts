import { AddAnalysisResultRepository } from '@data/protocols/addAnalysisResultRepository';
import { AnalysisResultModel } from '@domain/models/analysisResult';
import { AddAnalysisResultModel } from '@domain/use-cases/addAnalysisResult';
import { MongoHelper } from '../helpers/mongoHelper';

export class AnalysisResultMongoRepository implements AddAnalysisResultRepository {
  async add(analysisResult: AddAnalysisResultModel): Promise<AnalysisResultModel> {
    const analysisResultCollection = await MongoHelper.getCollection('analysisResults');
    const result = await analysisResultCollection.insertOne(analysisResult);
    const { insertedId } = result;
    return MongoHelper.map(await analysisResultCollection.findOne({ _id: insertedId }));
  }
}
