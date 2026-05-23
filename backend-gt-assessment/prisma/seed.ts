
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import { config } from 'dotenv';
import { join } from 'path';


config({ path: join(process.cwd(), '.env') });

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error('DATABASE_URL is missing in .env');
}


const pool = new Pool({ connectionString: databaseUrl });

const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({ adapter });
async function main() {
  console.log("Seeding database...");

  await prisma.user.createMany({
    data: [
      { name: 'Temilade Adelowo' },
      { name: 'Ayomide Bamidele' },
      { name: 'ibrahim Dorcas' },
      { name: 'olamide Adebayo' },
      { name: 'olumide Ogunlade' },
    ],
  });

  console.log("Seeding completed");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });