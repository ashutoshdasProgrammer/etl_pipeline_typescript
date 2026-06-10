import { Queue } from 'bullmq';

const queue = new Queue('ETL_QUEUE', {
  connection: {
    host: 'localhost',
    port: 6379,
  },
});

async function main() {
  const jobs = await queue.getJobs(['failed', 'completed', 'waiting', 'active']);
  console.log(`Total jobs: ${jobs.length}`);
  const failed = jobs.filter(j => j.failedReason);
  console.log(`Failed jobs: ${failed.length}`);
  if (failed.length > 0) {
    console.log('Sample failed job error:', failed[0].failedReason);
    console.log('Sample failed job data:', failed[0].data);
  }
  await queue.close();
}

main().catch(console.error);
