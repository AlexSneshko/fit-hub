const { PrismaClient } = require("@prisma/client");

const database = new PrismaClient();

async function main() {
  try {
    await database.category.createMany({
      data: [
        { name: "Chest" },
        { name: "Back" },
        { name: "Legs" },
        { name: "Biceps" },
        { name: "Triceps" },
        { name: "Shoulders" },
        { name: "Formarm" },
        { name: "Neck" },
      ],
    }); 

    console.log("Success");
  } catch (error) {
    console.log("Error seeding the database category");
  } finally {
    await database.$disconnect();
  }
}

main();