
import "dotenv/config";

import {PrismaPg} from '@prisma/adapter-pg';
import { PrismaClient } from "../generated/prisma/client.ts";

const connectionString = `${process.env.DATABASE_URL}`;

// adapter connected to postgreSQL database
const adapter = new PrismaPg({connectionString});

// prismaClient connected to adapter
const prisma = new PrismaClient({adapter});

export {prisma};