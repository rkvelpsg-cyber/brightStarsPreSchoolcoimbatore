"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router";
import { supabase } from "../lib/supabase";
import {
  ADMISSION_ENQUIRIES_STORAGE_KEY,
  deleteAdmissionEnquiry,
  getStoredAdmissionEnquiries,
  updateAdmissionEnquiry,
  type AdmissionFormValues,
  type AdmissionEnquirySubmission,
} from "../lib/admissionEnquiries";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Alert, AlertDescription } from "../components/ui/alert";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Badge } from "../components/ui/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import {
  School,
  Users,
  Activity,
  IndianRupee,
  Calendar,
  LogOut,
  Plus,
  Search,
  Phone,
  Mail,
  Clock,
  Upload,
  Image as ImageIcon,
  MapPin,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Pencil,
  Trash2,
  Video,
  FileText,
  Download,
  Eye,
  EyeOff,
} from "lucide-react";

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

export type UserRole = "admin" | "parent";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  studentIds?: string[];
}

export interface Student {
  id: string;
  name: string;
  age: number;
  fatherName: string;
  motherName: string;
  fatherPhone: string;
  motherPhone: string;
  parentName: string;
  parentEmail: string;
  parentPhone: string;
  parentUsername: string;
  parentPassword: string;
  address: string;
  registrationNumber: string;
  photoUrl: string;
  class: string;
  admissionDate: string;
}

export interface ActivityType {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  class: string;
  photos: string[];
  videos?: string[];
  targetStudentIds?: string[];
  postedBy: string;
}

export interface Fee {
  id: string;
  studentId: string;
  studentName: string;
  amount: number;
  dueDate: string;
  paidDate?: string;
  status: "paid" | "pending" | "overdue";
  term: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  photos: string[];
  videos?: string[];
  rsvpCount: number;
}

// ============================================================================
// MOCK DATA
// ============================================================================

const mockStudents: Student[] = [
  {
    id: "s1",
    name: "Aarav Sharma",
    age: 4,
    fatherName: "Rajesh Sharma",
    motherName: "Meera Sharma",
    fatherPhone: "9876543210",
    motherPhone: "9876501111",
    parentName: "Rajesh Sharma",
    parentEmail: "rajesh@example.com",
    parentPhone: "9876543210",
    parentUsername: "rajesh.sharma",
    parentPassword: "Parent@123",
    address: "No. 12, Lake View Road, Bengaluru",
    registrationNumber: "BOM-2026-001",
    photoUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Aarav",
    class: "Nursery (LY-2)",
    admissionDate: "2024-01-15",
  },
  {
    id: "s2",
    name: "Diya Patel",
    age: 3,
    fatherName: "Rakesh Patel",
    motherName: "Priya Patel",
    fatherPhone: "9876543211",
    motherPhone: "9876543212",
    parentName: "Priya Patel",
    parentEmail: "priya@example.com",
    parentPhone: "9876543212",
    parentUsername: "priya.patel",
    parentPassword: "Parent@123",
    address: "34, Green Park Street, Bengaluru",
    registrationNumber: "BOM-2026-002",
    photoUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Diya",
    class: "Playgroup (LY-1)",
    admissionDate: "2024-02-01",
  },
  {
    id: "s3",
    name: "Arjun Kumar",
    age: 5,
    fatherName: "Amit Kumar",
    motherName: "Sneha Kumar",
    fatherPhone: "9876543213",
    motherPhone: "9876543214",
    parentName: "Amit Kumar",
    parentEmail: "amit@example.com",
    parentPhone: "9876543213",
    parentUsername: "amit.kumar",
    parentPassword: "Parent@123",
    address: "8, MG Colony, Bengaluru",
    registrationNumber: "BOM-2026-003",
    photoUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Arjun",
    class: "Junior KG (K-1)",
    admissionDate: "2023-06-10",
  },
  {
    id: "s4",
    name: "Ananya Singh",
    age: 4,
    fatherName: "Rohit Singh",
    motherName: "Neha Singh",
    fatherPhone: "9876543215",
    motherPhone: "9876543216",
    parentName: "Neha Singh",
    parentEmail: "neha@example.com",
    parentPhone: "9876543216",
    parentUsername: "neha.singh",
    parentPassword: "Parent@123",
    address: "21, Teachers Colony, Bengaluru",
    registrationNumber: "BOM-2026-004",
    photoUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ananya",
    class: "Nursery (LY-2)",
    admissionDate: "2024-01-20",
  },
];

const STUDENTS_STORAGE_KEY = "birla-students-data";
const ACTIVITIES_STORAGE_KEY = "birla-activities-data";
const EVENTS_STORAGE_KEY = "birla-events-data";
const FEES_STORAGE_KEY = "birla-fees-data";
const ALL_STUDENTS_TARGET = "__all_students__";
const LOCAL_AUTH_USER_KEY = "birla-local-auth-user";
const STUDENTS_SYNC_TABLE = "student_credentials";
type OperationRange = "daily" | "weekly" | "monthly";

type StudentCredentialRow = {
  id: string;
  name: string;
  age: number;
  father_name: string | null;
  mother_name: string | null;
  father_phone: string | null;
  mother_phone: string | null;
  parent_name: string | null;
  parent_email: string | null;
  parent_auth_email: string | null;
  parent_phone: string | null;
  parent_username: string | null;
  parent_password?: string | null;
  address: string | null;
  registration_number: string | null;
  photo_url: string | null;
  class_name: string | null;
  admission_date: string | null;
};

function isWithinOperationRange(dateInput: string, range: OperationRange) {
  if (!dateInput) {
    return false;
  }

  const date = new Date(dateInput);
  if (Number.isNaN(date.getTime())) {
    return false;
  }

  const now = new Date();

  if (range === "daily") {
    return (
      date.getFullYear() === now.getFullYear() &&
      date.getMonth() === now.getMonth() &&
      date.getDate() === now.getDate()
    );
  }

  if (range === "weekly") {
    const windowStart = new Date(now);
    windowStart.setDate(now.getDate() - 6);
    windowStart.setHours(0, 0, 0, 0);

    const windowEnd = new Date(now);
    windowEnd.setHours(23, 59, 59, 999);

    return date >= windowStart && date <= windowEnd;
  }

  return (
    date.getFullYear() === now.getFullYear() &&
    date.getMonth() === now.getMonth()
  );
}

function getMediaTypeFromUrl(url: string): "image" | "video" | "document" {
  const normalized = url.trim().toLowerCase();

  if (normalized.startsWith("data:image/")) {
    return "image";
  }

  if (normalized.startsWith("data:video/")) {
    return "video";
  }

  if (/(\.png|\.jpe?g|\.gif|\.webp|\.bmp|\.svg)(\?|#|$)/i.test(normalized)) {
    return "image";
  }

  if (/(\.mp4|\.webm|\.mov|\.avi|\.mkv)(\?|#|$)/i.test(normalized)) {
    return "video";
  }

  return "document";
}

function buildDownloadName(title: string, index: number, extension: string) {
  const safeTitle = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 50);

  return `${safeTitle || "attachment"}-${index + 1}.${extension}`;
}

const STUDENT_CLASS_OPTIONS = [
  "Playgroup (LY-1)",
  "Nursery (LY-2)",
  "Junior KG (K-1)",
  "Senior KG (K-2)",
] as const;

function normalizeStudentClass(value?: string | null) {
  const raw = (value || "").trim();
  if (!raw) {
    return STUDENT_CLASS_OPTIONS[1];
  }

  if (
    STUDENT_CLASS_OPTIONS.includes(
      raw as (typeof STUDENT_CLASS_OPTIONS)[number],
    )
  ) {
    return raw;
  }

  const legacyMap: Record<string, (typeof STUDENT_CLASS_OPTIONS)[number]> = {
    "Pre-Nursery A": "Playgroup (LY-1)",
    "Pre-Nursery B": "Playgroup (LY-1)",
    "Nursery A": "Nursery (LY-2)",
    "Nursery B": "Nursery (LY-2)",
    Nursery: "Nursery (LY-2)",
    "KG-1": "Junior KG (K-1)",
    "KG-2": "Senior KG (K-2)",
  };

  return legacyMap[raw] || STUDENT_CLASS_OPTIONS[1];
}

function normalizePhoneDigits(value?: string | null) {
  return (value || "").replace(/\D/g, "").slice(0, 10);
}

function canUseLocalStorage() {
  return (
    typeof window !== "undefined" && typeof window.localStorage !== "undefined"
  );
}

function mapStudentRowToStudent(
  row: StudentCredentialRow,
  index: number,
): Student {
  const parentAuthEmail =
    row.parent_auth_email || row.parent_email || row.parent_username || "";

  return {
    id: row.id || `s${index + 1}`,
    name: row.name || "Student",
    age: Number(row.age) || 3,
    fatherName: row.father_name || "Father Name",
    motherName: row.mother_name || "Mother Name",
    fatherPhone: normalizePhoneDigits(row.father_phone),
    motherPhone: normalizePhoneDigits(row.mother_phone),
    parentName: row.parent_name || "Parent",
    parentEmail: parentAuthEmail,
    parentPhone: normalizePhoneDigits(row.parent_phone),
    parentUsername: row.parent_username || parentAuthEmail || "",
    parentPassword: row.parent_password || "",
    address: row.address || "",
    registrationNumber: row.registration_number || `BOM-LEGACY-${index + 1}`,
    photoUrl:
      row.photo_url ||
      `https://api.dicebear.com/7.x/avataaars/svg?seed=${row.name || "Student"}`,
    class: normalizeStudentClass(row.class_name),
    admissionDate: row.admission_date || new Date().toISOString().split("T")[0],
  };
}

function mapStudentToRow(student: Student): StudentCredentialRow {
  return {
    id: student.id,
    name: student.name,
    age: Number(student.age) || 3,
    father_name: student.fatherName,
    mother_name: student.motherName,
    father_phone: normalizePhoneDigits(student.fatherPhone),
    mother_phone: normalizePhoneDigits(student.motherPhone),
    parent_name: student.parentName,
    parent_email: student.parentEmail,
    parent_auth_email: student.parentEmail,
    parent_phone: normalizePhoneDigits(student.parentPhone),
    parent_username: student.parentUsername,
    address: student.address,
    registration_number: student.registrationNumber,
    photo_url: student.photoUrl,
    class_name: normalizeStudentClass(student.class),
    admission_date: student.admissionDate,
  };
}

async function fetchRemoteStudents(): Promise<Student[] | null> {
  const { data, error } = await supabase
    .from(STUDENTS_SYNC_TABLE)
    .select(
      "id,name,age,father_name,mother_name,father_phone,mother_phone,parent_name,parent_email,parent_auth_email,parent_phone,parent_username,address,registration_number,photo_url,class_name,admission_date",
    )
    .order("created_at", { ascending: true });

  if (error || !Array.isArray(data)) {
    return null;
  }

  return data.map((row, index) =>
    mapStudentRowToStudent(row as StudentCredentialRow, index),
  );
}

async function upsertRemoteStudents(students: Student[]): Promise<boolean> {
  const rows = students.map(mapStudentToRow);
  const { error } = await supabase
    .from(STUDENTS_SYNC_TABLE)
    .upsert(rows, { onConflict: "id" });
  return !error;
}

async function deleteRemoteStudent(studentId: string): Promise<boolean> {
  const { error } = await supabase
    .from(STUDENTS_SYNC_TABLE)
    .delete()
    .eq("id", studentId);
  return !error;
}

async function getStudentsForAuth(): Promise<Student[]> {
  const remoteStudents = await fetchRemoteStudents();
  if (remoteStudents && remoteStudents.length > 0) {
    saveStoredStudents(remoteStudents);
    return remoteStudents;
  }

  return getStoredStudents();
}

function getStoredStudents(): Student[] {
  if (!canUseLocalStorage()) {
    return mockStudents;
  }

  const raw = window.localStorage.getItem(STUDENTS_STORAGE_KEY);
  if (!raw) {
    window.localStorage.setItem(
      STUDENTS_STORAGE_KEY,
      JSON.stringify(mockStudents),
    );
    return mockStudents;
  }

  try {
    const parsed = JSON.parse(raw) as Partial<Student>[];
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed.map((student, index) => ({
        id: student.id || `s${index + 1}`,
        name: student.name || "Student",
        age: Number(student.age) || 3,
        fatherName: student.fatherName || student.parentName || "Father Name",
        motherName: student.motherName || "Mother Name",
        fatherPhone: normalizePhoneDigits(
          student.fatherPhone || student.parentPhone,
        ),
        motherPhone: normalizePhoneDigits(student.motherPhone),
        parentName: student.parentName || "Parent",
        parentEmail: student.parentEmail || "",
        parentPhone: normalizePhoneDigits(student.parentPhone),
        parentUsername: student.parentUsername || student.parentEmail || "",
        parentPassword: student.parentPassword || "",
        address: student.address || "",
        registrationNumber:
          student.registrationNumber || `BOM-LEGACY-${index + 1}`,
        photoUrl:
          student.photoUrl ||
          `https://api.dicebear.com/7.x/avataaars/svg?seed=${student.name || "Student"}`,
        class: normalizeStudentClass(student.class),
        admissionDate:
          student.admissionDate || new Date().toISOString().split("T")[0],
      }));
    }
  } catch {
    // Fall back to seeded data.
  }

  window.localStorage.setItem(
    STUDENTS_STORAGE_KEY,
    JSON.stringify(mockStudents),
  );
  return mockStudents;
}

