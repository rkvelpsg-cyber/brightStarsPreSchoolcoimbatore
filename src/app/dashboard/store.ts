export type DashboardRole = "parent" | "admin";

export type DashboardAuth = {
  role: DashboardRole;
  name: string;
  loginAt: string;
};

export type DashboardData = {
  studentName: string;
  className: string;
  attendancePresent: number;
  attendanceTotal: number;
  dailyActivities: string[];
  upcomingFestivals: string[];
  upcomingEvents: string[];
  feesTotal: number;
  feesPaid: number;
  feesDue: number;
  nextDueDate: string;
  performanceNotes: string;
  photos: string[];
  updatedAt: string;
};

const DASHBOARD_DATA_KEY = "birla-dashboard-data";
const DASHBOARD_AUTH_KEY = "birla-dashboard-auth";

const defaultData: DashboardData = {
  studentName: "Kid Student",
  className: "Nursery A",
  attendancePresent: 18,
  attendanceTotal: 22,
  dailyActivities: [
    "Story time and phonics practice",
    "Color sorting activity",
    "Outdoor play and gross motor session",
  ],
  upcomingFestivals: ["School Annual Day", "Children's Day Celebration"],
  upcomingEvents: [
    "Parent-Teacher Meeting - 20 May",
    "Art Exhibition - 24 May",
  ],
  feesTotal: 45000,
  feesPaid: 30000,
  feesDue: 15000,
  nextDueDate: "2026-06-10",
  performanceNotes:
    "Shows good participation in class activities and social interaction. Reading skills are improving steadily.",
  photos: [
    "https://images.unsplash.com/photo-1516627145497-ae6968895b16?auto=format&fit=crop&w=900&q=60",
    "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=900&q=60",
    "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=900&q=60",
  ],
  updatedAt: new Date().toISOString(),
};

function canUseStorage() {
  return (
    typeof window !== "undefined" && typeof window.localStorage !== "undefined"
  );
}

export function getDashboardData(): DashboardData {
  if (!canUseStorage()) {
    return defaultData;
  }

  const raw = window.localStorage.getItem(DASHBOARD_DATA_KEY);
  if (!raw) {
    window.localStorage.setItem(
      DASHBOARD_DATA_KEY,
      JSON.stringify(defaultData),
    );
    return defaultData;
  }

  try {
    return JSON.parse(raw) as DashboardData;
  } catch {
    window.localStorage.setItem(
      DASHBOARD_DATA_KEY,
      JSON.stringify(defaultData),
    );
    return defaultData;
  }
}

export function saveDashboardData(data: DashboardData) {
  if (!canUseStorage()) {
    return;
  }
  window.localStorage.setItem(DASHBOARD_DATA_KEY, JSON.stringify(data));
}

export function updateDashboardData(update: Partial<DashboardData>) {
  const current = getDashboardData();
  const merged: DashboardData = {
    ...current,
    ...update,
    updatedAt: new Date().toISOString(),
  };
  merged.feesDue = Math.max(0, merged.feesTotal - merged.feesPaid);
  saveDashboardData(merged);
  return merged;
}

export function payFees(amount: number) {
  if (!Number.isFinite(amount) || amount <= 0) {
    return getDashboardData();
  }

  const current = getDashboardData();
  const nextPaid = Math.min(current.feesTotal, current.feesPaid + amount);
  return updateDashboardData({ feesPaid: nextPaid });
}

export function setDashboardAuth(auth: DashboardAuth) {
  if (!canUseStorage()) {
    return;
  }
  window.localStorage.setItem(DASHBOARD_AUTH_KEY, JSON.stringify(auth));
}

export function getDashboardAuth(): DashboardAuth | null {
  if (!canUseStorage()) {
    return null;
  }

  const raw = window.localStorage.getItem(DASHBOARD_AUTH_KEY);
  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw) as DashboardAuth;
  } catch {
    return null;
  }
}

export function clearDashboardAuth() {
  if (!canUseStorage()) {
    return;
  }
  window.localStorage.removeItem(DASHBOARD_AUTH_KEY);
}
