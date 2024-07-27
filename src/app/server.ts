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
    const app = (await import('./config/app')).default;
    app.listen(env.port, () => console.log(`Server running at http://localhost:${env.port}`));

    const messagingAdapter = new MessagingAdapter(sqsHelper);
    const consumesAnalyzeDataUseCase = new ConsumesAnalyzeDataUseCase(messagingAdapter);

    schedule('*/5 * * * * *', async () => {
      await consumesAnalyzeDataUseCase.execute();
    });
  })
  .catch(console.error);