function saveStoredStudents(students: Student[]) {
  if (!canUseLocalStorage()) {
    return;
  }
  window.localStorage.setItem(STUDENTS_STORAGE_KEY, JSON.stringify(students));
}

function getStoredActivities(): ActivityType[] {
  if (!canUseLocalStorage()) {
    return mockActivities;
  }

  const raw = window.localStorage.getItem(ACTIVITIES_STORAGE_KEY);
  if (!raw) {
    window.localStorage.setItem(
      ACTIVITIES_STORAGE_KEY,
      JSON.stringify(mockActivities),
    );
    return mockActivities;
  }

  try {
    const parsed = JSON.parse(raw) as Partial<ActivityType>[];
    if (Array.isArray(parsed)) {
      return parsed.map((activity, index) => ({
        id: activity.id || `a${index + 1}`,
        title: activity.title || "Daily Update",
        description: activity.description || "",
        date: activity.date || new Date().toISOString().split("T")[0],
        time: activity.time || "10:00 AM",
        class: activity.class || "All Students",
        photos: Array.isArray(activity.photos) ? activity.photos : [],
        videos: Array.isArray(activity.videos) ? activity.videos : [],
        targetStudentIds: Array.isArray(activity.targetStudentIds)
          ? activity.targetStudentIds
          : [ALL_STUDENTS_TARGET],
        postedBy: activity.postedBy || "Admin",
      }));
    }
  } catch {
    // Fall back to seeded activity data.
  }

  window.localStorage.setItem(
    ACTIVITIES_STORAGE_KEY,
    JSON.stringify(mockActivities),
  );
  return mockActivities;
}

function saveStoredActivities(activities: ActivityType[]) {
  if (!canUseLocalStorage()) {
    return true;
  }

  try {
    window.localStorage.setItem(
      ACTIVITIES_STORAGE_KEY,
      JSON.stringify(activities),
    );
    return true;
  } catch {
    return false;
  }
}

function getStoredEvents(): Event[] {
  if (!canUseLocalStorage()) {
    return mockEvents;
  }

  const raw = window.localStorage.getItem(EVENTS_STORAGE_KEY);
  if (!raw) {
    window.localStorage.setItem(EVENTS_STORAGE_KEY, JSON.stringify(mockEvents));
    return mockEvents;
  }

  try {
    const parsed = JSON.parse(raw) as Partial<Event>[];
    if (Array.isArray(parsed)) {
      return parsed.map((event, index) => ({
        id: event.id || `e${index + 1}`,
        title: event.title || "School Event",
        description: event.description || "",
        date: event.date || new Date().toISOString().split("T")[0],
        time: event.time || "10:00 AM",
        location: event.location || "School Campus",
        photos: Array.isArray(event.photos) ? event.photos : [],
        videos: Array.isArray(event.videos) ? event.videos : [],
        rsvpCount: Number(event.rsvpCount) || 0,
      }));
    }
  } catch {
    // Fall back to seeded event data.
  }

  window.localStorage.setItem(EVENTS_STORAGE_KEY, JSON.stringify(mockEvents));
  return mockEvents;
}

function saveStoredEvents(events: Event[]) {
  if (!canUseLocalStorage()) {
    return true;
  }

  try {
    window.localStorage.setItem(EVENTS_STORAGE_KEY, JSON.stringify(events));
    return true;
  } catch {
    return false;
  }
}

function createDefaultFeeForStudent(student: Student, index: number): Fee {
  return {
    id: `f-auto-${student.id}`,
    studentId: student.id,
    studentName: student.name,
    amount: 0,
    dueDate: new Date().toISOString().split("T")[0],
    status: "pending",
    term: `Q${(index % 4) + 1} ${new Date().getFullYear()}`,
  };
}

function syncFeesWithStudentsData(
  currentFees: Fee[],
  students: Student[],
): Fee[] {
  const byStudentId = new Map(currentFees.map((fee) => [fee.studentId, fee]));

  return students.map((student, index) => {
    const existing = byStudentId.get(student.id);
    if (existing) {
      return {
        ...existing,
        studentName: student.name,
      };
    }

    return createDefaultFeeForStudent(student, index);
  });
}

function getStoredFees(): Fee[] {
  const students = getStoredStudents();

  if (!canUseLocalStorage()) {
    return syncFeesWithStudentsData(mockFees, students);
  }

  const raw = window.localStorage.getItem(FEES_STORAGE_KEY);
  if (!raw) {
    const seeded = syncFeesWithStudentsData(mockFees, students);
    window.localStorage.setItem(FEES_STORAGE_KEY, JSON.stringify(seeded));
    return seeded;
  }

  try {
    const parsed = JSON.parse(raw) as Partial<Fee>[];
    const normalized = Array.isArray(parsed)
      ? parsed.map((fee, index) => {
          const status: Fee["status"] =
            fee.status === "paid" || fee.status === "overdue"
              ? fee.status
              : "pending";

          return {
            id: fee.id || `f${index + 1}`,
            studentId: fee.studentId || "",
            studentName: fee.studentName || "Student",
            amount: Number(fee.amount) || 0,
            dueDate: fee.dueDate || new Date().toISOString().split("T")[0],
            paidDate: fee.paidDate,
            status,
            term: fee.term || `Q1 ${new Date().getFullYear()}`,
          };
        })
      : [];

    const synced = syncFeesWithStudentsData(normalized, students);
    window.localStorage.setItem(FEES_STORAGE_KEY, JSON.stringify(synced));
    return synced;
  } catch {
    const seeded = syncFeesWithStudentsData(mockFees, students);
    window.localStorage.setItem(FEES_STORAGE_KEY, JSON.stringify(seeded));
    return seeded;
  }
}

function saveStoredFees(fees: Fee[]) {
  if (!canUseLocalStorage()) {
    return true;
  }

  try {
    window.localStorage.setItem(FEES_STORAGE_KEY, JSON.stringify(fees));
    return true;
  } catch {
    return false;
  }
}

function saveLocalAuthUser(user: User) {
  if (!canUseLocalStorage()) {
    return;
  }

  window.localStorage.setItem(LOCAL_AUTH_USER_KEY, JSON.stringify(user));
}

function getLocalAuthUser(): User | null {
  if (!canUseLocalStorage()) {
    return null;
  }

  const raw = window.localStorage.getItem(LOCAL_AUTH_USER_KEY);
  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw) as User;
  } catch {
    return null;
  }
}

function clearLocalAuthUser() {
  if (!canUseLocalStorage()) {
    return;
  }

  window.localStorage.removeItem(LOCAL_AUTH_USER_KEY);
}

