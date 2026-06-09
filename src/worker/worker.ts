/**
 * - build a background processing worker
 * - continiously listens to redis
 * - pulls jobs out
 * - cleans the data
 * - saves it
 */

import {Worker, Job} from 'bullmq';


const worker = new Worker('ETL_QUEUE', async job => {
    console.log(job.data);
}, {
    connection: {
        host: "localhost",
        port: 6379
    }
})

console.log("Worker running");