
/**
 * - Queue is created here
 * - connected with extractCSVData
 * - pushing jobs to the queue
 * - close queue after pushing all jobs
 * 
 */

import { Queue } from 'bullmq';
import { extractCSVData } from './extract/data.extract.code.js';


const etlQueue = new Queue('ETL_QUEUE');

/**
 * - extract data from source
 * - push jobs to the queue
 */
async function extractAndQueueData() {
    
    const records = extractCSVData();
    console.log(`Extracting data from source`);

    for(const item of records){
        await etlQueue.add("transform_user_job", item, {
            attempts: 3, // if fails retry upto 3 times
            backoff: {
                type: 'exponential',
                delay: 1000
            }
        });
        console.log(`Enqueued job for user : ${item.userId}`);
    }
    console.log(`Completed enqueuing all jobs`);

    await etlQueue.close();
}

extractAndQueueData().catch((err) => console.error(err));
    