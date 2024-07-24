import { AddAnalisisResultRepository } from "@data/protocols/addAnalisisResultRepository";
import { AnalisisResultModel } from "@domain/models/analisesResult";
import { AddAnalisisResultModel } from "@domain/use-cases/addAnalisisResult";
import { MongoHelper } from "../helpers/mongoHelper";

export class AnalisisResultMongoRepository implements AddAnalisisResultRepository {
    async add(analisisResult: AddAnalisisResultModel): Promise<AnalisisResultModel> {
        const analisesResultCollection = await MongoHelper.getCollection('analisisResults');
        const result = await analisesResultCollection.insertOne(analisisResult)
        const { insertedId } = result;
        return MongoHelper.map(await analisesResultCollection.findOne({ _id: insertedId }));
    }

}