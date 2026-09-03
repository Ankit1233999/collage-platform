const officialWebsites: Record<string, string> = {
  "IIT Bombay": "https://www.iitb.ac.in/",
  "IIT Delhi": "https://home.iitd.ac.in/",
  "IIT Madras": "https://www.iitm.ac.in/",
  "BITS Pilani": "https://www.bits-pilani.ac.in/",
  "NIT Trichy": "https://www.nitt.edu/",
  "MNIT Jaipur": "https://mnit.ac.in/",
  "NIT Jaipur": "https://mnit.ac.in/",
  "VIT Vellore": "https://vit.ac.in/",
  "SRM University": "https://www.srmist.edu.in/",
  "IIIT Hyderabad": "https://www.iiit.ac.in/",
  "IISc Bangalore": "https://iisc.ac.in/",
  "Jadavpur University": "https://jadavpuruniversity.in/",
  "Delhi Technological University": "https://www.dtu.ac.in/",
  "Anna University": "https://www.annauniv.edu/",
  "Manipal Institute of Technology": "https://www.manipal.edu/mit.html",
  "Amity University": "https://noida.amity.edu/",
  "Lovely Professional University": "https://www.lpu.in/",
  "Chandigarh University": "https://www.cuchd.in/",
  "University of Hyderabad": "https://uohyd.ac.in/",
  "PES University": "https://pes.edu/",
};

const realCollegeImages: Record<string, string> = {
  "IIT Bombay":
    "https://static.wixstatic.com/media/919bb1_f4e69878d0194f5a8e990ba18b32cc8f~mv2.jpg/v1/fill/w_1450,h_815,q_90/919bb1_f4e69878d0194f5a8e990ba18b32cc8f~mv2.jpg",
  "IIT Delhi":
    "https://blogs.ubc.ca/dominicinindia/files/2012/09/B-Main-Building.jpg",
  "IIT Madras":
    "https://cf-img-a-in.tosshub.com/sites/visualstory/wp/2024/07/India-Today-Archive_IIT-entrance-2-scaled.jpg",
  "BITS Pilani":
    "https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Bits_Clock_tower.jpg/1280px-Bits_Clock_tower.jpg",
  "NIT Trichy":
    "https://www.nitt.edu/nit4.jpg",
  "MNIT Jaipur":
    "https://manage.collnod.com/Upload/Content/web_img_1_12_8_2025_9_49_34.jpeg",
  "NIT Jaipur":
    "https://manage.collnod.com/Upload/Content/web_img_1_12_8_2025_9_49_34.jpeg",
  "VIT Vellore":
    "https://cdn.dnaindia.com/sites/default/files/styles/full/public/2024/08/17/2646675-5555.jpeg",
  "SRM University":
    "https://img.jagranjosh.com/imported/images/E/Articles/srm-ist-admission-2019.jpg",
  "IIIT Hyderabad":
    "https://assets.thehansindia.com/h-upload/2022/05/16/1292531-iith.jpg",
  "IISc Bangalore":
    "https://bsmedia.business-standard.com/_media/bs/img/article/2020-02/19/full/1582054118-0581.jpg",
  "Jadavpur University":
    "https://ksadmission.in/upload/university/jadavpur-university-kolkata-214593.jpg",
  "Delhi Technological University":
    "https://picestudynation.com/images/1/e4f71d4d-ece1-4e5c-98b2-2f40e590149f.jpeg",
  "Anna University":
    "https://s3.ap-south-1.amazonaws.com/gotouniv/cover_photo/1628/cover_photo_1500X500.jpeg",
  "Manipal Institute of Technology":
    "https://thesamikhsya.com/wp-content/uploads/2023/04/Manipal-Institute-of-Technology.jpg",
  "Amity University": "https://amity.edu/noida/afaf/images/about-1.jpg",
  "Lovely Professional University":
    "https://akm-img-a-in.tosshub.com/indiatoday/images/story/202508/lpu-28290127-3x4.jpeg",
  "Chandigarh University":
    "https://gyaanarth.com/wp-content/uploads/2022/06/NAAC-A-NBA-accreditations.jpg",
  "University of Hyderabad":
    "https://kj1bcdn.b-cdn.net/media/49973/university-of-hyderabad-aerial-view.jpg",
  "PES University":
    "https://www.mbacollegesbangalore.in/wp-content/uploads/2017/10/PES-University-Bangalore.jpg",
};

export function getOfficialWebsite(collegeName: string) {
  return officialWebsites[collegeName] ?? "";
}

export function getCollegeImage(collegeName: string, fallbackImage = "") {
  return realCollegeImages[collegeName] ?? fallbackImage;
}
