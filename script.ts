import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const posts = await prisma.user
    .findFirst({
      where: { email: "laptopisasset@gmail.com" },
    })
    .posts();

  console.dir({ posts }, { depth: Infinity });
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
