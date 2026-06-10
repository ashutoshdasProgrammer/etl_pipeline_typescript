
created redis image file inside docker and running it localhost:6379

✓ Redis -> connected in docker
✓ PostgreSQL - connected in docker
✓ BullMQ Queue
✓ Worker
✓ User Table
✓ Prisma Schema
✓ Prisma Migration
✓ Prisma Client generated
✓ Prisma adapter
✓ Prisma connected to PostgreSQL


## Flow

CSV (file stored inside src/data/user-data.csv) 
  |
  v
 EXTRACT (extractCSVData => logic written in src/extract/data.extract.code.ts) 
  |
  v
 QUEUE (etlQueue => logic written in src/producer.ts) 
  |
  v
 WORKER (worker => logic written in src/worker/worker.ts) 
  |
  v
 JOI VALIDATION (userSchema => logic written in src/validators/user.validator.ts) 
  |
  v
 PRISMA (User => logic written in src/config/prisma.ts) 
  |
  v
 POSTGRESQL

