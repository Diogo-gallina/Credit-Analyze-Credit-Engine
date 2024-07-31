import dotenv from 'dotenv';
import { MongoHelper } from '@infra/db/helpers/mongoHelper';
import { schedule } from 'node-cron';
import { MessagingAdapter } from '@infra/cloud/adapters/messaging/messagingAdapter';
import { sqsHelper } from '@infra/cloud/aws/helpers/messaging/sqsHelper';
import env from './config/env';
import { ConsumesAnalyzeDataUseCase } from './use-cases/consumes-analyze-data/consumesAnalyzeData';

dotenv.config();

MongoHelper.connect(env.mongoUrl)
  .then(async () => {
    console.log(`Server running!!!`)

    const messagingAdapter = new MessagingAdapter(sqsHelper);
    const consumesAnalyzeDataUseCase = new ConsumesAnalyzeDataUseCase(messagingAdapter);

    const cronJobLoopTimeExpression = '*/5 * * * * *';
    schedule(cronJobLoopTimeExpression, async () => {
      await consumesAnalyzeDataUseCase.execute();
    });
  })
  .catch(console.error);
