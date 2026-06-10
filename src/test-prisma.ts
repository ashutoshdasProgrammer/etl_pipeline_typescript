import { prisma } from './config/prisma.ts'

async function main() {
    const user = await prisma.user.findMany();
    console.log(user);
}

main()
.catch(console.error)
.finally(async() => {
    await prisma.$disconnect();
});