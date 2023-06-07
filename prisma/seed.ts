import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // delete all
  await prisma.settings.deleteMany();
  // seeding
  const settings: Prisma.SettingsCreateInput[] = [
    {
      key: "figmaAccessToken",
      value: "",
    },
    {
      key: "figmaAPIEndpoint",
      value: "https://api.figma.com/v1/files/",
    },
  ];
  for (const setting of settings) {
    await prisma.settings.create({
      data: setting,
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
