import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const newBuyer = await prisma.buyer.create({
    data: {
      fullName: "John Doe",
      phone: "9876543210",
      city: "Chandigarh",
      propertyType: "Apartment",
      purpose: "Buy",
      timeline: "0-3m",
      source: "Website",
      status: "New",
      ownerId: "user-uuid-here",
    }
  });
  console.log(newBuyer);
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
