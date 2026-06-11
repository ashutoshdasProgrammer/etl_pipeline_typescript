import { Queue } from 'bullmq';
import { extractCSVData } from './extract/data.extract.code';

const etlQueue = new Queue('ETL_QUEUE');

async function extractAndQueueData(file: string) {
  const records = extractCSVData(file);
  console.log(`Extracting data from source`);

  for (const item of records) {
    await etlQueue.add('transform_user_job', item, {
      attempts: 3, // if fails retry upto 3 times
      backoff: {
        type: 'exponential',
        delay: 1000,
      },
    });
    console.log(`Enqueued job for user : ${item.userId}`);
  }
  console.log(`Completed enqueuing all jobs`);

  await etlQueue.close();
}

export default extractAndQueueData;