"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { getCollegeImage, getOfficialWebsite } from "../lib/college-websites";

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

type SortKey = "rating" | "fees-low" | "students";

const currencyFormatter = new Intl.NumberFormat("en-IN", {
  maximumFractionDigits: 0,
  style: "currency",
  currency: "INR",
});

function placementValue(placements: string) {
  const match = placements.match(/\d+/);
  return match ? Number(match[0]) : 0;
}

function CollegeCard({ college }: { college: College }) {
  const officialWebsite = getOfficialWebsite(college.name);
  const collegeImage = getCollegeImage(college.name, college.image);

  return (
    <article className="overflow-hidden rounded-lg border border-stone-200 bg-white shadow-sm transition hover:-translate-y-1 hover:border-teal-300 hover:shadow-lg">
      <Image
        src={collegeImage}
        alt={college.name}
        width={800}
        height={450}
        className="h-48 w-full object-cover"
      />

      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-teal-700">
              {college.location}
            </p>
            <h3 className="mt-1 text-xl font-bold leading-7 text-stone-950">
              {college.name}
            </h3>
          </div>
          <div className="min-w-16 rounded-lg bg-amber-100 px-3 py-2 text-center text-amber-950">
            <p className="text-xs font-semibold">Rating</p>
            <p className="text-lg font-bold">{college.rating.toFixed(1)}</p>
          </div>
        </div>

        <dl className="mt-5 grid grid-cols-3 gap-3 text-sm">
          <div>
            <dt className="text-stone-500">Fees</dt>
            <dd className="mt-1 font-semibold text-stone-950">
              {currencyFormatter.format(college.fees)}
            </dd>
          </div>
          <div>
            <dt className="text-stone-500">Placement</dt>
            <dd className="mt-1 font-semibold text-stone-950">
              {college.placements}
            </dd>
          </div>
          <div>
            <dt className="text-stone-500">Students</dt>
            <dd className="mt-1 font-semibold text-stone-950">
              {college.students.toLocaleString("en-IN")}
            </dd>
          </div>
        </dl>

        <p className="mt-5 line-clamp-2 min-h-12 text-sm leading-6 text-stone-600">
          {college.courses}
        </p>

        <div className="mt-5 grid gap-2 sm:grid-cols-[1fr_auto]">
          {officialWebsite ? (
            <a
              href={officialWebsite}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-10 items-center justify-center rounded-lg bg-stone-950 px-4 text-sm font-semibold text-white transition hover:bg-teal-800"
            >
              Official Website
            </a>
          ) : (
            <Link
              href={`/college/${college.id}`}
              className="inline-flex h-10 items-center justify-center rounded-lg bg-stone-950 px-4 text-sm font-semibold text-white transition hover:bg-teal-800"
            >
              View Details
            </Link>
          )}
          <Link
            href={`/college/${college.id}`}
            className="inline-flex h-10 items-center justify-center rounded-lg border border-stone-300 bg-white px-4 text-sm font-semibold text-stone-800 transition hover:border-teal-500 hover:text-teal-800"
          >
            Profile
          </Link>
        </div>
      </div>
    </article>
  );
}

