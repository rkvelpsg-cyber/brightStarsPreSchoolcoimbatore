import { FormEvent, ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import {
  clearDashboardAuth,
  getDashboardAuth,
  getDashboardData,
  updateDashboardData,
  DashboardData,
} from "../dashboard/store";

type AdminFormState = {
  studentName: string;
  className: string;
  attendancePresent: string;
  attendanceTotal: string;
  dailyActivities: string;
  upcomingFestivals: string;
  upcomingEvents: string;
  feesTotal: string;
  feesPaid: string;
  nextDueDate: string;
  performanceNotes: string;
  photos: string;
};

function toFormState(data: DashboardData): AdminFormState {
  return {
    studentName: data.studentName,
    className: data.className,
    attendancePresent: String(data.attendancePresent),
    attendanceTotal: String(data.attendanceTotal),
    dailyActivities: data.dailyActivities.join("\n"),
    upcomingFestivals: data.upcomingFestivals.join("\n"),
    upcomingEvents: data.upcomingEvents.join("\n"),
    feesTotal: String(data.feesTotal),
    feesPaid: String(data.feesPaid),
    nextDueDate: data.nextDueDate,
    performanceNotes: data.performanceNotes,
    photos: data.photos.join("\n"),
  };
}

function splitLines(value: string) {
  return value
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
}

export function AdminDashboard() {
  const navigate = useNavigate();
  const [form, setForm] = useState<AdminFormState>(() =>
    toFormState(getDashboardData()),
  );
  const [notice, setNotice] = useState("");

  useEffect(() => {
    const auth = getDashboardAuth();
    if (!auth || auth.role !== "admin") {
      navigate("/login");
      return;
    }
    setForm(toFormState(getDashboardData()));
  }, [navigate]);

  const updateField = (field: keyof AdminFormState, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSave = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const updated = updateDashboardData({
      studentName: form.studentName.trim() || "Kid Student",
      className: form.className.trim() || "Nursery A",
      attendancePresent: Number(form.attendancePresent) || 0,
      attendanceTotal: Number(form.attendanceTotal) || 0,
      dailyActivities: splitLines(form.dailyActivities),
      upcomingFestivals: splitLines(form.upcomingFestivals),
      upcomingEvents: splitLines(form.upcomingEvents),
      feesTotal: Number(form.feesTotal) || 0,
      feesPaid: Number(form.feesPaid) || 0,
      nextDueDate: form.nextDueDate,
      performanceNotes: form.performanceNotes.trim(),
      photos: splitLines(form.photos),
    });

    setForm(toFormState(updated));
    setNotice("Dashboard data published successfully for parents.");
  };

  const logout = () => {
    clearDashboardAuth();
    navigate("/login");
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 px-4 py-8">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-0 top-16 h-72 w-72 rounded-full bg-violet-500/30 blur-3xl" />
        <div className="absolute right-0 top-36 h-80 w-80 rounded-full bg-sky-500/20 blur-3xl" />
        <div className="absolute bottom-0 left-0 right-0 h-2/3 bg-gradient-to-t from-slate-950 via-slate-900/90 to-transparent" />
      </div>

      <div className="relative mx-auto w-full max-w-6xl">
        <div className="mb-6 overflow-hidden rounded-[2rem] border border-white/15 bg-white/95 shadow-2xl backdrop-blur">
          <div className="grid gap-0 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="bg-gradient-to-br from-violet-600 via-indigo-700 to-blue-700 p-6 text-white sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/80">
                School Admin Dashboard
              </p>
              <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
                Manage Student Information
              </h1>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/85 sm:text-base">
                Update attendance, fees, activities, festivals, events,
                performance and photos for parent access.
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
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
                src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=1400&q=60"
                alt="School administration"
                className="h-full w-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/65 via-transparent to-transparent" />
            </div>
          </div>
        </div>

        <form onSubmit={handleSave} className="grid gap-6">
          <div className="grid gap-4 sm:grid-cols-3">
            <SummaryCard
              title="Attendance"
              value={`${form.attendancePresent}/${form.attendanceTotal}`}
              tone="from-cyan-100 to-blue-100 border-cyan-200"
            />
            <SummaryCard
              title="Fees"
              value={`₹${(Number(form.feesPaid) || 0).toLocaleString()} / ₹${(Number(form.feesTotal) || 0).toLocaleString()}`}
              tone="from-emerald-100 to-teal-100 border-emerald-200"
            />
            <SummaryCard
              title="Student"
              value={form.studentName || "Kid Student"}
              tone="from-violet-100 to-fuchsia-100 border-violet-200"
            />
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <Section
              title="Student Profile"
              tone="from-white to-cyan-50 border-cyan-100"
            >
              <InputField
                label="Student Name"
                value={form.studentName}
                onChange={(value) => updateField("studentName", value)}
              />
              <InputField
                label="Class"
                value={form.className}
                onChange={(value) => updateField("className", value)}
              />
            </Section>

            <Section
              title="Attendance"
              tone="from-white to-amber-50 border-amber-100"
            >
              <InputField
                label="Present Days"
                type="number"
                value={form.attendancePresent}
                onChange={(value) => updateField("attendancePresent", value)}
              />
              <InputField
                label="Total Working Days"
                type="number"
                value={form.attendanceTotal}
                onChange={(value) => updateField("attendanceTotal", value)}
              />
            </Section>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <Section
              title="School Activities and Events"
              tone="from-white to-sky-50 border-sky-100"
            >
              <TextAreaField
                label="Daily Activities (one per line)"
                value={form.dailyActivities}
                onChange={(value) => updateField("dailyActivities", value)}
              />
              <TextAreaField
                label="Upcoming Festivals (one per line)"
                value={form.upcomingFestivals}
                onChange={(value) => updateField("upcomingFestivals", value)}
              />
              <TextAreaField
                label="Upcoming Events (one per line)"
                value={form.upcomingEvents}
                onChange={(value) => updateField("upcomingEvents", value)}
              />
            </Section>

            <Section
              title="Fees and Performance"
              tone="from-white to-rose-50 border-rose-100"
            >
              <InputField
                label="Total Fees"
                type="number"
                value={form.feesTotal}
                onChange={(value) => updateField("feesTotal", value)}
              />
              <InputField
                label="Fees Paid"
                type="number"
                value={form.feesPaid}
                onChange={(value) => updateField("feesPaid", value)}
              />
              <InputField
                label="Next Due Date"
                type="date"
                value={form.nextDueDate}
                onChange={(value) => updateField("nextDueDate", value)}
              />
              <TextAreaField
                label="Performance Notes"
                value={form.performanceNotes}
                onChange={(value) => updateField("performanceNotes", value)}
              />
            </Section>
          </div>

          <Section
            title="Photos"
            tone="from-white to-violet-50 border-violet-100"
          >
            <TextAreaField
              label="Photo URLs (one per line)"
              value={form.photos}
              onChange={(value) => updateField("photos", value)}
            />

            <div className="mt-2 overflow-hidden rounded-2xl border border-white/70">
              <img
                src="https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=1600&q=60"
                alt="School photo preview"
                className="h-40 w-full object-cover"
                loading="lazy"
              />
            </div>
          </Section>

          {notice && (
            <p className="rounded-xl bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-700">
              {notice}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="submit"
              className="rounded-xl bg-gradient-to-r from-violet-500 via-indigo-500 to-blue-500 px-6 py-3 font-semibold text-white shadow-lg shadow-indigo-300/40 transition hover:brightness-110"
            >
              Publish Dashboard Data
            </button>
            <button
              type="button"
              onClick={() => navigate("/dashboard/parent")}
              className="rounded-xl border border-sky-200 bg-white px-6 py-3 font-semibold text-sky-700 transition hover:bg-sky-50"
            >
              Preview Parent View
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Section({
  title,
  children,
  tone,
}: {
  title: string;
  children: ReactNode;
  tone: string;
}) {
  return (
    <div
      className={`rounded-3xl border bg-gradient-to-br p-5 shadow-lg ${tone}`}
    >
      <h2 className="mb-4 text-xl font-bold text-slate-900">{title}</h2>
      <div className="grid gap-4">{children}</div>
    </div>
  );
}

function SummaryCard({
  title,
  value,
  tone,
}: {
  title: string;
  value: string;
  tone: string;
}) {
  return (
    <div className={`rounded-2xl border bg-gradient-to-br p-4 shadow ${tone}`}>
      <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
        {title}
      </p>
      <p className="mt-2 text-lg font-bold text-slate-900">{value}</p>
    </div>
  );
}

function InputField({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-gray-700">
        {label}
      </span>
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-xl border border-slate-300 bg-white/90 px-4 py-2.5 outline-none transition focus:border-violet-500"
      />
    </label>
  );
}

function TextAreaField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-gray-700">
        {label}
      </span>
      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="min-h-28 w-full rounded-xl border border-slate-300 bg-white/90 px-4 py-2.5 outline-none transition focus:border-violet-500"
      />
    </label>
  );
}