function normalizeUsername(value: string) {
  return value.trim().toLowerCase();
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

function buildParentAuthEmail(username: string, parentEmail?: string | null) {
  const directEmail = (parentEmail || "").trim().toLowerCase();
  if (isValidEmail(directEmail)) {
    return directEmail;
  }

  const slug = normalizeUsername(username).replace(/[^a-z0-9._-]/g, "");
  return `${slug || "parent"}@parents.brightstarschool.local`;
}

function toLocalParentUser(student: Student): User {
  return {
    id: `parent-${student.id}`,
    name: student.fatherName || student.motherName || student.parentName,
    email: student.parentEmail || student.parentUsername,
    role: "parent",
    studentIds: [student.id],
  };
}

async function ensureParentAuthAccount(student: Student, password: string) {
  const { error } = await supabase.auth.signUp({
    email: student.parentEmail,
    password,
    options: {
      data: {
        role: "parent",
        name: student.parentName,
        student_ids: [student.id],
      },
    },
  });

  if (!error) {
    return "created" as const;
  }

  if (/already registered|already been registered/i.test(error.message)) {
    return "exists" as const;
  }

  return "error" as const;
}

const mockActivities: ActivityType[] = [
  {
    id: "a1",
    title: "Art & Craft Session",
    description:
      "Children created beautiful paintings using finger painting technique.",
    date: "2026-05-15",
    time: "10:00 AM",
    class: "Nursery A",
    photos: [
      "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=400",
      "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400",
    ],
    postedBy: "Ms. Kavita",
  },
  {
    id: "a2",
    title: "Story Time",
    description:
      'Interactive story session about "The Very Hungry Caterpillar".',
    date: "2026-05-14",
    time: "2:30 PM",
    class: STUDENT_CLASS_OPTIONS[1],
    photos: [
      "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=400",
    ],
    postedBy: "Ms. Priya",
  },
  {
    id: "a3",
    title: "Music & Movement",
    description:
      "Fun dance session with nursery rhymes and musical instruments.",
    date: "2026-05-13",
    time: "11:00 AM",
    class: "KG-1",
    photos: [
      "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=400",
      "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=400",
    ],
    postedBy: "Ms. Anjali",
  },
];

const mockFees: Fee[] = [
  {
    id: "f1",
    studentId: "s1",
    studentName: "Aarav Sharma",
    amount: 25000,
    dueDate: "2026-05-01",
    paidDate: "2026-04-28",
    status: "paid",
    term: "Q2 2026",
  },
  {
    id: "f2",
    studentId: "s2",
    studentName: "Diya Patel",
    amount: 25000,
    dueDate: "2026-05-01",
    status: "pending",
    term: "Q2 2026",
  },
  {
    id: "f3",
    studentId: "s3",
    studentName: "Arjun Kumar",
    amount: 25000,
    dueDate: "2026-04-01",
    status: "overdue",
    term: "Q1 2026",
  },
  {
    id: "f4",
    studentId: "s4",
    studentName: "Ananya Singh",
    amount: 25000,
    dueDate: "2026-05-01",
    paidDate: "2026-05-02",
    status: "paid",
    term: "Q2 2026",
  },
];

const mockEvents: Event[] = [
  {
    id: "e1",
    title: "Annual Day Celebration",
    description:
      "Join us for our grand Annual Day celebration with performances, games, and fun activities!",
    date: "2026-06-15",
    time: "4:00 PM",
    location: "School Auditorium",
    photos: [
      "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=400",
      "https://images.unsplash.com/photo-1464047736614-af63643285bf?w=400",
    ],
    rsvpCount: 45,
  },
  {
    id: "e2",
    title: "Summer Fest",
    description:
      "Beat the heat with our fun-filled summer activities and water play!",
    date: "2026-05-25",
    time: "10:00 AM",
    location: "School Playground",
    photos: [
      "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=400",
    ],
    rsvpCount: 38,
  },
  {
    id: "e3",
    title: "Parent-Teacher Meeting",
    description:
      "Monthly discussion about your child's progress and development.",
    date: "2026-05-20",
    time: "5:00 PM",
    location: "Respective Classrooms",
    photos: [],
    rsvpCount: 52,
  },
];

// ============================================================================
// AUTH CONTEXT
// ============================================================================

interface AuthContextType {
  user: User | null;
  login: (
    email: string,
    password: string,
    expectedRole?: UserRole,
  ) => Promise<"success" | "invalid_credentials" | "role_mismatch">;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type ProfileRow = {
  id: string;
  email: string | null;
  role: UserRole;
  full_name: string | null;
  student_ids: string[] | null;
};

const ADMIN_USERNAME = "adminbirlaopenminds";
const ADMIN_PASSWORD = "Admin@123";
const ADMIN_USERNAME_ALIASES = [
  "adminbirlaopenminds",
  "admin@birlaopenminds",
  "admin@birla",
];

async function getProfileForUser(userId: string, email?: string | null) {
  const { data: byId, error: byIdError } = await supabase
    .from("profiles")
    .select("id,email,role,full_name,student_ids")
    .eq("id", userId)
    .maybeSingle<ProfileRow>();

  if (!byIdError && byId) {
    return byId;
  }

  if (!email) {
    return null;
  }

  const { data: byEmail } = await supabase
    .from("profiles")
    .select("id,email,role,full_name,student_ids")
    .eq("email", email)
    .maybeSingle<ProfileRow>();

  return byEmail ?? null;
}

function mapSupabaseUser(
  authUser: {
    id: string;
    email?: string | null;
    user_metadata?: Record<string, unknown>;
  },
  profile?: ProfileRow | null,
): User | null {
  const metadataRole =
    authUser.user_metadata?.role === "admin" ||
    authUser.user_metadata?.role === "parent"
      ? (authUser.user_metadata.role as UserRole)
      : null;

  const role = profile?.role ?? metadataRole;
  if (!role) {
    return null;
  }

  const metadataName =
    typeof authUser.user_metadata?.name === "string"
      ? authUser.user_metadata.name
      : undefined;

  return {
    id: authUser.id,
    email: authUser.email ?? profile?.email ?? "",
    role,
    name: profile?.full_name || metadataName || authUser.email || "User",
    studentIds:
      role === "parent"
        ? (profile?.student_ids ??
          (Array.isArray(authUser.user_metadata?.student_ids)
            ? (authUser.user_metadata.student_ids as string[])
            : []))
        : undefined,
  };
}

function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let active = true;

    const syncSessionUser = async () => {
      const localUser = getLocalAuthUser();
      if (localUser) {
        setUser(localUser);
        setIsLoading(false);
        return;
      }

      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!active) {
        return;
      }

      if (!session?.user) {
        const persistedLocalUser = getLocalAuthUser();
        setUser(persistedLocalUser);
        setIsLoading(false);
        return;
      }

      const profile = await getProfileForUser(
        session.user.id,
        session.user.email,
      );

      if (!active) {
        return;
      }

      setUser(mapSupabaseUser(session.user, profile));

      setIsLoading(false);
    };

    void syncSessionUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (!active) {
        return;
      }

      if (!session?.user) {
        const persistedLocalUser = getLocalAuthUser();
        setUser(persistedLocalUser);
        return;
      }

      const profile = await getProfileForUser(
        session.user.id,
        session.user.email,
      );

      if (!active) {
        return;
      }

      setUser(mapSupabaseUser(session.user, profile));
    });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, []);

  const login = async (
    email: string,
    password: string,
    expectedRole?: UserRole,
  ): Promise<"success" | "invalid_credentials" | "role_mismatch"> => {
    const normalizedUsername = normalizeUsername(email);
    const normalizedPassword = password.trim();
    const isAdminUsername = ADMIN_USERNAME_ALIASES.includes(normalizedUsername);

    if (isAdminUsername && normalizedPassword === ADMIN_PASSWORD) {
      if (expectedRole && expectedRole !== "admin") {
        return "role_mismatch";
      }

      const localAdminUser: User = {
        id: "local-admin",
        name: "Admin",
        email: ADMIN_USERNAME,
        role: "admin",
      };

      setUser(localAdminUser);
      saveLocalAuthUser(localAdminUser);
      return "success";
    }

    const syncedStudents = await getStudentsForAuth();
    const matchedParent = syncedStudents.find(
      (student) =>
        normalizeUsername(student.parentUsername) === normalizedUsername,
    );

    if (matchedParent) {
      if (expectedRole && expectedRole !== "parent") {
        return "role_mismatch";
      }

      const authEmail = buildParentAuthEmail(
        matchedParent.parentUsername,
        matchedParent.parentEmail,
      );

      const { data: parentAuthData, error: parentAuthError } =
        await supabase.auth.signInWithPassword({
          email: authEmail,
          password,
        });

      if (!parentAuthError && parentAuthData.user) {
        const profile = await getProfileForUser(
          parentAuthData.user.id,
          parentAuthData.user.email,
        );
        const mappedParent = mapSupabaseUser(parentAuthData.user, profile);

        if (expectedRole && mappedParent?.role !== expectedRole) {
          await supabase.auth.signOut();
          setUser(null);
          return "role_mismatch";
        }

        setUser(mappedParent || toLocalParentUser(matchedParent));
        clearLocalAuthUser();
        return "success";
      }

      // Backward-compatibility path for legacy local records.
      if (matchedParent.parentPassword.trim() !== normalizedPassword) {
        return "invalid_credentials";
      }

      const localParentUser = toLocalParentUser(matchedParent);
      setUser(localParentUser);
      saveLocalAuthUser(localParentUser);
      return "success";
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error || !data.user) {
      return "invalid_credentials";
    }

    const profile = await getProfileForUser(data.user.id, data.user.email);
    const mapped = mapSupabaseUser(data.user, profile);
    if (!mapped) {
      await supabase.auth.signOut();
      return "invalid_credentials";
    }

    if (expectedRole && mapped.role !== expectedRole) {
      await supabase.auth.signOut();
      setUser(null);
      return "role_mismatch";
    }

    setUser(mapped);
    clearLocalAuthUser();
    return "success";
  };

  const logout = async () => {
    clearLocalAuthUser();
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: !!user,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

// ============================================================================
// LOGIN PAGE
// ============================================================================

function LoginPage({
  onLoginSuccess,
  defaultRole,
}: {
  onLoginSuccess: () => void;
  defaultRole: UserRole | null;
}) {
  const [selectedRole, setSelectedRole] = useState<UserRole>(
    defaultRole ?? "admin",
  );
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  useEffect(() => {
    if (defaultRole) {
      setSelectedRole(defaultRole);
    }
  }, [defaultRole]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await login(email.trim(), password.trim(), selectedRole);
      if (result === "success") {
        onLoginSuccess();
      } else if (result === "role_mismatch") {
        setError(
          `This account is not registered as ${selectedRole === "admin" ? "Admin" : "Parent"}.`,
        );
      } else {
        setError("Invalid username or password");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-cream-50 to-green-50 p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="space-y-4 text-center">
          <div className="mx-auto w-24 h-24 flex items-center justify-center">
            <img
              src="/birla_logo_vector.svg"
              alt="Birla Open Minds Logo"
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <CardTitle className="text-2xl">
              Birla Open Minds Preschool And Day Care
            </CardTitle>
            <CardDescription className="text-lg mt-2">
              Preschool Dashboard
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-5 grid grid-cols-2 gap-2 rounded-lg bg-muted p-1">
            <Button
              type="button"
              variant="default"
              className={`w-full text-white hover:text-white ${
                selectedRole === "admin"
                  ? "bg-purple-700 hover:bg-purple-800"
                  : "bg-transparent text-slate-700 shadow-none hover:bg-transparent hover:text-slate-700"
              }`}
              onClick={() => setSelectedRole("admin")}
              disabled={loading}
            >
              Admin Login
            </Button>
            <Button
              type="button"
              variant="default"
              className={`w-full text-white hover:text-white ${
                selectedRole === "parent"
                  ? "bg-purple-700 hover:bg-purple-800"
                  : "bg-transparent text-slate-700 shadow-none hover:bg-transparent hover:text-slate-700"
              }`}
              onClick={() => setSelectedRole("parent")}
              disabled={loading}
            >
              Parent Login
            </Button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="username">User Name</Label>
              <Input
                id="username"
                type="text"
                placeholder="Enter your user name"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={loading}
                  className="pr-10"
                />
                <button
                  type="button"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  onClick={() => setShowPassword((current) => !current)}
                  disabled={loading}
                  className="absolute inset-y-0 right-0 flex items-center px-3 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-purple-700 text-white hover:bg-purple-800 hover:text-white"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </Button>

            <div className="mt-6 p-4 bg-muted rounded-lg text-sm">
              <p className="font-medium">
                {selectedRole === "admin"
                  ? "Sign in with your admin account"
                  : "Sign in with your parent account"}
              </p>
              <p className="text-muted-foreground mt-1">
                Credentials are validated using Supabase Authentication and role
                access checks.
              </p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

// ============================================================================
// ADMIN DASHBOARD COMPONENTS
// ============================================================================

function DashboardOverview({
  activities,
  events,
}: {
  activities: ActivityType[];
  events: Event[];
}) {
  const students = getStoredStudents();
  const fees = getStoredFees();
  const totalStudents = students.length;
  const recentActivities = activities.slice(0, 3);

  // Filter activities to show only those from the current month
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  const activitiesThisMonth = activities.filter((a) => {
    const activityDate = new Date(a.date);
    return (
      activityDate.getMonth() === currentMonth &&
      activityDate.getFullYear() === currentYear
    );
  }).length;

  const pendingFees = fees.filter(
    (f) => f.status === "pending" || f.status === "overdue",
  ).length;
  const upcomingEvents = events.filter(
    (e) => new Date(e.date) >= new Date(),
  ).length;
  const totalRevenue = fees
    .filter((f) => f.status === "paid")
    .reduce((sum, f) => sum + f.amount, 0);

  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Students
            </CardTitle>
            <Users className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">
              {totalStudents}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Active enrollments
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Recent Activities
            </CardTitle>
            <Activity className="h-5 w-5 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-extrabold text-slate-900">
              {activitiesThisMonth}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Posted this month
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Fee Collection
            </CardTitle>
            <IndianRupee className="h-5 w-5 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-destructive">
              ₹{totalRevenue.toLocaleString("en-IN")}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {pendingFees} pending payments
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Upcoming Events
            </CardTitle>
            <Calendar className="h-5 w-5 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-yellow-600">
              {upcomingEvents}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Scheduled events
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-start gap-4 p-3 rounded-lg bg-muted/50"
              >
                <div className="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Activity className="w-8 h-8 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium truncate">{activity.title}</h4>
                  <p className="text-sm text-muted-foreground line-clamp-1">
                    {activity.description}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant="secondary">{activity.class}</Badge>
                    <span className="text-xs text-muted-foreground">
                      {activity.date}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Students</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {students.slice(0, 4).map((student) => (
              <div
                key={student.id}
                className="flex items-center gap-4 p-3 rounded-lg bg-muted/50"
              >
                <Avatar className="h-12 w-12">
                  <AvatarImage src={student.photoUrl} alt={student.name} />
                  <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium truncate">{student.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    {student.class} • Age {student.age}
                  </p>
                </div>
                <Badge variant="outline">
                  {student.fatherName || student.parentName}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function StudentsTab() {
  const [students, setStudents] = useState<Student[]>(() =>
    getStoredStudents(),
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingStudentId, setEditingStudentId] = useState<string | null>(null);
  const [studentFormError, setStudentFormError] = useState("");
  const [newStudent, setNewStudent] = useState<Partial<Student>>({
    name: "",
    age: 3,
    fatherName: "",
    motherName: "",
    fatherPhone: "",
    motherPhone: "",
    parentName: "",
    parentEmail: "",
    parentPhone: "",
    parentUsername: "",
    parentPassword: "",
    address: "",
    registrationNumber: "",
    class: "Pre-Nursery B",
    photoUrl: "",
    admissionDate: new Date().toISOString().split("T")[0],
  });

  useEffect(() => {
    const syncStudents = async () => {
      const localStudents = getStoredStudents();
      setStudents(localStudents);

      const remoteStudents = await fetchRemoteStudents();
      if (remoteStudents === null) {
        return;
      }

      if (remoteStudents.length > 0) {
        setStudents(remoteStudents);
        saveStoredStudents(remoteStudents);
        return;
      }

      if (localStudents.length > 0) {
        await upsertRemoteStudents(localStudents);
      }
    };

    void syncStudents();
  }, []);

  const resetForm = () => {
    setEditingStudentId(null);
    setStudentFormError("");
    setNewStudent({
      name: "",
      age: 3,
      fatherName: "",
      motherName: "",
      fatherPhone: "",
      motherPhone: "",
      parentName: "",
      parentEmail: "",
      parentPhone: "",
      parentUsername: "",
      parentPassword: "",
      address: "",
      registrationNumber: "",
      class: STUDENT_CLASS_OPTIONS[1],
      photoUrl: "",
      admissionDate: new Date().toISOString().split("T")[0],
    });
  };

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.fatherName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.motherName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.class.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.registrationNumber
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      student.parentUsername.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setNewStudent((prev) => ({
          ...prev,
          photoUrl: reader.result as string,
        }));
      }
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveStudentPhoto = () => {
    setNewStudent((prev) => ({
      ...prev,
      photoUrl: "",
    }));
  };

  const handleSaveStudent = async () => {
    const studentName = (newStudent.name || "").trim();
    const fatherName = (newStudent.fatherName || "").trim();
    const motherName = (newStudent.motherName || "").trim();
    if (!studentName || !fatherName || !motherName) {
      setStudentFormError(
        "Student Name, Father Name, and Mother Name are required.",
      );
      return;
    }

    const fatherPhone = normalizePhoneDigits(newStudent.fatherPhone);
    const motherPhone = normalizePhoneDigits(newStudent.motherPhone);
    if (fatherPhone.length !== 10 || motherPhone.length !== 10) {
      setStudentFormError(
        "Father and Mother phone numbers must be exactly 10 digits.",
      );
      return;
    }

    const baseUsername =
      normalizeUsername(newStudent.parentUsername || "") ||
      normalizeUsername(newStudent.parentEmail || "") ||
      normalizeUsername(fatherName.replace(/\s+/g, ""));

    const resolveUniqueUsername = (candidate: string) => {
      if (editingStudentId) {
        return candidate;
      }
      let next = candidate || "parentuser";
      let counter = 1;
      while (
        students.some(
          (student) => normalizeUsername(student.parentUsername) === next,
        )
      ) {
        counter += 1;
        next = `${candidate || "parentuser"}${counter}`;
      }
      return next;
    };

    const parentUsername = resolveUniqueUsername(baseUsername);
    const existingStudent = editingStudentId
      ? students.find((student) => student.id === editingStudentId)
      : null;

    const parentPassword =
      (newStudent.parentPassword || "").trim() ||
      existingStudent?.parentPassword ||
      "Parent@123";

    if (editingStudentId && (newStudent.parentPassword || "").trim()) {
      setStudentFormError(
        "For existing parent accounts, password changes must be done using Supabase password reset.",
      );
      return;
    }

    const parentAuthEmail = buildParentAuthEmail(
      parentUsername,
      newStudent.parentEmail,
    );
    const registrationNumber =
      (newStudent.registrationNumber || "").trim() ||
      `BOM-${new Date().getFullYear()}-${String(students.length + 1).padStart(3, "0")}`;

    setStudentFormError("");

    const sanitizedPhotoUrl = (newStudent.photoUrl || "").trim();

    const prepared: Student = {
      id:
        editingStudentId ??
        `s${Date.now().toString(36)}${Math.floor(Math.random() * 1000)}`,
      name: studentName,
      age: Number(newStudent.age) || 3,
      fatherName,
      motherName,
      fatherPhone,
      motherPhone,
      parentName: `${fatherName} / ${motherName}`,
      parentEmail: parentAuthEmail,
      parentPhone: fatherPhone,
      parentUsername,
      parentPassword: editingStudentId
        ? existingStudent?.parentPassword || ""
        : "",
      address: newStudent.address || "",
      registrationNumber,
      photoUrl:
        sanitizedPhotoUrl ||
        (editingStudentId
          ? ""
          : `https://api.dicebear.com/7.x/avataaars/svg?seed=${newStudent.name}`),
      class: normalizeStudentClass(newStudent.class),
      admissionDate:
        newStudent.admissionDate || new Date().toISOString().split("T")[0],
    };

    const updatedStudents = editingStudentId
      ? students.map((student) =>
          student.id === editingStudentId ? prepared : student,
        )
      : [...students, prepared];

    const parentAuthResult = await ensureParentAuthAccount(
      prepared,
      parentPassword,
    );
    if (parentAuthResult === "error") {
      setStudentFormError(
        "Unable to create parent login in Supabase Auth. Check the email/username and try again.",
      );
      return;
    }

    setStudents(updatedStudents);
    saveStoredStudents(updatedStudents);

    const synced = await upsertRemoteStudents(updatedStudents);
    if (!synced) {
      setStudentFormError(
        "Saved on this device, but cloud sync failed. Please verify Supabase table and network.",
      );
    }

    setDialogOpen(false);
    resetForm();
  };

  const handleEditStudent = (student: Student) => {
    setEditingStudentId(student.id);
    setNewStudent({ ...student });
    setDialogOpen(true);
  };

  const handleDeleteStudent = async (studentId: string) => {
    const confirmed = window.confirm(
      "Delete this student and parent credentials?",
    );
    if (!confirmed) {
      return;
    }

    const updatedStudents = students.filter(
      (student) => student.id !== studentId,
    );
    setStudents(updatedStudents);
    saveStoredStudents(updatedStudents);

    const deleted = await deleteRemoteStudent(studentId);
    if (!deleted) {
      setStudentFormError(
        "Removed on this device, but cloud delete failed. Please retry.",
      );
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Student Management</CardTitle>
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={resetForm}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Student
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>
                    {editingStudentId ? "Edit Student" : "Add New Student"}
                  </DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  {studentFormError && (
                    <Alert variant="destructive">
                      <AlertDescription>{studentFormError}</AlertDescription>
                    </Alert>
                  )}

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Student Name</Label>
                      <Input
                        id="name"
                        value={newStudent.name}
                        onChange={(e) =>
                          setNewStudent({ ...newStudent, name: e.target.value })
                        }
                        placeholder="Enter student name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="age">Age</Label>
                      <Input
                        id="age"
                        type="number"
                        min="2"
                        max="6"
                        step="0.1"
                        value={newStudent.age}
                        onChange={(e) =>
                          setNewStudent({
                            ...newStudent,
                            age:
                              e.target.value === ""
                                ? undefined
                                : parseFloat(e.target.value),
                          })
                        }
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="class">Class</Label>
                      <Select
                        value={newStudent.class}
                        onValueChange={(value) =>
                          setNewStudent({ ...newStudent, class: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {STUDENT_CLASS_OPTIONS.map((classOption) => (
                            <SelectItem key={classOption} value={classOption}>
                              {classOption}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="admissionDate">Admission Date</Label>
                      <Input
                        id="admissionDate"
                        type="date"
                        value={newStudent.admissionDate}
                        onChange={(e) =>
                          setNewStudent({
                            ...newStudent,
                            admissionDate: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="registrationNumber">
                        Registration No.
                      </Label>
                      <Input
                        id="registrationNumber"
                        value={newStudent.registrationNumber}
                        onChange={(e) =>
                          setNewStudent({
                            ...newStudent,
                            registrationNumber: e.target.value,
                          })
                        }
                        placeholder="e.g., BOM-2026-101"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="studentPhoto">Upload Student Photo</Label>
                      <Input
                        id="studentPhoto"
                        type="file"
                        accept="image/*"
                        className="file:mr-3 file:rounded-md file:border-0 file:bg-blue-600 file:px-3 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-blue-700"
                        onChange={handlePhotoUpload}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="photoUrl">
                      Student Photo URL (optional)
                    </Label>
                    <Input
                      id="photoUrl"
                      value={newStudent.photoUrl}
                      onChange={(e) =>
                        setNewStudent({
                          ...newStudent,
                          photoUrl: e.target.value,
                        })
                      }
                      placeholder="https://example.com/student-photo.jpg"
                    />
                    {newStudent.photoUrl && (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handleRemoveStudentPhoto}
                        className="w-full"
                      >
                        Remove Existing Photo
                      </Button>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="fatherName">Father Name</Label>
                      <Input
                        id="fatherName"
                        value={newStudent.fatherName}
                        onChange={(e) =>
                          setNewStudent({
                            ...newStudent,
                            fatherName: e.target.value,
                          })
                        }
                        placeholder="Enter father name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="motherName">Mother Name</Label>
                      <Input
                        id="motherName"
                        value={newStudent.motherName}
                        onChange={(e) =>
                          setNewStudent({
                            ...newStudent,
                            motherName: e.target.value,
                          })
                        }
                        placeholder="Enter mother name"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="parentEmail">Parent Email</Label>
                      <Input
                        id="parentEmail"
                        type="email"
                        value={newStudent.parentEmail}
                        onChange={(e) =>
                          setNewStudent({
                            ...newStudent,
                            parentEmail: e.target.value,
                          })
                        }
                        placeholder="parent@example.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="fatherPhone">Father Phone</Label>
                      <Input
                        id="fatherPhone"
                        inputMode="numeric"
                        maxLength={10}
                        value={newStudent.fatherPhone}
                        onChange={(e) =>
                          setNewStudent({
                            ...newStudent,
                            fatherPhone: normalizePhoneDigits(e.target.value),
                          })
                        }
                        placeholder="Enter 10-digit phone"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="motherPhone">Mother Phone</Label>
                      <Input
                        id="motherPhone"
                        inputMode="numeric"
                        maxLength={10}
                        value={newStudent.motherPhone}
                        onChange={(e) =>
                          setNewStudent({
                            ...newStudent,
                            motherPhone: normalizePhoneDigits(e.target.value),
                          })
                        }
                        placeholder="Enter 10-digit phone"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="parentUsername">Parent User Name</Label>
                      <Input
                        id="parentUsername"
                        value={newStudent.parentUsername}
                        onChange={(e) =>
                          setNewStudent({
                            ...newStudent,
                            parentUsername: e.target.value,
                          })
                        }
                        placeholder="Enter parent login username"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="parentPassword">Parent Password</Label>
                      <Input
                        id="parentPassword"
                        type="text"
                        value={newStudent.parentPassword}
                        onChange={(e) =>
                          setNewStudent({
                            ...newStudent,
                            parentPassword: e.target.value,
                          })
                        }
                        placeholder="Set parent password"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Textarea
                      id="address"
                      value={newStudent.address}
                      onChange={(e) =>
                        setNewStudent({
                          ...newStudent,
                          address: e.target.value,
                        })
                      }
                      placeholder="Enter full residential address"
                      rows={3}
                    />
                  </div>

                  <Button
                    onClick={() => void handleSaveStudent()}
                    className="w-full"
                  >
                    {editingStudentId ? "Save Changes" : "Add Student"}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search students by name, parent, or class..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="rounded-lg border">
            <Table className="table-fixed">
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[15%]">Student</TableHead>
                  <TableHead className="w-[11%]">Class</TableHead>
                  <TableHead className="w-[6%]">Age</TableHead>
                  <TableHead className="w-[15%]">Parents Details</TableHead>
                  <TableHead className="w-[8%]">Credentials</TableHead>
                  <TableHead className="w-[18%]">Address</TableHead>
                  <TableHead className="w-[10%]">Reg. No.</TableHead>
                  <TableHead className="w-[10%]">Admission Date</TableHead>
                  <TableHead className="w-[7%]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage
                            src={student.photoUrl}
                            alt={student.name}
                          />
                          <AvatarFallback>
                            {student.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{student.name}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">{student.class}</Badge>
                    </TableCell>
                    <TableCell>{student.age} years</TableCell>
                    <TableCell>
                      <div className="space-y-1 text-sm">
                        <p className="font-medium">
                          Father: {student.fatherName || "-"}
                        </p>
                        <p className="font-medium">
                          Mother: {student.motherName || "-"}
                        </p>
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Mail className="w-3 h-3" />
                          <span className="text-xs">{student.parentEmail}</span>
                        </div>
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Phone className="w-3 h-3" />
                          <span className="text-xs">
                            F: {student.fatherPhone || "-"} | M:{" "}
                            {student.motherPhone || "-"}
                          </span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1 text-xs">
                        <p className="font-medium">{student.parentUsername}</p>
                        <p className="text-muted-foreground">
                          Password secured in Supabase Auth
                        </p>
                      </div>
                    </TableCell>
                    <TableCell className="align-top">
                      <p className="max-w-44 text-xs text-muted-foreground">
                        <span className="block break-words whitespace-normal leading-5">
                          {student.address || "-"}
                        </span>
                      </p>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {student.registrationNumber}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Calendar className="w-3 h-3" />
                        {new Date(student.admissionDate).toLocaleDateString(
                          "en-IN",
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditStudent(student)}
                        >
                          <Pencil className="w-3.5 h-3.5" />
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => void handleDeleteStudent(student.id)}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function ActivitiesTab({
  onActivitiesChange,
}: {
  onActivitiesChange?: (activities: ActivityType[]) => void;
}) {
  const [activities, setActivities] = useState<ActivityType[]>(() =>
    getStoredActivities(),
  );
  const [students, setStudents] = useState<Student[]>(() =>
    getStoredStudents(),
  );
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingActivityId, setEditingActivityId] = useState<string | null>(
    null,
  );
  const [activityError, setActivityError] = useState("");
  const [activityNotice, setActivityNotice] = useState("");
  const [activityRange, setActivityRange] = useState<OperationRange>("weekly");
  const [isUploadingMedia, setIsUploadingMedia] = useState(false);
  const [targetStudentId, setTargetStudentId] =
    useState<string>(ALL_STUDENTS_TARGET);
  const [photoUrls, setPhotoUrls] = useState<string>("");
  const [videoUrls, setVideoUrls] = useState<string>("");
  const [newActivity, setNewActivity] = useState<Partial<ActivityType>>({
    title: "",
    description: "",
    date: new Date().toISOString().split("T")[0],
    time: "10:00 AM",
    class: "All Students",
    postedBy: "Admin",
  });

  useEffect(() => {
    setActivities(getStoredActivities());
    setStudents(getStoredStudents());
  }, []);

  useEffect(() => {
    onActivitiesChange?.(activities);
  }, [activities, onActivitiesChange]);

  const resetActivityForm = () => {
    setEditingActivityId(null);
    setActivityError("");
    setTargetStudentId(ALL_STUDENTS_TARGET);
    setPhotoUrls("");
    setVideoUrls("");
    setNewActivity({
      title: "",
      description: "",
      date: new Date().toISOString().split("T")[0],
      time: "10:00 AM",
      class: "All Students",
      postedBy: "Admin",
    });
  };

  const parseUrls = (value: string) =>
    value
      .split("\n")
      .map((item) => item.trim())
      .filter(Boolean);

  const removePhotoAt = (indexToRemove: number) => {
    const updated = parseUrls(photoUrls).filter(
      (_, index) => index !== indexToRemove,
    );
    setPhotoUrls(updated.join("\n"));
  };

  const removeVideoAt = (indexToRemove: number) => {
    const updated = parseUrls(videoUrls).filter(
      (_, index) => index !== indexToRemove,
    );
    setVideoUrls(updated.join("\n"));
  };

  const handleActivityMediaUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const files = Array.from(event.target.files || []);
    if (files.length === 0) {
      return;
    }

    setActivityError("");
    setIsUploadingMedia(true);

    const fileReaders = files.map(
      (file) =>
        new Promise<{ kind: "photo" | "video"; value: string } | null>(
          (resolve) => {
            const reader = new FileReader();
            reader.onload = () => {
              if (typeof reader.result !== "string") {
                resolve(null);
                return;
              }

              if (file.type.startsWith("image/")) {
                resolve({ kind: "photo", value: reader.result });
                return;
              }

              if (file.type.startsWith("video/")) {
                resolve({ kind: "video", value: reader.result });
                return;
              }

              resolve(null);
            };
            reader.onerror = () => resolve(null);
            reader.readAsDataURL(file);
          },
        ),
    );

    void Promise.all(fileReaders)
      .then((results) => {
        const nextPhotos = results
          .filter((item): item is { kind: "photo"; value: string } =>
            Boolean(item && item.kind === "photo"),
          )
          .map((item) => item.value);
        const nextVideos = results
          .filter((item): item is { kind: "video"; value: string } =>
            Boolean(item && item.kind === "video"),
          )
          .map((item) => item.value);

        if (nextPhotos.length > 0) {
          setPhotoUrls((prev) =>
            prev ? `${prev}\n${nextPhotos.join("\n")}` : nextPhotos.join("\n"),
          );
        }

        if (nextVideos.length > 0) {
          setVideoUrls((prev) =>
            prev ? `${prev}\n${nextVideos.join("\n")}` : nextVideos.join("\n"),
          );
        }
      })
      .finally(() => {
        setIsUploadingMedia(false);
        event.target.value = "";
      });
  };

  const handleEditActivity = (activity: ActivityType) => {
    setEditingActivityId(activity.id);
    setActivityError("");
    setNewActivity({ ...activity });
    setPhotoUrls((activity.photos || []).join("\n"));
    setVideoUrls((activity.videos || []).join("\n"));
    setTargetStudentId(activity.targetStudentIds?.[0] || ALL_STUDENTS_TARGET);
    setDialogOpen(true);
  };

  const handleDeleteActivity = (activityId: string) => {
    const confirmed = window.confirm("Delete this activity post?");
    if (!confirmed) {
      return;
    }

    const updated = activities.filter((activity) => activity.id !== activityId);
    setActivities(updated);
    saveStoredActivities(updated);
    onActivitiesChange?.(updated);
  };

  const handleAddActivity = () => {
    if (isUploadingMedia) {
      setActivityError(
        "Please wait until photo/video upload processing completes.",
      );
      return;
    }

    const title = (newActivity.title || "").trim() || "Daily Activity Update";
    const description = (newActivity.description || "").trim();
    const photos = parseUrls(photoUrls);
    const videos = parseUrls(videoUrls);

    if (!description && photos.length === 0 && videos.length === 0) {
      setActivityError("Add a daily message, a photo, or a video to publish.");
      return;
    }

    const targetClass = "All Students";

    const activity: ActivityType = {
      id:
        editingActivityId ??
        `a${Date.now().toString(36)}${Math.floor(Math.random() * 1000)}`,
      title,
      description,
      date: newActivity.date || new Date().toISOString().split("T")[0],
      time: newActivity.time || "10:00 AM",
      class: targetClass,
      photos,
      videos,
      targetStudentIds: [ALL_STUDENTS_TARGET],
      postedBy: "Admin",
    };

    const updated = editingActivityId
      ? activities.map((item) =>
          item.id === editingActivityId ? activity : item,
        )
      : [activity, ...activities];

    setActivities(updated);
    setDialogOpen(false);
    resetActivityForm();
    onActivitiesChange?.(updated);

    const persisted = saveStoredActivities(updated);
    if (!persisted) {
      setActivityNotice(
        "Activity saved in current view, but browser storage is full. Remove older media posts to persist all items.",
      );
      return;
    }

    setActivityNotice("Activity saved successfully.");
  };

  const filteredActivities = activities.filter((activity) =>
    isWithinOperationRange(activity.date, activityRange),
  );

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Daily Activities</CardTitle>
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={resetActivityForm}>
                  <Plus className="w-4 h-4 mr-2" />
                  Post Activity
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>
                    {editingActivityId ? "Edit Activity" : "Post New Activity"}
                  </DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  {activityError && (
                    <Alert variant="destructive">
                      <AlertDescription>{activityError}</AlertDescription>
                    </Alert>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="title">Activity Title</Label>
                    <Input
                      id="title"
                      value={newActivity.title}
                      onChange={(e) =>
                        setNewActivity({
                          ...newActivity,
                          title: e.target.value,
                        })
                      }
                      placeholder="e.g., Art & Craft Session"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={newActivity.description}
                      onChange={(e) =>
                        setNewActivity({
                          ...newActivity,
                          description: e.target.value,
                        })
                      }
                      placeholder="Describe the activity..."
                      rows={4}
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="targetStudent">Student Target</Label>
                      <Select
                        value={targetStudentId}
                        onValueChange={(value) => setTargetStudentId(value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select target" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value={ALL_STUDENTS_TARGET}>
                            All Students (Common Activity)
                          </SelectItem>
                          {students.map((student) => (
                            <SelectItem key={student.id} value={student.id}>
                              {student.name} ({student.class})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="date">Date</Label>
                      <Input
                        id="date"
                        type="date"
                        value={newActivity.date}
                        onChange={(e) =>
                          setNewActivity({
                            ...newActivity,
                            date: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="time">Time</Label>
                      <Input
                        id="time"
                        value={newActivity.time}
                        onChange={(e) =>
                          setNewActivity({
                            ...newActivity,
                            time: e.target.value,
                          })
                        }
                        placeholder="10:00 AM"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="activityMedia">Upload Photos/Videos</Label>
                    <Input
                      id="activityMedia"
                      type="file"
                      accept="image/*,video/*"
                      multiple
                      className="file:mr-3 file:rounded-md file:border-0 file:bg-blue-600 file:px-3 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-blue-700"
                      onChange={handleActivityMediaUpload}
                    />
                  </div>

                  {parseUrls(photoUrls).length > 0 && (
                    <div className="space-y-2 rounded-lg border p-3">
                      <p className="text-sm font-semibold text-slate-700">
                        Attached Photos ({parseUrls(photoUrls).length})
                      </p>
                      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                        {parseUrls(photoUrls).map((photo, index) => (
                          <div
                            key={`draft-photo-${index}`}
                            className="relative overflow-hidden rounded-lg border bg-muted"
                          >
                            <img
                              src={photo}
                              alt={`Draft photo ${index + 1}`}
                              className="h-24 w-full object-cover"
                            />
                            <Button
                              type="button"
                              size="sm"
                              variant="destructive"
                              className="absolute right-1 top-1 h-7 px-2"
                              onClick={() => removePhotoAt(index)}
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {parseUrls(videoUrls).length > 0 && (
                    <div className="space-y-2 rounded-lg border p-3">
                      <p className="text-sm font-semibold text-slate-700">
                        Attached Videos ({parseUrls(videoUrls).length})
                      </p>
                      <div className="grid grid-cols-1 gap-2">
                        {parseUrls(videoUrls).map((video, index) => (
                          <div
                            key={`draft-video-${index}`}
                            className="flex items-center justify-between rounded-lg border bg-muted/40 px-3 py-2"
                          >
                            <div className="flex items-center gap-2 overflow-hidden">
                              <Video className="h-4 w-4 flex-shrink-0 text-slate-600" />
                              <span className="truncate text-sm text-slate-700">
                                Video {index + 1}
                              </span>
                            </div>
                            <Button
                              type="button"
                              size="sm"
                              variant="destructive"
                              onClick={() => removeVideoAt(index)}
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <Button
                    onClick={handleAddActivity}
                    className="w-full"
                    disabled={isUploadingMedia}
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    {isUploadingMedia
                      ? "Processing files..."
                      : editingActivityId
                        ? "Save Activity"
                        : "Post Activity"}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
          <OperationRangeControl
            value={activityRange}
            onChange={setActivityRange}
          />
        </CardHeader>
        <CardContent>
          {activityNotice && (
            <Alert className="mb-4">
              <AlertDescription>{activityNotice}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-4">
            {filteredActivities.map((activity) => (
              <Card key={activity.id} className="overflow-hidden">
                <CardHeader className="bg-muted/50">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">
                        {activity.title}
                      </CardTitle>
                      <div className="flex items-center gap-3 mt-2 text-sm text-muted-foreground">
                        <Badge variant="secondary">{activity.class}</Badge>
                        <Badge variant="outline">
                          {(activity.targetStudentIds || [
                            ALL_STUDENTS_TARGET,
                          ])[0] === ALL_STUDENTS_TARGET
                            ? "All Students"
                            : "Single Student"}
                        </Badge>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>
                            {activity.date} • {activity.time}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-sm text-muted-foreground">
                        Posted by {activity.postedBy}
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditActivity(activity)}
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDeleteActivity(activity.id)}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-4">
                  <p className="text-sm text-muted-foreground mb-4">
                    {activity.description}
                  </p>
                  {activity.photos.length > 0 && (
                    <div className="grid grid-cols-3 gap-2">
                      {activity.photos.map((photo, idx) => (
                        <div
                          key={idx}
                          className="relative aspect-square rounded-lg overflow-hidden bg-muted group"
                        >
                          <img
                            src={photo}
                            alt={`${activity.title} photo ${idx + 1}`}
                            className="w-full h-full object-cover transition-transform group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <ImageIcon className="w-8 h-8 text-white" />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {activity.videos && activity.videos.length > 0 && (
                    <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
                      {activity.videos.map((video, idx) => (
                        <video
                          key={`${activity.id}-video-${idx}`}
                          controls
                          className="w-full rounded-lg border"
                          src={video}
                        >
                          Your browser does not support video playback.
                        </video>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function FeesTab() {
  const [fees, setFees] = useState<Fee[]>(() => getStoredFees());
  const [feesRange, setFeesRange] = useState<OperationRange>("weekly");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<
    "all" | "paid" | "pending" | "overdue"
  >("all");
  const [editingFeeId, setEditingFeeId] = useState<string | null>(null);
  const [feeDraft, setFeeDraft] = useState<{
    amount: string;
    dueDate: string;
    status: Fee["status"];
    paidDate: string;
  }>({
    amount: "0",
    dueDate: new Date().toISOString().split("T")[0],
    status: "pending",
    paidDate: "",
  });

  const studentsSnapshot = JSON.stringify(
    getStoredStudents().map((student) => ({
      id: student.id,
      name: student.name,
    })),
  );

  const studentsById = new Map(
    getStoredStudents().map((student) => [student.id, student.name]),
  );

  useEffect(() => {
    const syncFeesWithStudents = () => {
      setFees(getStoredFees());
    };

    const handleStorage = (event: StorageEvent) => {
      if (
        !event.key ||
        event.key === STUDENTS_STORAGE_KEY ||
        event.key === FEES_STORAGE_KEY
      ) {
        syncFeesWithStudents();
      }
    };

    syncFeesWithStudents();
    window.addEventListener("storage", handleStorage);
    window.addEventListener("focus", syncFeesWithStudents);

    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener("focus", syncFeesWithStudents);
    };
  }, []);

  useEffect(() => {
    setFees(getStoredFees());
  }, [studentsSnapshot]);

  const getFeeStudentName = (fee: Fee) =>
    studentsById.get(fee.studentId) || fee.studentName;

  const feesInRange = fees.filter((fee) => {
    const referenceDate =
      fee.status === "paid" ? fee.paidDate || fee.dueDate : fee.dueDate;
    return isWithinOperationRange(referenceDate, feesRange);
  });

  const filteredFees = feesInRange.filter((fee) => {
    const matchesSearch =
      getFeeStudentName(fee).toLowerCase().includes(searchTerm.toLowerCase()) ||
      fee.term.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "all" || fee.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const totalFees = feesInRange.reduce((sum, fee) => sum + fee.amount, 0);
  const paidFees = feesInRange
    .filter((f) => f.status === "paid")
    .reduce((sum, fee) => sum + fee.amount, 0);
  const pendingFees = feesInRange
    .filter((f) => f.status === "pending")
    .reduce((sum, fee) => sum + fee.amount, 0);
  const overdueFees = feesInRange
    .filter((f) => f.status === "overdue")
    .reduce((sum, fee) => sum + fee.amount, 0);

  const handleMarkAsPaid = (feeId: string) => {
    const updated = fees.map((fee) =>
      fee.id === feeId
        ? {
            ...fee,
            status: "paid" as const,
            paidDate: new Date().toISOString().split("T")[0],
          }
        : fee,
    );
    setFees(updated);
    saveStoredFees(updated);
  };

  const startEditingFee = (fee: Fee) => {
    setEditingFeeId(fee.id);
    setFeeDraft({
      amount: String(fee.amount),
      dueDate: fee.dueDate,
      status: fee.status,
      paidDate: fee.paidDate || "",
    });
  };

  const cancelEditingFee = () => {
    setEditingFeeId(null);
  };

  const saveFeeDetails = (feeId: string) => {
    const amount = Number(feeDraft.amount);
    if (!Number.isFinite(amount) || amount < 0) {
      return;
    }

    const updated = fees.map((fee) => {
      if (fee.id !== feeId) {
        return fee;
      }

      const nextStatus = feeDraft.status;
      const nextPaidDate =
        nextStatus === "paid"
          ? feeDraft.paidDate || new Date().toISOString().split("T")[0]
          : undefined;

      return {
        ...fee,
        amount,
        dueDate: feeDraft.dueDate || new Date().toISOString().split("T")[0],
        status: nextStatus,
        paidDate: nextPaidDate,
      };
    });

    setFees(updated);
    saveStoredFees(updated);
    setEditingFeeId(null);
  };

  const getStatusBadge = (status: Fee["status"]) => {
    switch (status) {
      case "paid":
        return (
          <Badge className="bg-green-500 text-white">
            <CheckCircle2 className="w-3 h-3 mr-1" />
            Paid
          </Badge>
        );
      case "pending":
        return (
          <Badge variant="secondary">
            <Clock className="w-3 h-3 mr-1" />
            Pending
          </Badge>
        );
      case "overdue":
        return (
          <Badge variant="destructive">
            <AlertCircle className="w-3 h-3 mr-1" />
            Overdue
          </Badge>
        );
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Total Collected
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              ₹{(paidFees / 1000).toFixed(1)}K
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              ₹{(pendingFees / 1000).toFixed(1)}K
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Overdue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              ₹{(overdueFees / 1000).toFixed(1)}K
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Fee Management</CardTitle>
          <OperationRangeControl value={feesRange} onChange={setFeesRange} />
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search by student name or term..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={filterStatus === "all" ? "default" : "outline"}
                onClick={() => setFilterStatus("all")}
              >
                All
              </Button>
              <Button
                variant={filterStatus === "paid" ? "default" : "outline"}
                onClick={() => setFilterStatus("paid")}
              >
                Paid
              </Button>
              <Button
                variant={filterStatus === "pending" ? "default" : "outline"}
                onClick={() => setFilterStatus("pending")}
              >
                Pending
              </Button>
              <Button
                variant={filterStatus === "overdue" ? "default" : "outline"}
                onClick={() => setFilterStatus("overdue")}
              >
                Overdue
              </Button>
            </div>
          </div>

          <div className="rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Paid Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredFees.map((fee) => (
                  <TableRow key={fee.id}>
                    <TableCell className="font-medium">
                      {getFeeStudentName(fee)}
                    </TableCell>
                    <TableCell className="font-medium">
                      {editingFeeId === fee.id ? (
                        <div className="flex items-center gap-1">
                          <IndianRupee className="w-4 h-4" />
                          <Input
                            type="number"
                            min="0"
                            value={feeDraft.amount}
                            onChange={(e) =>
                              setFeeDraft((current) => ({
                                ...current,
                                amount: e.target.value,
                              }))
                            }
                            className="h-8"
                          />
                        </div>
                      ) : (
                        <div className="flex items-center">
                          <IndianRupee className="w-4 h-4 mr-1" />
                          {fee.amount.toLocaleString("en-IN")}
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      {editingFeeId === fee.id ? (
                        <Input
                          type="date"
                          value={feeDraft.dueDate}
                          onChange={(e) =>
                            setFeeDraft((current) => ({
                              ...current,
                              dueDate: e.target.value,
                            }))
                          }
                          className="h-8"
                        />
                      ) : (
                        new Date(fee.dueDate).toLocaleDateString("en-IN")
                      )}
                    </TableCell>
                    <TableCell>
                      {editingFeeId === fee.id ? (
                        <Input
                          type="date"
                          value={feeDraft.paidDate}
                          onChange={(e) =>
                            setFeeDraft((current) => ({
                              ...current,
                              paidDate: e.target.value,
                            }))
                          }
                          className="h-8"
                          disabled={feeDraft.status !== "paid"}
                        />
                      ) : fee.paidDate ? (
                        new Date(fee.paidDate).toLocaleDateString("en-IN")
                      ) : (
                        "-"
                      )}
                    </TableCell>
                    <TableCell>
                      {editingFeeId === fee.id ? (
                        <select
                          value={feeDraft.status}
                          onChange={(e) =>
                            setFeeDraft((current) => ({
                              ...current,
                              status: e.target.value as Fee["status"],
                              paidDate:
                                e.target.value === "paid"
                                  ? current.paidDate
                                  : "",
                            }))
                          }
                          className="h-8 w-full rounded-md border border-input bg-background px-2 text-sm"
                        >
                          <option value="paid">Paid</option>
                          <option value="pending">Pending</option>
                          <option value="overdue">Overdue</option>
                        </select>
                      ) : (
                        getStatusBadge(fee.status)
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {editingFeeId === fee.id ? (
                          <>
                            <Button
                              size="sm"
                              onClick={() => saveFeeDetails(fee.id)}
                            >
                              Save
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={cancelEditingFee}
                            >
                              Cancel
                            </Button>
                          </>
                        ) : (
                          <>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => startEditingFee(fee)}
                            >
                              Edit
                            </Button>
                            {fee.status !== "paid" && (
                              <Button
                                size="sm"
                                onClick={() => handleMarkAsPaid(fee.id)}
                              >
                                Mark as Paid
                              </Button>
                            )}
                          </>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function EventsTab({
  onEventsChange,
}: {
  onEventsChange?: (events: Event[]) => void;
}) {
  const [events, setEvents] = useState<Event[]>(() => getStoredEvents());
  const [fees, setFees] = useState<Fee[]>(() => getStoredFees());
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingEventId, setEditingEventId] = useState<string | null>(null);
  const [eventError, setEventError] = useState("");
  const [eventNotice, setEventNotice] = useState("");
  const [eventsRange, setEventsRange] = useState<OperationRange>("weekly");
  const [isUploadingMedia, setIsUploadingMedia] = useState(false);
  const [photoUrls, setPhotoUrls] = useState<string>("");
  const [videoUrls, setVideoUrls] = useState<string>("");
  const [newEvent, setNewEvent] = useState<Partial<Event>>({
    title: "",
    description: "",
    date: new Date().toISOString().split("T")[0],
    time: "10:00 AM",
    location: "",
    rsvpCount: 0,
  });

  useEffect(() => {
    setEvents(getStoredEvents());
  }, []);

  useEffect(() => {
    onEventsChange?.(events);
  }, [events, onEventsChange]);

  const resetEventForm = () => {
    setEditingEventId(null);
    setEventError("");
    setPhotoUrls("");
    setVideoUrls("");
    setNewEvent({
      title: "",
      description: "",
      date: new Date().toISOString().split("T")[0],
      time: "10:00 AM",
      location: "",
      rsvpCount: 0,
    });
  };

  const parseUrls = (value: string) =>
    value
      .split("\n")
      .map((item) => item.trim())
      .filter(Boolean);

  const removeEventPhotoAt = (indexToRemove: number) => {
    const updated = parseUrls(photoUrls).filter(
      (_, index) => index !== indexToRemove,
    );
    setPhotoUrls(updated.join("\n"));
  };

  const removeEventVideoAt = (indexToRemove: number) => {
    const updated = parseUrls(videoUrls).filter(
      (_, index) => index !== indexToRemove,
    );
    setVideoUrls(updated.join("\n"));
  };

  const handleEventMediaUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const files = Array.from(event.target.files || []);
    if (files.length === 0) {
      return;
    }

    setEventError("");
    setIsUploadingMedia(true);

    const fileReaders = files.map(
      (file) =>
        new Promise<{ kind: "photo" | "video"; value: string } | null>(
          (resolve) => {
            const reader = new FileReader();
            reader.onload = () => {
              if (typeof reader.result !== "string") {
                resolve(null);
                return;
              }

              if (file.type.startsWith("image/")) {
                resolve({ kind: "photo", value: reader.result });
                return;
              }

              if (file.type.startsWith("video/")) {
                resolve({ kind: "video", value: reader.result });
                return;
              }

              resolve(null);
            };
            reader.onerror = () => resolve(null);
            reader.readAsDataURL(file);
          },
        ),
    );

    void Promise.all(fileReaders)
      .then((results) => {
        const nextPhotos = results
          .filter((item): item is { kind: "photo"; value: string } =>
            Boolean(item && item.kind === "photo"),
          )
          .map((item) => item.value);
        const nextVideos = results
          .filter((item): item is { kind: "video"; value: string } =>
            Boolean(item && item.kind === "video"),
          )
          .map((item) => item.value);

        if (nextPhotos.length > 0) {
          setPhotoUrls((prev) =>
            prev ? `${prev}\n${nextPhotos.join("\n")}` : nextPhotos.join("\n"),
          );
        }

        if (nextVideos.length > 0) {
          setVideoUrls((prev) =>
            prev ? `${prev}\n${nextVideos.join("\n")}` : nextVideos.join("\n"),
          );
        }
      })
      .finally(() => {
        setIsUploadingMedia(false);
        event.target.value = "";
      });
  };

  const handleEditEvent = (eventToEdit: Event) => {
    setEditingEventId(eventToEdit.id);
    setEventError("");
    setNewEvent({ ...eventToEdit });
    setPhotoUrls((eventToEdit.photos || []).join("\n"));
    setVideoUrls((eventToEdit.videos || []).join("\n"));
    setDialogOpen(true);
  };

  const handleDeleteEvent = (eventId: string) => {
    const confirmed = window.confirm("Delete this event?");
    if (!confirmed) {
      return;
    }

    const updated = events.filter((event) => event.id !== eventId);
    setEvents(updated);
    saveStoredEvents(updated);
    onEventsChange?.(updated);
  };

  const handleAddEvent = () => {
    if (isUploadingMedia) {
      setEventError(
        "Please wait until photo/video upload processing completes.",
      );
      return;
    }

    const title = (newEvent.title || "").trim() || "School Event";
    const description = (newEvent.description || "").trim();
    const photos = parseUrls(photoUrls);
    const videos = parseUrls(videoUrls);

    if (!description && photos.length === 0 && videos.length === 0) {
      setEventError("Add event details, a photo, or a video to publish.");
      return;
    }

    const event: Event = {
      id:
        editingEventId ??
        `e${Date.now().toString(36)}${Math.floor(Math.random() * 1000)}`,
      title,
      description,
      date: newEvent.date || new Date().toISOString().split("T")[0],
      time: newEvent.time || "10:00 AM",
      location: (newEvent.location || "").trim() || "School Campus",
      photos,
      videos,
      rsvpCount: Number(newEvent.rsvpCount) || 0,
    };

    const updated = editingEventId
      ? events.map((item) => (item.id === editingEventId ? event : item))
      : [event, ...events];

    setEvents(updated);
    setDialogOpen(false);
    resetEventForm();
    onEventsChange?.(updated);

    const persisted = saveStoredEvents(updated);
    if (!persisted) {
      setEventNotice(
        "Event saved in current view, but browser storage is full. Remove older media events to persist all items.",
      );
      return;
    }

    setEventNotice("Event saved successfully.");
  };

  const eventsInRange = events.filter((event) =>
    isWithinOperationRange(event.date, eventsRange),
  );
  const upcomingEvents = eventsInRange.filter(
    (e) => new Date(e.date) >= new Date(),
  );
  const pastEvents = eventsInRange.filter((e) => new Date(e.date) < new Date());

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Events Management</CardTitle>
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={resetEventForm}>
                  <Plus className="w-4 h-4 mr-2" />
                  Create Event
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>
                    {editingEventId ? "Edit Event" : "Create New Event"}
                  </DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  {eventError && (
                    <Alert variant="destructive">
                      <AlertDescription>{eventError}</AlertDescription>
                    </Alert>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="eventTitle">Event Title</Label>
                    <Input
                      id="eventTitle"
                      value={newEvent.title}
                      onChange={(e) =>
                        setNewEvent({ ...newEvent, title: e.target.value })
                      }
                      placeholder="e.g., Annual Day Celebration"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="eventDescription">Description</Label>
                    <Textarea
                      id="eventDescription"
                      value={newEvent.description}
                      onChange={(e) =>
                        setNewEvent({
                          ...newEvent,
                          description: e.target.value,
                        })
                      }
                      placeholder="Describe the event..."
                      rows={4}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="eventDate">Date</Label>
                      <Input
                        id="eventDate"
                        type="date"
                        value={newEvent.date}
                        onChange={(e) =>
                          setNewEvent({ ...newEvent, date: e.target.value })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="eventTime">Time</Label>
                      <Input
                        id="eventTime"
                        value={newEvent.time}
                        onChange={(e) =>
                          setNewEvent({ ...newEvent, time: e.target.value })
                        }
                        placeholder="10:00 AM"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="eventLocation">Location</Label>
                    <Input
                      id="eventLocation"
                      value={newEvent.location}
                      onChange={(e) =>
                        setNewEvent({ ...newEvent, location: e.target.value })
                      }
                      placeholder="e.g., School Auditorium"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="eventMedia">Upload Photos/Videos</Label>
                    <Input
                      id="eventMedia"
                      type="file"
                      accept="image/*,video/*"
                      multiple
                      className="file:mr-3 file:rounded-md file:border-0 file:bg-blue-600 file:px-3 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-blue-700"
                      onChange={handleEventMediaUpload}
                    />
                  </div>

                  {parseUrls(photoUrls).length > 0 && (
                    <div className="space-y-2 rounded-lg border p-3">
                      <p className="text-sm font-semibold text-slate-700">
                        Attached Photos ({parseUrls(photoUrls).length})
                      </p>
                      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                        {parseUrls(photoUrls).map((photo, index) => (
                          <div
                            key={`event-draft-photo-${index}`}
                            className="relative overflow-hidden rounded-lg border bg-muted"
                          >
                            <img
                              src={photo}
                              alt={`Event draft photo ${index + 1}`}
                              className="h-24 w-full object-cover"
                            />
                            <Button
                              type="button"
                              size="sm"
                              variant="destructive"
                              className="absolute right-1 top-1 h-7 px-2"
                              onClick={() => removeEventPhotoAt(index)}
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {parseUrls(videoUrls).length > 0 && (
                    <div className="space-y-2 rounded-lg border p-3">
                      <p className="text-sm font-semibold text-slate-700">
                        Attached Videos ({parseUrls(videoUrls).length})
                      </p>
                      <div className="grid grid-cols-1 gap-2">
                        {parseUrls(videoUrls).map((video, index) => (
                          <div
                            key={`event-draft-video-${index}`}
                            className="flex items-center justify-between rounded-lg border bg-muted/40 px-3 py-2"
                          >
                            <div className="flex items-center gap-2 overflow-hidden">
                              <Video className="h-4 w-4 flex-shrink-0 text-slate-600" />
                              <span className="truncate text-sm text-slate-700">
                                Video {index + 1}
                              </span>
                            </div>
                            <Button
                              type="button"
                              size="sm"
                              variant="destructive"
                              onClick={() => removeEventVideoAt(index)}
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <Button
                    onClick={handleAddEvent}
                    className="w-full"
                    disabled={isUploadingMedia}
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    {isUploadingMedia
                      ? "Processing files..."
                      : editingEventId
                        ? "Save Event"
                        : "Create Event"}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
          <OperationRangeControl
            value={eventsRange}
            onChange={setEventsRange}
          />
        </CardHeader>
        <CardContent className="space-y-6">
          {eventNotice && (
            <Alert>
              <AlertDescription>{eventNotice}</AlertDescription>
            </Alert>
          )}

          {upcomingEvents.length > 0 && (
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Upcoming Events</h3>
              <div className="grid gap-4 md:grid-cols-2">
                {upcomingEvents.map((event) => (
                  <Card
                    key={event.id}
                    className="overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    {event.photos.length > 0 && (
                      <div className="relative h-48 bg-muted">
                        <img
                          src={event.photos[0]}
                          alt={event.title}
                          className="w-full h-full object-cover"
                        />
                        {event.photos.length > 1 && (
                          <Badge className="absolute top-2 right-2 bg-black/60">
                            <ImageIcon className="w-3 h-3 mr-1" />
                            {event.photos.length} photos
                          </Badge>
                        )}
                      </div>
                    )}
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center justify-between gap-3">
                        <span>{event.title}</span>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEditEvent(event)}
                          >
                            <Pencil className="w-3.5 h-3.5" />
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDeleteEvent(event.id)}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </Button>
                        </div>
                      </CardTitle>
                      <div className="space-y-2 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span>
                            {new Date(event.date).toLocaleDateString("en-IN", {
                              weekday: "long",
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          <span>{event.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4" />
                          <span>{event.rsvpCount} RSVPs</span>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        {event.description}
                      </p>

                      {event.videos && event.videos.length > 0 && (
                        <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
                          {event.videos.map((video, idx) => (
                            <video
                              key={`${event.id}-event-video-${idx}`}
                              controls
                              className="w-full rounded-lg border"
                              src={video}
                            >
                              Your browser does not support video playback.
                            </video>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {pastEvents.length > 0 && (
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Past Events</h3>
              <div className="grid gap-4 md:grid-cols-2">
                {pastEvents.map((event) => (
                  <Card key={event.id} className="overflow-hidden opacity-75">
                    {event.photos.length > 0 && (
                      <div className="relative h-48 bg-muted">
                        <img
                          src={event.photos[0]}
                          alt={event.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center justify-between gap-3">
                        <span className="flex items-center gap-2">
                          {event.title}
                          <Badge variant="secondary">Past</Badge>
                        </span>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEditEvent(event)}
                          >
                            <Pencil className="w-3.5 h-3.5" />
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDeleteEvent(event.id)}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </Button>
                        </div>
                      </CardTitle>
                      <div className="space-y-2 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span>
                            {new Date(event.date).toLocaleDateString("en-IN")}
                          </span>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {event.description}
                      </p>

                      {event.videos && event.videos.length > 0 && (
                        <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
                          {event.videos.map((video, idx) => (
                            <video
                              key={`${event.id}-past-event-video-${idx}`}
                              controls
                              className="w-full rounded-lg border"
                              src={video}
                            >
                              Your browser does not support video playback.
                            </video>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function RegistrationsTab() {
  const [enquiries, setEnquiries] = useState<AdmissionEnquirySubmission[]>(() =>
    getStoredAdmissionEnquiries(),
  );
  const [registrationsRange, setRegistrationsRange] =
    useState<OperationRange>("weekly");
  const [editingEnquiryId, setEditingEnquiryId] = useState<string | null>(null);
  const [draftValues, setDraftValues] = useState<AdmissionFormValues | null>(
    null,
  );

  useEffect(() => {
    const syncEnquiries = () => {
      setEnquiries(getStoredAdmissionEnquiries());
    };

    const handleStorage = (event: StorageEvent) => {
      if (!event.key || event.key === ADMISSION_ENQUIRIES_STORAGE_KEY) {
        syncEnquiries();
      }
    };

    syncEnquiries();
    window.addEventListener("storage", handleStorage);
    window.addEventListener("focus", syncEnquiries);

    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener("focus", syncEnquiries);
    };
  }, []);

  const startEditing = (enquiry: AdmissionEnquirySubmission) => {
    setEditingEnquiryId(enquiry.id);
    setDraftValues({ ...enquiry.values });
  };

  const cancelEditing = () => {
    setEditingEnquiryId(null);
    setDraftValues(null);
  };

  const updateDraftField = (
    field: keyof AdmissionFormValues,
    value: string,
  ) => {
    setDraftValues((current) => {
      if (!current) {
        return current;
      }
      return {
        ...current,
        [field]: value,
      };
    });
  };

  const handleSave = (enquiryId: string) => {
    if (!draftValues) {
      return;
    }

    updateAdmissionEnquiry(enquiryId, draftValues);
    setEnquiries(getStoredAdmissionEnquiries());
    setEditingEnquiryId(null);
    setDraftValues(null);
  };

  const handleDelete = (enquiryId: string) => {
    const confirmed = window.confirm(
      "Delete this registration enquiry? This action cannot be undone.",
    );
    if (!confirmed) {
      return;
    }

    deleteAdmissionEnquiry(enquiryId);
    setEnquiries(getStoredAdmissionEnquiries());
    if (editingEnquiryId === enquiryId) {
      setEditingEnquiryId(null);
      setDraftValues(null);
    }
  };

  const filteredEnquiries = enquiries.filter((enquiry) =>
    isWithinOperationRange(enquiry.submittedAtIso, registrationsRange),
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>New Registrations</CardTitle>
        <CardDescription>
          Submissions from the Apply Admission form are listed here.
        </CardDescription>
        <OperationRangeControl
          value={registrationsRange}
          onChange={setRegistrationsRange}
        />
      </CardHeader>
      <CardContent>
        {filteredEnquiries.length === 0 ? (
          <div className="rounded-lg border border-dashed p-6 text-sm text-muted-foreground">
            No admission enquiries yet. When parents click Save Admission
            Details on the Apply Admission page, entries will appear here.
          </div>
        ) : (
          <div className="space-y-4">
            {filteredEnquiries.map((enquiry) => (
              <Card key={enquiry.id} className="border">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between gap-2">
                    <CardTitle className="text-base">
                      {enquiry.values.childName || "Child Name Not Provided"}
                    </CardTitle>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">
                        {enquiry.submittedAtLabel}
                      </Badge>
                      {editingEnquiryId === enquiry.id ? (
                        <>
                          <Button
                            size="sm"
                            onClick={() => handleSave(enquiry.id)}
                          >
                            Save
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={cancelEditing}
                          >
                            Cancel
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => startEditing(enquiry)}
                          >
                            <Pencil className="w-3.5 h-3.5 mr-1" />
                            Edit
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleDelete(enquiry.id)}
                          >
                            <Trash2 className="w-3.5 h-3.5 mr-1" />
                            Delete
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                  <CardDescription>
                    Parent: {enquiry.values.parentName || "N/A"} ({" "}
                    {enquiry.values.relationship || "N/A"})
                  </CardDescription>
                </CardHeader>
                {editingEnquiryId === enquiry.id && draftValues ? (
                  <CardContent className="grid gap-3 text-sm md:grid-cols-2">
                    <EditableField
                      label="Parent Name"
                      value={draftValues.parentName}
                      onChange={(value) =>
                        updateDraftField("parentName", value)
                      }
                    />
                    <EditableField
                      label="Relationship"
                      value={draftValues.relationship}
                      onChange={(value) =>
                        updateDraftField("relationship", value)
                      }
                    />
                    <EditableField
                      label="Primary Mobile"
                      value={draftValues.phone}
                      onChange={(value) => updateDraftField("phone", value)}
                    />
                    <EditableField
                      label="Alternate Mobile"
                      value={draftValues.alternatePhone}
                      onChange={(value) =>
                        updateDraftField("alternatePhone", value)
                      }
                    />
                    <EditableField
                      label="Email"
                      value={draftValues.email}
                      onChange={(value) => updateDraftField("email", value)}
                    />
                    <EditableField
                      label="Child Name"
                      value={draftValues.childName}
                      onChange={(value) => updateDraftField("childName", value)}
                    />
                    <EditableField
                      label="Date of Birth"
                      type="date"
                      value={draftValues.childDob}
                      onChange={(value) => updateDraftField("childDob", value)}
                    />
                    <EditableField
                      label="Age"
                      value={draftValues.ageGroup}
                      onChange={(value) => updateDraftField("ageGroup", value)}
                    />
                    <EditableField
                      label="Program"
                      value={draftValues.program}
                      onChange={(value) => updateDraftField("program", value)}
                    />
                    <EditableField
                      label="Preferred Start Date"
                      type="date"
                      value={draftValues.startDate}
                      onChange={(value) => updateDraftField("startDate", value)}
                    />
                    <EditableField
                      label="City / Area"
                      value={draftValues.city}
                      onChange={(value) => updateDraftField("city", value)}
                    />
                    <EditableField
                      label="Address"
                      value={draftValues.address}
                      onChange={(value) => updateDraftField("address", value)}
                    />
                    <div className="md:col-span-2 space-y-2">
                      <p className="text-xs uppercase tracking-wide text-muted-foreground">
                        Notes
                      </p>
                      <Textarea
                        value={draftValues.notes}
                        onChange={(e) =>
                          updateDraftField("notes", e.target.value)
                        }
                        rows={3}
                      />
                    </div>
                  </CardContent>
                ) : (
                  <CardContent className="grid gap-3 text-sm md:grid-cols-2">
                    <DetailRow
                      label="Primary Mobile"
                      value={enquiry.values.phone || "N/A"}
                    />
                    <DetailRow
                      label="Alternate Mobile"
                      value={enquiry.values.alternatePhone || "N/A"}
                    />
                    <DetailRow
                      label="Email"
                      value={enquiry.values.email || "N/A"}
                    />
                    <DetailRow
                      label="Date of Birth"
                      value={enquiry.values.childDob || "N/A"}
                    />
                    <DetailRow
                      label="Age"
                      value={enquiry.values.ageGroup || "N/A"}
                    />
                    <DetailRow
                      label="Program"
                      value={enquiry.values.program || "N/A"}
                    />
                    <DetailRow
                      label="Preferred Start Date"
                      value={enquiry.values.startDate || "N/A"}
                    />
                    <DetailRow
                      label="City / Area"
                      value={enquiry.values.city || "N/A"}
                    />
                    <DetailRow
                      label="Address"
                      value={enquiry.values.address || "N/A"}
                    />
                    <DetailRow
                      label="Notes"
                      value={enquiry.values.notes || "N/A"}
                    />
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-wide text-muted-foreground">
        {label}
      </p>
      <p className="font-medium break-words">{value}</p>
    </div>
  );
}

function EditableField({
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
    <div className="space-y-2">
      <p className="text-xs uppercase tracking-wide text-muted-foreground">
        {label}
      </p>
      <Input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

function OperationRangeControl({
  value,
  onChange,
}: {
  value: OperationRange;
  onChange: (value: OperationRange) => void;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2 rounded-lg border bg-muted/30 p-2">
      <div className="flex items-center gap-2 px-2 text-sm text-muted-foreground">
        <Calendar className="h-4 w-4" />
        <span>Operations</span>
      </div>
      <Button
        type="button"
        size="sm"
        variant={value === "daily" ? "default" : "outline"}
        onClick={() => onChange("daily")}
      >
        Daily
      </Button>
      <Button
        type="button"
        size="sm"
        variant={value === "weekly" ? "default" : "outline"}
        onClick={() => onChange("weekly")}
      >
        Weekly
      </Button>
      <Button
        type="button"
        size="sm"
        variant={value === "monthly" ? "default" : "outline"}
        onClick={() => onChange("monthly")}
      >
        Monthly
      </Button>
    </div>
  );
}

function AdminDashboard() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  const [showLogin, setShowLogin] = useState(false);
  const [overviewActivities, setOverviewActivities] = useState<ActivityType[]>(
    () => getStoredActivities(),
  );
  const [overviewEvents, setOverviewEvents] = useState<Event[]>(() =>
    getStoredEvents(),
  );

  useEffect(() => {
    const syncOverviewData = () => {
      setOverviewActivities(getStoredActivities());
      setOverviewEvents(getStoredEvents());
    };

    const handleStorage = (event: StorageEvent) => {
      if (
        !event.key ||
        event.key === ACTIVITIES_STORAGE_KEY ||
        event.key === EVENTS_STORAGE_KEY
      ) {
        syncOverviewData();
      }
    };

    syncOverviewData();
    window.addEventListener("storage", handleStorage);
    window.addEventListener("focus", syncOverviewData);

    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener("focus", syncOverviewData);
    };
  }, []);

  const handleLogout = async () => {
    await logout();
    setShowLogin(true);
  };

  if (showLogin) {
    return (
      <LoginPage
        onLoginSuccess={() => setShowLogin(false)}
        defaultRole="admin"
      />
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b border-border sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-16 h-16 flex items-center justify-center">
                <img
                  src="/birla_logo_vector.svg"
                  alt="Birla Open Minds Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h1 className="text-xl font-bold text-primary">
                  Birla Open Minds Preschool And Day Care
                </h1>
                <p className="text-sm text-muted-foreground">Admin Dashboard</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="font-medium">{user?.name}</p>
                <p className="text-sm text-muted-foreground">{user?.email}</p>
              </div>
              <Button variant="outline" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-6 mb-8">
            <TabsTrigger value="overview" className="gap-2">
              <Activity className="w-4 h-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="students" className="gap-2">
              <Users className="w-4 h-4" />
              Students
            </TabsTrigger>
            <TabsTrigger value="activities" className="gap-2">
              <Activity className="w-4 h-4" />
              Activities
            </TabsTrigger>
            <TabsTrigger value="fees" className="gap-2">
              <IndianRupee className="w-4 h-4" />
              Fees
            </TabsTrigger>
            <TabsTrigger value="events" className="gap-2">
              <Calendar className="w-4 h-4" />
              Events
            </TabsTrigger>
            <TabsTrigger value="registrations" className="gap-2">
              <FileText className="w-4 h-4" />
              Registrations
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <DashboardOverview
              activities={overviewActivities}
              events={overviewEvents}
            />
          </TabsContent>

          <TabsContent value="students">
            <StudentsTab />
          </TabsContent>

          <TabsContent value="activities">
            <ActivitiesTab onActivitiesChange={setOverviewActivities} />
          </TabsContent>

          <TabsContent value="fees">
            <FeesTab />
          </TabsContent>

          <TabsContent value="events">
            <EventsTab onEventsChange={setOverviewEvents} />
          </TabsContent>

          <TabsContent value="registrations">
            <RegistrationsTab />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

// ============================================================================
// PARENT DASHBOARD
// ============================================================================

function ParentDashboard() {
  const { user, logout } = useAuth();
  const [showLogin, setShowLogin] = useState(false);
  const [parentActivitiesRange, setParentActivitiesRange] =
    useState<OperationRange>("weekly");
  const [parentFeesRange, setParentFeesRange] =
    useState<OperationRange>("weekly");
  const [parentEventsRange, setParentEventsRange] =
    useState<OperationRange>("weekly");
  const [students, setStudents] = useState<Student[]>(() =>
    getStoredStudents(),
  );
  const [activities, setActivities] = useState<ActivityType[]>(() =>
    getStoredActivities(),
  );
  const [events, setEvents] = useState<Event[]>(() => getStoredEvents());
  const [fees, setFees] = useState<Fee[]>(() => getStoredFees());

  useEffect(() => {
    const syncFeeds = () => {
      setStudents(getStoredStudents());
      setActivities(getStoredActivities());
      setEvents(getStoredEvents());
      setFees(getStoredFees());
    };

    const handleStorage = (event: StorageEvent) => {
      if (
        !event.key ||
        event.key === STUDENTS_STORAGE_KEY ||
        event.key === ACTIVITIES_STORAGE_KEY ||
        event.key === EVENTS_STORAGE_KEY ||
        event.key === FEES_STORAGE_KEY
      ) {
        syncFeeds();
      }
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        syncFeeds();
      }
    };

    syncFeeds();
    window.addEventListener("storage", handleStorage);
    window.addEventListener("focus", syncFeeds);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener("focus", syncFeeds);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  const handleLogout = async () => {
    await logout();
    setShowLogin(true);
  };

  if (showLogin) {
    return (
      <LoginPage
        onLoginSuccess={() => setShowLogin(false)}
        defaultRole="parent"
      />
    );
  }

  const myChildren = students.filter((s) => user?.studentIds?.includes(s.id));
  const myActivities = activities
    .filter((activity) =>
      isWithinOperationRange(activity.date, parentActivitiesRange),
    )
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const myFees = fees
    .filter((f) => user?.studentIds?.includes(f.studentId))
    .filter((fee) => {
      const referenceDate =
        fee.status === "paid" ? fee.paidDate || fee.dueDate : fee.dueDate;
      return isWithinOperationRange(referenceDate, parentFeesRange);
    });
  const recentEvents = events
    .filter((event) => isWithinOperationRange(event.date, parentEventsRange))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const totalFees = myFees.reduce((sum, fee) => sum + fee.amount, 0);
  const paidFees = myFees
    .filter((f) => f.status === "paid")
    .reduce((sum, fee) => sum + fee.amount, 0);
  const pendingFees = totalFees - paidFees;

  const getStatusBadge = (status: "paid" | "pending" | "overdue") => {
    switch (status) {
      case "paid":
        return (
          <Badge className="bg-green-500 text-white">
            <CheckCircle2 className="w-3 h-3 mr-1" />
            Paid
          </Badge>
        );
      case "pending":
        return (
          <Badge variant="secondary">
            <Clock className="w-3 h-3 mr-1" />
            Pending
          </Badge>
        );
      case "overdue":
        return (
          <Badge variant="destructive">
            <AlertCircle className="w-3 h-3 mr-1" />
            Overdue
          </Badge>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b border-border sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-16 h-16 flex items-center justify-center">
                <img
                  src="/birla_logo_vector.svg"
                  alt="Birla Open Minds Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h1 className="text-xl font-bold text-primary">
                  Birla Open Minds Preschool And Day Care
                </h1>
                <p className="text-sm text-muted-foreground">Parent Portal</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="font-medium">{user?.name}</p>
                <p className="text-sm text-muted-foreground">{user?.email}</p>
              </div>
              <Button variant="outline" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-semibold mb-4">My Children</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {myChildren.map((child) => (
                <Card key={child.id}>
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src={child.photoUrl} alt={child.name} />
                        <AvatarFallback>{child.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold text-lg">{child.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {child.class}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Age {child.age}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <Tabs defaultValue="activities" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="activities">
                <Activity className="w-4 h-4 mr-2" />
                Activities
              </TabsTrigger>
              <TabsTrigger value="fees">
                <IndianRupee className="w-4 h-4 mr-2" />
                Fees
              </TabsTrigger>
              <TabsTrigger value="events">
                <Calendar className="w-4 h-4 mr-2" />
                Events
              </TabsTrigger>
            </TabsList>

            <TabsContent value="activities" className="space-y-4 mt-6">
              <h3 className="font-semibold text-lg">Recent Activities</h3>
              <OperationRangeControl
                value={parentActivitiesRange}
                onChange={setParentActivitiesRange}
              />
              {myActivities.length === 0 && (
                <Card>
                  <CardContent className="pt-6 text-sm text-muted-foreground">
                    No activities have been published yet.
                  </CardContent>
                </Card>
              )}
              {myActivities.map((activity) => {
                const activityDocumentLinks = [
                  ...activity.photos,
                  ...(activity.videos || []),
                ].filter((url) => getMediaTypeFromUrl(url) === "document");

                return (
                  <Card key={activity.id}>
                    <CardHeader className="bg-muted/50">
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg">
                            {activity.title}
                          </CardTitle>
                          <div className="flex items-center gap-3 mt-2 text-sm text-muted-foreground">
                            <Badge variant="secondary">{activity.class}</Badge>
                            <div className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              <span>
                                {new Date(activity.date).toLocaleDateString(
                                  "en-IN",
                                )}{" "}
                                • {activity.time}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <p className="text-sm text-muted-foreground mb-4">
                        {activity.description}
                      </p>
                      {activity.photos.length > 0 && (
                        <div className="grid grid-cols-3 gap-2">
                          {activity.photos.map((photo, idx) => (
                            <div
                              key={idx}
                              className="relative aspect-square rounded-lg overflow-hidden bg-muted group"
                            >
                              <img
                                src={photo}
                                alt={`${activity.title} photo ${idx + 1}`}
                                className="w-full h-full object-cover transition-transform group-hover:scale-105"
                              />
                              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <ImageIcon className="w-8 h-8 text-white" />
                              </div>
                              <a
                                href={photo}
                                download={buildDownloadName(
                                  activity.title,
                                  idx,
                                  "jpg",
                                )}
                                className="absolute bottom-2 right-2"
                              >
                                <Button
                                  type="button"
                                  size="sm"
                                  variant="secondary"
                                >
                                  <Download className="w-3.5 h-3.5 mr-1" />
                                  Download
                                </Button>
                              </a>
                            </div>
                          ))}
                        </div>
                      )}

                      {activity.videos && activity.videos.length > 0 && (
                        <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-2">
                          {activity.videos.map((video, idx) => (
                            <div
                              key={`${activity.id}-parent-video-${idx}`}
                              className="space-y-2"
                            >
                              <video
                                controls
                                className="w-full rounded-lg border"
                                src={video}
                              >
                                Your browser does not support video playback.
                              </video>
                              <a
                                href={video}
                                download={buildDownloadName(
                                  activity.title,
                                  idx,
                                  "mp4",
                                )}
                              >
                                <Button
                                  type="button"
                                  size="sm"
                                  variant="outline"
                                >
                                  <Download className="w-3.5 h-3.5 mr-1" />
                                  Download Video
                                </Button>
                              </a>
                            </div>
                          ))}
                        </div>
                      )}

                      {activityDocumentLinks.length > 0 && (
                        <div className="mt-4 space-y-2">
                          <p className="text-sm font-medium text-slate-700">
                            Documents
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {activityDocumentLinks.map((doc, idx) => (
                              <a
                                key={`${activity.id}-doc-${idx}`}
                                href={doc}
                                download={buildDownloadName(
                                  activity.title,
                                  idx,
                                  "pdf",
                                )}
                              >
                                <Button
                                  type="button"
                                  size="sm"
                                  variant="outline"
                                >
                                  <FileText className="w-3.5 h-3.5 mr-1" />
                                  Download Doc {idx + 1}
                                </Button>
                              </a>
                            ))}
                          </div>
                        </div>
                      )}

                      <p className="text-xs text-muted-foreground mt-3">
                        Posted by {activity.postedBy}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </TabsContent>

            <TabsContent value="fees" className="space-y-6 mt-6">
              <OperationRangeControl
                value={parentFeesRange}
                onChange={setParentFeesRange}
              />
              <div className="grid gap-4 md:grid-cols-3">
                <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total Fees
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-blue-600">
                      ₹{totalFees.toLocaleString("en-IN")}
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Paid</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-green-600">
                      ₹{paidFees.toLocaleString("en-IN")}
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">
                      Pending
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-yellow-600">
                      ₹{pendingFees.toLocaleString("en-IN")}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Fee Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {myFees.map((fee) => (
                      <div
                        key={fee.id}
                        className="flex items-center justify-between p-4 rounded-lg border bg-card"
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <p className="font-medium">{fee.studentName}</p>
                            <Badge variant="outline">{fee.term}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Due:{" "}
                            {new Date(fee.dueDate).toLocaleDateString("en-IN")}
                            {fee.paidDate &&
                              ` • Paid: ${new Date(fee.paidDate).toLocaleDateString("en-IN")}`}
                          </p>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <p className="font-semibold text-lg">
                              ₹{fee.amount.toLocaleString("en-IN")}
                            </p>
                          </div>
                          {getStatusBadge(fee.status)}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="events" className="space-y-4 mt-6">
              <h3 className="font-semibold text-lg">Recent Events</h3>
              <OperationRangeControl
                value={parentEventsRange}
                onChange={setParentEventsRange}
              />
              {recentEvents.length === 0 && (
                <Card>
                  <CardContent className="pt-6 text-sm text-muted-foreground">
                    No events have been published yet.
                  </CardContent>
                </Card>
              )}
              <div className="grid gap-4 md:grid-cols-2">
                {recentEvents.map((event) => {
                  const eventDocumentLinks = [
                    ...event.photos,
                    ...(event.videos || []),
                  ].filter((url) => getMediaTypeFromUrl(url) === "document");

                  return (
                    <Card key={event.id} className="overflow-hidden">
                      {event.photos.length > 0 && (
                        <div className="relative h-48 bg-muted">
                          <img
                            src={event.photos[0]}
                            alt={event.title}
                            className="w-full h-full object-cover"
                          />
                          {event.photos.length > 1 && (
                            <Badge className="absolute top-2 right-2 bg-black/60">
                              <ImageIcon className="w-3 h-3 mr-1" />
                              {event.photos.length} photos
                            </Badge>
                          )}
                        </div>
                      )}
                      <CardHeader>
                        <CardTitle className="text-lg">{event.title}</CardTitle>
                        <div className="space-y-2 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <span>
                              {new Date(event.date).toLocaleDateString(
                                "en-IN",
                                {
                                  weekday: "long",
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                },
                              )}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            <span>{event.time}</span>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground mb-4">
                          {event.description}
                        </p>

                        {event.photos.length > 0 && (
                          <div className="mb-3 flex flex-wrap gap-2">
                            {event.photos.map((photo, idx) => (
                              <a
                                key={`${event.id}-photo-download-${idx}`}
                                href={photo}
                                download={buildDownloadName(
                                  event.title,
                                  idx,
                                  "jpg",
                                )}
                              >
                                <Button
                                  type="button"
                                  size="sm"
                                  variant="outline"
                                >
                                  <Download className="w-3.5 h-3.5 mr-1" />
                                  Download Photo {idx + 1}
                                </Button>
                              </a>
                            ))}
                          </div>
                        )}

                        {event.videos && event.videos.length > 0 && (
                          <div className="mb-3 grid grid-cols-1 gap-3 md:grid-cols-2">
                            {event.videos.map((video, idx) => (
                              <div
                                key={`${event.id}-video-download-${idx}`}
                                className="space-y-2"
                              >
                                <video
                                  controls
                                  className="w-full rounded-lg border"
                                  src={video}
                                >
                                  Your browser does not support video playback.
                                </video>
                                <a
                                  href={video}
                                  download={buildDownloadName(
                                    event.title,
                                    idx,
                                    "mp4",
                                  )}
                                >
                                  <Button
                                    type="button"
                                    size="sm"
                                    variant="outline"
                                  >
                                    <Download className="w-3.5 h-3.5 mr-1" />
                                    Download Video
                                  </Button>
                                </a>
                              </div>
                            ))}
                          </div>
                        )}

                        {eventDocumentLinks.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {eventDocumentLinks.map((doc, idx) => (
                              <a
                                key={`${event.id}-doc-download-${idx}`}
                                href={doc}
                                download={buildDownloadName(
                                  event.title,
                                  idx,
                                  "pdf",
                                )}
                              >
                                <Button
                                  type="button"
                                  size="sm"
                                  variant="outline"
                                >
                                  <FileText className="w-3.5 h-3.5 mr-1" />
                                  Download Doc {idx + 1}
                                </Button>
                              </a>
                            ))}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}

// ============================================================================
// MAIN APP
// ============================================================================

function DashboardContent({ defaultRole }: { defaultRole: UserRole | null }) {
  const { user, isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-cream-50 to-green-50">
        <div className="flex items-center gap-2 text-slate-700">
          <Loader2 className="h-5 w-5 animate-spin" />
          <span>Loading dashboard...</span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <LoginPage onLoginSuccess={() => {}} defaultRole={defaultRole} />;
  }

  return user?.role === "admin" ? <AdminDashboard /> : <ParentDashboard />;
}

export function Login() {
  const location = useLocation();
  const defaultRole: UserRole | null = location.pathname.endsWith("/admin")
    ? "admin"
    : location.pathname.endsWith("/parent")
      ? "parent"
      : null;

  return (
    <AuthProvider>
      <DashboardContent defaultRole={defaultRole} />
    </AuthProvider>
  );
}

export default Login;