export default function Home() {
  const [colleges, setColleges] = useState<College[]>([]);
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("All");
  const [course, setCourse] = useState("All");
  const [sortBy, setSortBy] = useState<SortKey>("rating");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadColleges() {
      try {
        setIsLoading(true);
        setError("");

        const response = await fetch("/api/colleges", { cache: "no-store" });

        if (!response.ok) {
          throw new Error("Could not load colleges");
        }

        const data = (await response.json()) as College[];

        if (isMounted) {
          setColleges(data);
        }
      } catch {
        if (isMounted) {
          setError("We could not load colleges right now. Please try again.");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadColleges();

    return () => {
      isMounted = false;
    };
  }, []);

  const locations = useMemo(
    () => [
      "All",
      ...Array.from(new Set(colleges.map((item) => item.location))).sort(),
    ],
    [colleges]
  );

  const courses = useMemo(() => {
    const values = colleges.flatMap((item) =>
      item.courses.split(",").map((value) => value.trim())
    );

    return ["All", ...Array.from(new Set(values)).sort()];
  }, [colleges]);

  const filteredColleges = useMemo(() => {
    const query = search.trim().toLowerCase();

    return colleges
      .filter((college) => {
        const matchesSearch =
          college.name.toLowerCase().includes(query) ||
          college.location.toLowerCase().includes(query) ||
          college.courses.toLowerCase().includes(query);
        const matchesLocation = location === "All" || college.location === location;
        const matchesCourse =
          course === "All" ||
          college.courses
            .split(",")
            .map((item) => item.trim())
            .includes(course);

        return matchesSearch && matchesLocation && matchesCourse;
      })
      .sort((a, b) => {
        if (sortBy === "fees-low") {
          return a.fees - b.fees;
        }

        if (sortBy === "students") {
          return b.students - a.students;
        }

        return b.rating - a.rating;
      });
  }, [colleges, course, location, search, sortBy]);

  const stats = useMemo(() => {
    if (!colleges.length) {
      return {
        averageRating: "0.0",
        bestPlacement: "0%",
        collegeCount: 0,
        totalStudents: 0,
      };
    }

    const ratingTotal = colleges.reduce((total, college) => total + college.rating, 0);
    const bestPlacement = colleges.reduce(
      (best, college) => Math.max(best, placementValue(college.placements)),
      0
    );
    const totalStudents = colleges.reduce(
      (total, college) => total + college.students,
      0
    );

    return {
      averageRating: (ratingTotal / colleges.length).toFixed(1),
      bestPlacement: `${bestPlacement}%`,
      collegeCount: colleges.length,
      totalStudents,
    };
  }, [colleges]);

  const resetFilters = () => {
    setSearch("");
    setLocation("All");
    setCourse("All");
    setSortBy("rating");
  };

  return (
    <main className="min-h-screen bg-[#f6f4ef] text-stone-950">
      <section className="border-b border-stone-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[1.05fr_.95fr] lg:px-8">
          <div className="flex min-h-[360px] flex-col justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-700">
                College finder
              </p>
              <h1 className="mt-4 max-w-4xl text-4xl font-bold tracking-tight text-stone-950 sm:text-6xl">
                Compare colleges with clarity.
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-8 text-stone-600 sm:text-lg">
                Search campuses, compare fees, review placement strength, and
                open a focused profile when a college looks right.
              </p>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              <div className="border-l-4 border-teal-600 bg-stone-50 px-4 py-3">
                <p className="text-2xl font-bold">{stats.collegeCount}</p>
                <p className="text-sm text-stone-600">Listed colleges</p>
              </div>
              <div className="border-l-4 border-rose-500 bg-stone-50 px-4 py-3">
                <p className="text-2xl font-bold">{stats.averageRating}</p>
                <p className="text-sm text-stone-600">Average rating</p>
              </div>
              <div className="border-l-4 border-amber-500 bg-stone-50 px-4 py-3">
                <p className="text-2xl font-bold">{stats.bestPlacement}</p>
                <p className="text-sm text-stone-600">Top placement</p>
              </div>
            </div>
          </div>

          <div className="relative min-h-[360px] overflow-hidden rounded-lg">
            <Image
              src="https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&w=1200&q=80"
              alt="Students walking through a college campus"
              width={1200}
              height={800}
              priority
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 bg-stone-950/80 p-5 text-white">
              <p className="text-sm uppercase tracking-[0.16em] text-amber-200">
                Active intake
              </p>
              <p className="mt-2 text-3xl font-bold">
                {stats.totalStudents.toLocaleString("en-IN")} students
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid gap-3 border-y border-stone-200 py-4 lg:grid-cols-[1.5fr_1fr_1fr_1fr_auto]">
          <label className="block">
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-stone-500">
              Search
            </span>
            <input
              type="search"
              placeholder="Name, city, or course"
              className="mt-2 h-11 w-full rounded-lg border border-stone-300 bg-white px-3 text-sm text-stone-950 outline-none transition focus:border-teal-700 focus:ring-2 focus:ring-teal-700/20"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </label>

          <label className="block">
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-stone-500">
              Location
            </span>
            <select
              className="mt-2 h-11 w-full rounded-lg border border-stone-300 bg-white px-3 text-sm text-stone-950 outline-none transition focus:border-teal-700 focus:ring-2 focus:ring-teal-700/20"
              value={location}
              onChange={(event) => setLocation(event.target.value)}
            >
              {locations.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-stone-500">
              Course
            </span>
            <select
              className="mt-2 h-11 w-full rounded-lg border border-stone-300 bg-white px-3 text-sm text-stone-950 outline-none transition focus:border-teal-700 focus:ring-2 focus:ring-teal-700/20"
              value={course}
              onChange={(event) => setCourse(event.target.value)}
            >
              {courses.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-stone-500">
              Sort
            </span>
            <select
              className="mt-2 h-11 w-full rounded-lg border border-stone-300 bg-white px-3 text-sm text-stone-950 outline-none transition focus:border-teal-700 focus:ring-2 focus:ring-teal-700/20"
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value as SortKey)}
            >
              <option value="rating">Highest rating</option>
              <option value="fees-low">Lowest fees</option>
              <option value="students">Largest campus</option>
            </select>
          </label>

          <button
            type="button"
            className="h-11 self-end rounded-lg border border-stone-300 bg-white px-4 text-sm font-semibold text-stone-700 transition hover:border-stone-500 hover:text-stone-950"
            onClick={resetFilters}
          >
            Reset
          </button>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
        <div className="mb-5 flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-semibold text-teal-800">
              {filteredColleges.length} matches
            </p>
            <h2 className="text-2xl font-bold tracking-tight text-stone-950">
              Colleges to review
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-6 text-stone-600">
            Fees are annual estimates from the current college dataset.
          </p>
        </div>

        {isLoading ? (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="h-[410px] animate-pulse rounded-lg border border-stone-200 bg-white"
              />
            ))}
          </div>
        ) : error ? (
          <div className="rounded-lg border border-rose-200 bg-rose-50 px-5 py-4 text-rose-900">
            {error}
          </div>
        ) : filteredColleges.length ? (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {filteredColleges.map((college) => (
              <CollegeCard key={college.id} college={college} />
            ))}
          </div>
        ) : (
          <div className="rounded-lg border border-stone-200 bg-white px-6 py-10 text-center">
            <h3 className="text-xl font-bold text-stone-950">No colleges found</h3>
            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-stone-600">
              Try changing your search, city, or course filters.
            </p>
            <button
              type="button"
              className="mt-5 rounded-lg bg-stone-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-teal-800"
              onClick={resetFilters}
            >
              Clear Filters
            </button>
          </div>
        )}
      </section>
    </main>
  );
}
