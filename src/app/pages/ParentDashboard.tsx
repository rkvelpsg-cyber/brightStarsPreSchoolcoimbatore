import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import {
  clearDashboardAuth,
  getDashboardAuth,
  getDashboardData,
  payFees,
  DashboardData,
} from "../dashboard/store";

export function ParentDashboard() {
  const navigate = useNavigate();
  const [data, setData] = useState<DashboardData>(() => getDashboardData());
  const [payAmount, setPayAmount] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const auth = getDashboardAuth();
    if (!auth || auth.role !== "parent") {
      navigate("/login");
      return;
    }
    setData(getDashboardData());
  }, [navigate]);

  const handlePayFees = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const amount = Number(payAmount);
    if (!Number.isFinite(amount) || amount <= 0) {
      setMessage("Please enter a valid fee amount.");
      return;
    }
    const updated = payFees(amount);
    setData(updated);
    setPayAmount("");
    setMessage("Fee payment recorded successfully.");
  };

  const logout = () => {
    clearDashboardAuth();
    navigate("/login");
  };

  const attendancePercent = data.attendanceTotal
    ? Math.round((data.attendancePresent / data.attendanceTotal) * 100)
    : 0;

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 px-4 py-8">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-20 top-20 h-72 w-72 rounded-full bg-sky-500/30 blur-3xl" />
        <div className="absolute right-0 top-40 h-80 w-80 rounded-full bg-emerald-500/20 blur-3xl" />
        <div className="absolute bottom-0 left-0 right-0 h-2/3 bg-gradient-to-t from-slate-950 via-slate-900/90 to-transparent" />
      </div>

      <div className="relative mx-auto w-full max-w-6xl">
        <div className="mb-6 overflow-hidden rounded-[2rem] border border-white/15 bg-white/95 shadow-2xl backdrop-blur">
          <div className="grid gap-0 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="bg-gradient-to-br from-sky-600 via-blue-700 to-cyan-700 p-6 text-white sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.26em] text-white/80">
                Parent Dashboard
              </p>
              <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
                Welcome, Parent
              </h1>
              <p className="mt-2 text-base text-white/90 sm:text-lg">
                Student: {data.studentName} | Class: {data.className}
              </p>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/80 sm:text-base">
                Track attendance, school activities, events, photos and fee
                updates in one secure place.
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                <button
                  onClick={() => navigate("/")}
                  className="rounded-full border border-white/50 bg-white/20 px-5 py-2 text-sm font-semibold text-white transition hover:bg-white/30"
                >
                  Home
                </button>
                <button
                  onClick={logout}
                  className="rounded-full bg-slate-950 px-5 py-2 text-sm font-semibold text-white transition hover:bg-black"
                >
                  Logout
                </button>
              </div>
            </div>

            <div className="relative min-h-52 bg-slate-200">
              <img
                src="https://images.unsplash.com/photo-1516627145497-ae6968895b16?auto=format&fit=crop&w=1400&q=60"
                alt="Happy students in classroom"
                className="h-full w-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
            </div>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Attendance"
            value={`${attendancePercent}%`}
            subtitle={`${data.attendancePresent}/${data.attendanceTotal} days`}
            tone="from-cyan-100 to-sky-100 border-cyan-200"
          />
          <StatCard
            title="Fees Paid"
            value={`₹${data.feesPaid.toLocaleString()}`}
            subtitle={`of ₹${data.feesTotal.toLocaleString()}`}
            tone="from-emerald-100 to-teal-100 border-emerald-200"
          />
          <StatCard
            title="Fees Due"
            value={`₹${data.feesDue.toLocaleString()}`}
            subtitle={`Next due: ${data.nextDueDate}`}
            tone="from-amber-100 to-orange-100 border-amber-200"
          />
          <StatCard
            title="Last Update"
            value={new Date(data.updatedAt).toLocaleDateString()}
            subtitle="Synced from school admin"
            tone="from-violet-100 to-fuchsia-100 border-violet-200"
          />
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <Panel
            title="Daily Activities"
            items={data.dailyActivities}
            tone="from-sky-50 to-cyan-50 border-sky-100"
          />
          <Panel
            title="Upcoming Festivals"
            items={data.upcomingFestivals}
            tone="from-pink-50 to-rose-50 border-rose-100"
          />
          <Panel
            title="Upcoming Events"
            items={data.upcomingEvents}
            tone="from-indigo-50 to-violet-50 border-indigo-100"
          />
          <div className="rounded-3xl border border-sky-100 bg-gradient-to-br from-white to-sky-50 p-5 shadow-lg">
            <h2 className="text-xl font-bold text-slate-900">
              Performance Notes
            </h2>
            <p className="mt-3 whitespace-pre-wrap text-slate-700">
              {data.performanceNotes}
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <div className="overflow-hidden rounded-3xl border border-emerald-100 bg-white shadow-lg">
            <div className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 p-5 text-white">
              <h2 className="text-xl font-bold">Fee Payment</h2>
              <p className="mt-2 text-sm text-white/90">
                Enter amount to pay school fees from this portal.
              </p>
            </div>
            <div className="p-5">
              <form
                className="mt-1 flex flex-col gap-3 sm:flex-row"
                onSubmit={handlePayFees}
              >
                <input
                  type="number"
                  min="1"
                  value={payAmount}
                  onChange={(event) => setPayAmount(event.target.value)}
                  placeholder="Enter amount"
                  className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-2.5 outline-none transition focus:border-emerald-500 focus:bg-white"
                />
                <button
                  type="submit"
                  className="rounded-xl bg-gradient-to-r from-emerald-500 to-blue-500 px-5 py-2.5 font-semibold text-white transition hover:shadow-lg"
                >
                  Pay Fees
                </button>
              </form>

              {message && (
                <p className="mt-3 rounded-xl bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
                  {message}
                </p>
              )}
            </div>
          </div>

          <div className="rounded-3xl border border-purple-100 bg-gradient-to-br from-white via-purple-50/50 to-fuchsia-50 p-5 shadow-lg">
            <h2 className="text-xl font-bold text-slate-900">Photos</h2>
            <p className="mt-1 text-sm text-slate-600">
              Classroom moments and recent activity snapshots.
            </p>
            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {data.photos.map((photo) => (
                <img
                  key={photo}
                  src={photo}
                  alt="School activity"
                  className="h-28 w-full rounded-xl object-cover ring-2 ring-white"
                  loading="lazy"
                />
              ))}
            </div>
          </div>

          <div className="lg:col-span-2 overflow-hidden rounded-3xl border border-white/20">
            <img
              src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1600&q=60"
              alt="School celebration"
              className="h-40 w-full object-cover sm:h-52"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
  subtitle,
  tone,
}: {
  title: string;
  value: string;
  subtitle: string;
  tone: string;
}) {
  return (
    <div
      className={`rounded-2xl border bg-gradient-to-br p-4 shadow-md ${tone}`}
    >
      <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
        {title}
      </p>
      <p className="mt-2 text-2xl font-bold text-slate-900">{value}</p>
      <p className="mt-1 text-sm text-slate-700">{subtitle}</p>
    </div>
  );
}

function Panel({
  title,
  items,
  tone,
}: {
  title: string;
  items: string[];
  tone: string;
}) {
  return (
    <div
      className={`rounded-3xl border bg-gradient-to-br p-5 shadow-lg ${tone}`}
    >
      <h2 className="text-xl font-bold text-slate-900">{title}</h2>
      <ul className="mt-4 space-y-2 text-slate-700">
        {items.map((item) => (
          <li key={item} className="rounded-xl bg-white/80 px-3 py-2">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
