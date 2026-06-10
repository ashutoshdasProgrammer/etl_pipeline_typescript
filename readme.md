
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



## Infrastructure:

┌─────────────────────────────────────────────────────────┐
│                        Docker                         │
│                                                         │
│  ┌───────────────────────┐  ┌───────────────────────┐ │
│  │     Redis (6379)        │  │   PostgreSQL (5432)     │ │
│  │                       │  │                       │ │
│  └───────────────────────┘  └───────────────────────┘ │
└─────────────────────────────────────────────────────────┘
           │                         │
           ▼                         ▼
┌─────────────────────────────────────────────────────────┐
│                   Typescript Application                │
│                                                         │
│  ┌─────────────┐    ┌──────────────┐    ┌──────────────┐  │
│  │   Extract   │ →  │   Queue      │ →  │   Worker     │  │
│  │ (CSV)       │    │ (BullMQ)     │    │ (Processing) │  │
│  └─────────────┘    └──────────────┘    └──────────────┘  │
│                                                         │
│      ┌─────────────┐   ┌─────────────┐                │
│      │ Validator   │ → │   Prisma     │                │
│      │ (Joi)       │   │ (Adapter)   │                │
│      └─────────────┘   └─────────────┘                │
└─────────────────────────────────────────────────────────┘
           │                               
           ▼                               ▼
┌─────────────────────────┐     ┌─────────────────────────┐
│     User Table          │     │ PostgreSQL              │
│ (userId, gender, age,    │     │                         │
│ estimatedSalary,        │     │                         │
│ purchased, created_at)  │     │                         │
└─────────────────────────┘     └─────────────────────────┘



##
1. Redis -> connected in docker
2. PostgreSQL - connected in docker
3. BullMQ Queue
4. Worker
5. User Table
6. Prisma Schema
7. Prisma Migration
8. Prisma Client generated
9. Prisma adapter
10. Prisma connected to PostgreSQL

If you want to run files indivisually then run with npx tsx .\src\test-prisma.ts

# What this etl pipeline still needs?
Phase 1.
  Data Quality
    1. Joi Validation
    2. Logging
    3. Error Handling
Phase 2.
  Reliability
    1. Retry Mechanism
    2. Dead Letter Queue
    3. Monitoring
    4. Idempotency
Phase 3.
  Architecture
    1. Service Layer
    2. Repository Layer
    3. Controller Layer
    4. Model Layer
Phase 4.
  Operations
    1. Metrics
    2. Health Checks
    3. Docker Compose
    4. Environment Management