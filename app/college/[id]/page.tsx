import Link from "next/link";
import { prisma } from "../../../lib/prisma";

type CollegeDetail = {
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

export default async function CollegeDetailPage({
  params,
}: {
  params: Promise<{ id: string | string[] }>;
}) {
  const resolvedParams = await params;
  const collegeId = Array.isArray(resolvedParams.id) ? resolvedParams.id[0] : resolvedParams.id;

  if (!collegeId) {
    return (
      <div className="min-h-screen bg-gray-100 p-10 flex items-center justify-center">
        <div className="max-w-xl w-full rounded-3xl bg-white p-10 text-center shadow-xl">
          <div className="text-6xl mb-4">😕</div>
          <h1 className="text-3xl font-semibold mb-3">College Not Found</h1>
          <p className="text-gray-600 mb-6">
            The college you are looking for does not exist or the link is invalid.
          </p>
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full bg-blue-600 px-6 py-3 text-white font-semibold transition hover:bg-blue-700"
          >
            Back to list
          </Link>
        </div>
      </div>
    );
  }

  const college = await prisma.college.findUnique({
    where: {
      id: collegeId,
    },
  });

  if (!college) {
    return (
      <div className="min-h-screen bg-gray-100 p-10 flex items-center justify-center">
        <div className="max-w-xl w-full rounded-3xl bg-white p-10 text-center shadow-xl">
          <div className="text-6xl mb-4">😕</div>
          <h1 className="text-3xl font-semibold mb-3">College Not Found</h1>
          <p className="text-gray-600 mb-6">
            The college you are looking for does not exist or the link is invalid.
          </p>
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full bg-blue-600 px-6 py-3 text-white font-semibold transition hover:bg-blue-700"
          >
            Back to list
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 rounded-[2rem] border border-white/10 bg-slate-900/80 p-8 shadow-2xl shadow-slate-900/60 backdrop-blur-xl">
          <p className="text-sm uppercase tracking-[.3em] text-cyan-300/80">College profile</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            {college.name}
          </h1>
          <p className="mt-3 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
            Explore an expertly designed overview of this institution, including key metrics, placement strength, student body size, and available courses.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.15fr_.85fr]">
          <section className="space-y-6 rounded-[2rem] bg-white/5 p-8 shadow-xl shadow-slate-900/40 ring-1 ring-white/10 backdrop-blur">
            <div className="overflow-hidden rounded-[1.5rem] border border-white/10 shadow-xl shadow-slate-950/40">
              <img
                src={college.image}
                alt={college.name}
                className="h-96 w-full object-cover"
              />
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div className="rounded-[1.5rem] bg-slate-950/80 p-6 ring-1 ring-white/10">
                <p className="text-sm uppercase tracking-[.24em] text-slate-400">Location</p>
                <p className="mt-4 text-2xl font-semibold text-white">{college.location}</p>
              </div>
              <div className="rounded-[1.5rem] bg-slate-950/80 p-6 ring-1 ring-white/10">
                <p className="text-sm uppercase tracking-[.24em] text-slate-400">Students</p>
                <p className="mt-4 text-2xl font-semibold text-white">{college.students.toLocaleString()}</p>
              </div>
            </div>

            <div className="rounded-[1.5rem] bg-slate-950/80 p-6 ring-1 ring-white/10">
              <p className="text-sm uppercase tracking-[.24em] text-slate-400">Key strengths</p>
              <ul className="mt-4 space-y-3 text-slate-300">
                <li className="flex items-start gap-3">
                  <span className="mt-1 inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-300">🏆</span>
                  <div>
                    <p className="font-semibold text-white">Placements</p>
                    <p className="mt-1 text-sm text-slate-400">{college.placements}</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-300">⭐</span>
                  <div>
                    <p className="font-semibold text-white">Rating</p>
                    <p className="mt-1 text-sm text-slate-400">{college.rating.toFixed(1)} out of 5</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-violet-500/10 text-violet-300">🎓</span>
                  <div>
                    <p className="font-semibold text-white">Courses</p>
                    <p className="mt-1 text-sm text-slate-400">{college.courses}</p>
                  </div>
                </li>
              </ul>
            </div>
          </section>

          <aside className="space-y-6 rounded-[2rem] bg-slate-900/80 p-8 shadow-xl shadow-slate-950/40 ring-1 ring-white/10 backdrop-blur">
            <div className="rounded-[1.5rem] bg-slate-950/70 p-6 ring-1 ring-white/10">
              <h2 className="text-xl font-semibold text-white">Admissions snapshot</h2>
              <p className="mt-3 text-slate-300 leading-7">
                This college delivers a balanced mix of academic strength and practical career-readiness, with strong placement outcomes and rising student enrollment.
              </p>
            </div>

            <div className="grid gap-4">
              <div className="rounded-[1.5rem] bg-slate-950/70 p-6 ring-1 ring-white/10">
                <p className="text-sm uppercase tracking-[.24em] text-slate-400">Annual Fees</p>
                <p className="mt-3 text-3xl font-semibold text-white">₹{college.fees.toLocaleString()}</p>
              </div>
              <div className="rounded-[1.5rem] bg-slate-950/70 p-6 ring-1 ring-white/10">
                <p className="text-sm uppercase tracking-[.24em] text-slate-400">Student count</p>
                <p className="mt-3 text-3xl font-semibold text-white">{college.students.toLocaleString()}</p>
              </div>
            </div>

            <Link
              href="/"
              className="inline-flex w-full items-center justify-center rounded-full bg-cyan-500 px-6 py-3 text-sm font-semibold uppercase tracking-[.16em] text-slate-950 transition hover:bg-cyan-400"
            >
              Back to list
            </Link>
          </aside>
        </div>
      </div>
    </div>
  );
}