import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  distDir: process.env.NEXT_DIST_DIR ?? ".next",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "static.wixstatic.com",
      },
      {
        protocol: "https",
        hostname: "blogs.ubc.ca",
      },
      {
        protocol: "https",
        hostname: "cf-img-a-in.tosshub.com",
      },
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
      },
      {
        protocol: "https",
        hostname: "www.nitt.edu",
      },
      {
        protocol: "https",
        hostname: "manage.collnod.com",
      },
      {
        protocol: "https",
        hostname: "cdn.dnaindia.com",
      },
      {
        protocol: "https",
        hostname: "img.jagranjosh.com",
      },
      {
        protocol: "https",
        hostname: "assets.thehansindia.com",
      },
      {
        protocol: "https",
        hostname: "bsmedia.business-standard.com",
      },
      {
        protocol: "https",
        hostname: "ksadmission.in",
      },
      {
        protocol: "https",
        hostname: "picestudynation.com",
      },
      {
        protocol: "https",
        hostname: "s3.ap-south-1.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "thesamikhsya.com",
      },
      {
        protocol: "https",
        hostname: "amity.edu",
      },
      {
        protocol: "https",
        hostname: "akm-img-a-in.tosshub.com",
      },
      {
        protocol: "https",
        hostname: "gyaanarth.com",
      },
      {
        protocol: "https",
        hostname: "kj1bcdn.b-cdn.net",
      },
      {
        protocol: "https",
        hostname: "www.mbacollegesbangalore.in",
      },
    ],
  },
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
