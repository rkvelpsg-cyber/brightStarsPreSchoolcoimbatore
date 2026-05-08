import { FormEvent, useState } from "react";
import { useNavigate } from "react-router";
import { DashboardRole, setDashboardAuth } from "../dashboard/store";

const credentials: Record<
  DashboardRole,
  { username: string; password: string; label: string }
> = {
  parent: {
    username: "parent@birla",
    password: "parent123",
    label: "Parent Login",
  },
  admin: {
    username: "admin@birla",
    password: "admin123",
    label: "School Admin Login",
  },
};

export function Login() {
  const navigate = useNavigate();
  const [role, setRole] = useState<DashboardRole>("parent");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const selected = credentials[role];

    if (
      username.trim() !== selected.username ||
      password !== selected.password
    ) {
      setError("Invalid credentials. Use the demo credentials shown below.");
      return;
    }

    setDashboardAuth({
      role,
      name: role === "parent" ? "Parent User" : "School Admin",
      loginAt: new Date().toISOString(),
    });

    navigate(role === "parent" ? "/dashboard/parent" : "/dashboard/admin");
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 px-4 py-10 sm:py-14">
      <div className="absolute inset-0">
        <video
          className="h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        >
          <source src="/videos/school-background.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-slate-950/70" />
      </div>

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-28 top-20 h-72 w-72 rounded-full bg-cyan-500/30 blur-3xl" />
        <div className="absolute -right-24 top-36 h-72 w-72 rounded-full bg-fuchsia-500/25 blur-3xl" />
        <div className="absolute bottom-0 left-0 right-0 h-2/3 bg-gradient-to-t from-slate-950 via-slate-900/90 to-transparent" />
        <div className="absolute inset-0 opacity-15 [background-image:radial-gradient(#ffffff_1px,transparent_1px)] [background-size:18px_18px]" />
      </div>

      <div className="relative mx-auto w-full max-w-6xl">
        <div className="rounded-[2rem] border border-white/20 bg-white/95 p-4 shadow-2xl backdrop-blur sm:p-8">
          <div className="grid items-stretch gap-6 lg:grid-cols-[1.05fr_0.95fr]">
            <section className="rounded-3xl bg-gradient-to-br from-sky-50 via-white to-cyan-50 p-5 sm:p-7">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-sky-100 pb-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-orange-100 bg-white shadow-md">
                    <img
                      src="/birla_logo_vector.svg"
                      alt="Birla Open Minds Preschool And Day Care logo"
                      className="h-12 w-auto object-contain"
                    />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sky-700">
                      Birla Open Minds
                    </p>
                    <h1 className="mt-1 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
                      School Dashboard Login
                    </h1>
                  </div>
                </div>

                <button
                  onClick={() => navigate("/")}
                  className="rounded-full border border-sky-200 bg-white px-5 py-2 text-sm font-semibold text-sky-700 transition hover:bg-sky-50"
                >
                  Back to Home
                </button>
              </div>

              <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
                Secure access for parents and school administrators to track and
                manage attendance, activities, events, performance, photos and
                fee payments.
              </p>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {(Object.keys(credentials) as DashboardRole[]).map((option) => {
                  const active = role === option;
                  return (
                    <button
                      key={option}
                      type="button"
                      onClick={() => {
                        setRole(option);
                        setError("");
                      }}
                      className={`rounded-2xl border px-4 py-3 text-left transition ${
                        active
                          ? "border-sky-500 bg-sky-50 text-sky-700 shadow"
                          : "border-slate-200 bg-white text-slate-700 hover:border-sky-300"
                      }`}
                    >
                      <p className="text-sm font-medium uppercase tracking-wide text-slate-500">
                        Role
                      </p>
                      <p className="mt-0.5 text-base font-bold">
                        {credentials[option].label}
                      </p>
                    </button>
                  );
                })}
              </div>

              <div className="mt-5 rounded-2xl border border-sky-100 bg-white p-4 text-sm text-slate-700">
                <p className="font-bold text-slate-900">Demo Credentials</p>
                <p className="mt-1">Parent: parent@birla / parent123</p>
                <p>Admin: admin@birla / admin123</p>
              </div>

              <div className="mt-5 overflow-hidden rounded-2xl border border-white/80">
                <img
                  src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1400&q=60"
                  alt="Classroom learning"
                  className="h-36 w-full object-cover sm:h-44"
                  loading="lazy"
                />
              </div>
            </section>

            <form
              onSubmit={handleSubmit}
              className="rounded-3xl border border-slate-200 bg-white p-5 shadow-lg sm:p-7"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-emerald-700">
                Secure Sign In
              </p>
              <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-900">
                {credentials[role].label}
              </h2>
              <p className="mt-1 text-sm text-slate-600">
                Sign in to continue to the dashboard.
              </p>

              <div className="mt-6 space-y-4">
                <div>
                  <label
                    className="mb-2 block text-sm font-semibold text-slate-700"
                    htmlFor="username"
                  >
                    Username
                  </label>
                  <input
                    id="username"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                    className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-2.5 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-sky-500 focus:bg-white"
                    placeholder="Enter username"
                    required
                  />
                </div>

                <div>
                  <label
                    className="mb-2 block text-sm font-semibold text-slate-700"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-2.5 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-sky-500 focus:bg-white"
                    placeholder="Enter password"
                    required
                  />
                </div>
              </div>

              {error && (
                <p className="mt-4 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">
                  {error}
                </p>
              )}

              <button
                type="submit"
                className="mt-6 w-full rounded-xl bg-gradient-to-r from-sky-600 via-blue-600 to-emerald-500 px-4 py-3 font-semibold text-white shadow-lg shadow-sky-300/40 transition hover:brightness-110"
              >
                Login to Dashboard
              </button>

              <p className="mt-4 text-center text-xs text-slate-500">
                Protected school portal for parent and admin dashboards.
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
