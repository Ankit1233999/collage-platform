/* eslint-disable @typescript-eslint/no-require-imports */
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const colleges = [
  {
    name: "IIT Bombay",
    location: "Mumbai",
    fees: 250000,
    rating: 4.9,
    placements: "98%",
    courses: "B.Tech, M.Tech, MBA",
    image: "https://static.wixstatic.com/media/919bb1_f4e69878d0194f5a8e990ba18b32cc8f~mv2.jpg/v1/fill/w_1450,h_815,q_90/919bb1_f4e69878d0194f5a8e990ba18b32cc8f~mv2.jpg",
    students: 14500,
  },
{
  name: "IIT Delhi",
  location: "Delhi",
  fees: 240000,
  rating: 4.8,
  placements: "97%",
  courses: "B.Tech, M.Tech",
  image: "https://upload.wikimedia.org/wikipedia/commons/0/03/IIT_Delhi_campus.jpg",
  students: 13200,
},
  {
    name: "IIT Madras",
    location: "Chennai",
    fees: 230000,
    rating: 4.8,
    placements: "97%",
    courses: "B.Tech, M.Tech",
    image: "https://cf-img-a-in.tosshub.com/sites/visualstory/wp/2024/07/India-Today-Archive_IIT-entrance-2-scaled.jpg",
    students: 12500,
  },
  {
    name: "BITS Pilani",
    location: "Pilani",
    fees: 300000,
    rating: 4.9,
    placements: "98%",
    courses: "B.Tech, MBA",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Bits_Clock_tower.jpg/1280px-Bits_Clock_tower.jpg",
    students: 10200,
  },
  {
    name: "NIT Trichy",
    location: "Tamil Nadu",
    fees: 170000,
    rating: 4.7,
    placements: "93%",
    courses: "B.Tech, MCA",
    image: "https://www.nitt.edu/nit4.jpg",
    students: 10400,
  },
  {
    name: "MNIT Jaipur",
    location: "Jaipur",
    fees: 180000,
    rating: 4.4,
    placements: "88%",
    courses: "B.Tech, M.Tech",
    image: "https://manage.collnod.com/Upload/Content/web_img_1_12_8_2025_9_49_34.jpeg",
    students: 8100,
  },
  {
    name: "NIT Jaipur",
    location: "Jaipur",
    fees: 150000,
    rating: 4.5,
    placements: "90%",
    courses: "B.Tech, MCA",
    image: "https://manage.collnod.com/Upload/Content/web_img_1_12_8_2025_9_49_34.jpeg",
    students: 7600,
  },
  {
    name: "VIT Vellore",
    location: "Vellore",
    fees: 200000,
    rating: 4.3,
    placements: "89%",
    courses: "B.Tech, MBA",
    image: "https://cdn.dnaindia.com/sites/default/files/styles/full/public/2024/08/17/2646675-5555.jpeg",
    students: 11000,
  },
  {
    name: "SRM University",
    location: "Chennai",
    fees: 210000,
    rating: 4.2,
    placements: "85%",
    courses: "B.Tech, BCA",
    image: "https://img.jagranjosh.com/imported/images/E/Articles/srm-ist-admission-2019.jpg",
    students: 14000,
  },
  {
    name: "IIIT Hyderabad",
    location: "Hyderabad",
    fees: 220000,
    rating: 4.8,
    placements: "96%",
    courses: "B.Tech, M.Tech",
    image: "https://assets.thehansindia.com/h-upload/2022/05/16/1292531-iith.jpg",
    students: 8800,
  },
  {
    name: "IISc Bangalore",
    location: "Bengaluru",
    fees: 190000,
    rating: 4.9,
    placements: "95%",
    courses: "B.Tech, M.Tech, PhD",
    image: "https://bsmedia.business-standard.com/_media/bs/img/article/2020-02/19/full/1582054118-0581.jpg",
    students: 5100,
  },
  {
    name: "Jadavpur University",
    location: "Kolkata",
    fees: 35000,
    rating: 4.6,
    placements: "91%",
    courses: "B.Tech, M.Tech, MBA",
    image: "https://ksadmission.in/upload/university/jadavpur-university-kolkata-214593.jpg",
    students: 12000,
  },
  {
    name: "Delhi Technological University",
    location: "Delhi",
    fees: 210000,
    rating: 4.5,
    placements: "92%",
    courses: "B.Tech, M.Tech, MBA",
    image: "https://picestudynation.com/images/1/e4f71d4d-ece1-4e5c-98b2-2f40e590149f.jpeg",
    students: 9800,
  },
  {
    name: "Anna University",
    location: "Chennai",
    fees: 80000,
    rating: 4.4,
    placements: "86%",
    courses: "B.Tech, M.Tech, MCA",
    image: "https://s3.ap-south-1.amazonaws.com/gotouniv/cover_photo/1628/cover_photo_1500X500.jpeg",
    students: 17000,
  },
  {
    name: "Manipal Institute of Technology",
    location: "Manipal",
    fees: 320000,
    rating: 4.3,
    placements: "88%",
    courses: "B.Tech, M.Tech, MCA",
    image: "https://thesamikhsya.com/wp-content/uploads/2023/04/Manipal-Institute-of-Technology.jpg",
    students: 9500,
  },
  {
    name: "Amity University",
    location: "Noida",
    fees: 280000,
    rating: 4.1,
    placements: "82%",
    courses: "B.Tech, BCA, MBA",
    image: "https://amity.edu/noida/afaf/images/about-1.jpg",
    students: 22000,
  },
  {
    name: "Lovely Professional University",
    location: "Phagwara",
    fees: 160000,
    rating: 4.0,
    placements: "80%",
    courses: "B.Tech, BCA, MBA, MCA",
    image: "https://akm-img-a-in.tosshub.com/indiatoday/images/story/202508/lpu-28290127-3x4.jpeg",
    students: 30000,
  },
  {
  name: "Chandigarh University",
  location: "Mohali",
  fees: 175000,
  rating: 4.2,
  placements: "84%",
  courses: "B.Tech, BCA, MBA",
  image: "https://images.unsplash.com/photo-1564981797816-1043664bf78d?auto=format&fit=crop&w=800&q=80",
  students: 25000,
},
  {
    name: "University of Hyderabad",
    location: "Hyderabad",
    fees: 60000,
    rating: 4.5,
    placements: "83%",
    courses: "M.Tech, MCA, MBA",
    image: "https://kj1bcdn.b-cdn.net/media/49973/university-of-hyderabad-aerial-view.jpg",
    students: 6500,
  },
  {
    name: "PES University",
    location: "Bengaluru",
    fees: 260000,
    rating: 4.3,
    placements: "90%",
    courses: "B.Tech, M.Tech, MBA",
    image: "https://www.mbacollegesbangalore.in/wp-content/uploads/2017/10/PES-University-Bangalore.jpg",
    students: 7800,
  },
];

async function main() {
  const existingColleges = await prisma.college.findMany({
    where: {
      name: {
        in: colleges.map((college) => college.name),
      },
    },
    select: {
      name: true,
    },
  });
  const existingNames = new Set(existingColleges.map((college) => college.name));
  const newColleges = colleges.filter((college) => !existingNames.has(college.name));

  if (!newColleges.length) {
    console.log("No new colleges to add.");
    return;
  }

  await prisma.college.createMany({
    data: newColleges,
  });

  console.log(`${newColleges.length} Colleges Added Successfully`);
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
