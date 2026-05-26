"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

type College = {
  id: string;
  name: string;
  location: string;
  fees: number;
  rating: number;
  placements: string;
  courses: string;
  image: string;
  students: number;
};

export default function Home() {
  const [colleges, setColleges] = useState<College[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("/api/colleges", { cache: "no-store" })
      .then((res) => res.json())
      .then((data: College[]) => setColleges(data));
  }, []);

  const filteredColleges = colleges.filter((college) =>
    college.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-5xl font-bold text-center text-blue-700 mb-10">
        College Platform
      </h1>

      <div className="flex justify-center mb-10">
        <input
          type="text"
          placeholder="Search college..."
          className="w-full max-w-xl p-4 rounded-xl border border-gray-300 shadow-md text-black"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredColleges.map((college) => (
          <div key={college.id} className="bg-white p-6 rounded-xl shadow-lg">
            <Image
              src={college.image}
              alt={college.name}
              width={800}
              height={450}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />

            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              {college.name}
            </h2>

            <p className="text-gray-700 mb-2">Location: {college.location}</p>
            <p className="text-gray-700 mb-2">
              Fees: Rs. {college.fees.toLocaleString()}
            </p>
            <p className="text-gray-700 mb-2">Rating: {college.rating}</p>
            <p className="text-gray-700 mb-2">
              Placements: {college.placements}
            </p>
            <p className="text-gray-700">Courses: {college.courses}</p>

            <Link
              href={`/college/${college.id}`}
              className="inline-block mt-5 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
}
