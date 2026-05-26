/* eslint-disable @typescript-eslint/no-require-imports */
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  await prisma.college.createMany({
    data: [
      {
        name: "IIT Bombay",
        location: "Mumbai",
        fees: 250000,
        rating: 4.9,
        placements: "98%",
        courses: "B.Tech, M.Tech, MBA",
        image: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80",
        students: 14500,
      },

      {
        name: "IIT Delhi",
        location: "Delhi",
        fees: 240000,
        rating: 4.8,
        placements: "97%",
        courses: "B.Tech, M.Tech",
        image: "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?auto=format&fit=crop&w=800&q=80",
        students: 13200,
      },

      {
        name: "IIT Madras",
        location: "Chennai",
        fees: 230000,
        rating: 4.8,
        placements: "97%",
        courses: "B.Tech, M.Tech",
        image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80",
        students: 12500,
      },

      {
        name: "BITS Pilani",
        location: "Pilani",
        fees: 300000,
        rating: 4.9,
        placements: "98%",
        courses: "B.Tech, MBA",
        image: "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?auto=format&fit=crop&w=800&q=80",
        students: 10200,
      },

      {
        name: "NIT Trichy",
        location: "Tamil Nadu",
        fees: 170000,
        rating: 4.7,
        placements: "93%",
        courses: "B.Tech, MCA",
        image: "https://images.unsplash.com/photo-1564981797816-1043664bf78d?auto=format&fit=crop&w=800&q=80",
        students: 10400,
      },

      {
        name: "MNIT Jaipur",
        location: "Jaipur",
        fees: 180000,
        rating: 4.4,
        placements: "88%",
        courses: "B.Tech, M.Tech",
        image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80",
        students: 8100,
      },

      {
        name: "NIT Jaipur",
        location: "Jaipur",
        fees: 150000,
        rating: 4.5,
        placements: "90%",
        courses: "B.Tech, MCA",
        image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=800&q=80",
        students: 7600,
      },

      {
        name: "VIT Vellore",
        location: "Vellore",
        fees: 200000,
        rating: 4.3,
        placements: "89%",
        courses: "B.Tech, MBA",
        image: "https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=800&q=80",
        students: 11000,
      },

      {
        name: "SRM University",
        location: "Chennai",
        fees: 210000,
        rating: 4.2,
        placements: "85%",
        courses: "B.Tech, BCA",
        image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80",
        students: 14000,
      },

      {
        name: "IIIT Hyderabad",
        location: "Hyderabad",
        fees: 220000,
        rating: 4.8,
        placements: "96%",
        courses: "B.Tech, M.Tech",
        image: "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?auto=format&fit=crop&w=800&q=80",
        students: 8800,
      },
    ],
  });

  console.log("10 Colleges Added Successfully");
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
