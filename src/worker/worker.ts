/**
 * - took the access from the queue named ETL_QUEUE
 * - build a background processing worker
 * - continiously listens to redis
 * - pulls jobs out
 * - cleans the data
 * - saves it
 */

import { prisma } from '../config/prisma.ts';
import { Worker, Job } from 'bullmq';

interface UserPayload {
    userId: number;
    gender: string;
    age: number;
    estimatedSalary: number;
    purchased: number;
}


const worker = new Worker('ETL_QUEUE', async (job: Job<UserPayload>) => {
    await prisma.user.create({
        data: {
            userId: Number(job.data.userId),
            gender: job.data.gender,
            age: Number(job.data.age),
            estimatedSalary: Number(job.data.estimatedSalary),
            purchased: Boolean(Number(job.data.purchased))
        }
    });
    console.log(`Saved user ${job.data.userId}`);
}, {
    connection: {
        host: "localhost",
        port: 6379
    }
})

worker.on("completed", (job) => {
    console.log(` Job ${job.id} completed`);
});

worker.on("failed", (job, err) => {
    console.error(` Job ${job?.id} failed`);
    console.error(err);
});

console.log("Worker running");