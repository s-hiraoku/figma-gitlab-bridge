import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // delete all
  await prisma.settingsData.deleteMany();
  // seeding
  const settingsData: Prisma.SettingsDataCreateInput[] = [
    {
      appId: "figma-sticky-to-gitlab-issues",
      key: "figmaToken",
      value: "",
    },
    {
      appId: "figma-sticky-to-gitlab-issues",
      key: "figmaAPIEndpoint",
      value: "https://api.figma.com/v1/",
    },
  ];
  for (const settingData of settingsData) {
    await prisma.settingsData.create({
      data: settingData,
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
