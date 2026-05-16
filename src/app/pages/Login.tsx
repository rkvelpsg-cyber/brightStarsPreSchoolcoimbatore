"use client";

import { createContext, useContext, useState, ReactNode } from "react";
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
import { Progress } from "../components/ui/progress";
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
  parentName: string;
  parentEmail: string;
  parentPhone: string;
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
    parentName: "Rajesh Sharma",
    parentEmail: "rajesh@example.com",
    parentPhone: "+91 98765 43210",
    photoUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Aarav",
    class: "Nursery A",
    admissionDate: "2024-01-15",
  },
  {
    id: "s2",
    name: "Diya Patel",
    age: 3,
    parentName: "Priya Patel",
    parentEmail: "priya@example.com",
    parentPhone: "+91 98765 43211",
    photoUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Diya",
    class: "Pre-Nursery B",
    admissionDate: "2024-02-01",
  },
  {
    id: "s3",
    name: "Arjun Kumar",
    age: 5,
    parentName: "Amit Kumar",
    parentEmail: "amit@example.com",
    parentPhone: "+91 98765 43212",
    photoUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Arjun",
    class: "KG-1",
    admissionDate: "2023-06-10",
  },
  {
    id: "s4",
    name: "Ananya Singh",
    age: 4,
    parentName: "Neha Singh",
    parentEmail: "neha@example.com",
    parentPhone: "+91 98765 43213",
    photoUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ananya",
    class: "Nursery A",
    admissionDate: "2024-01-20",
  },
];

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
    class: "Pre-Nursery B",
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

const mockUsers: Record<string, User & { password: string }> = {
  "admin@birlaopenmindspreschool.com": {
    id: "1",
    name: "Admin User",
    email: "admin@birlaopenmindspreschool.com",
    role: "admin",
    password: "admin123",
  },
  "parent@example.com": {
    id: "2",
    name: "John Doe",
    email: "parent@example.com",
    role: "parent",
    password: "parent123",
    studentIds: ["s1", "s2"],
  },
};

// ============================================================================
// AUTH CONTEXT
// ============================================================================

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("user");
      return stored ? JSON.parse(stored) : null;
    }
    return null;
  });

  const login = async (email: string, password: string): Promise<boolean> => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const mockUser = mockUsers[email];
    if (mockUser && mockUser.password === password) {
      const { password: _, ...userWithoutPassword } = mockUser;
      setUser(userWithoutPassword);
      if (typeof window !== "undefined") {
        localStorage.setItem("user", JSON.stringify(userWithoutPassword));
      }
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    if (typeof window !== "undefined") {
      localStorage.removeItem("user");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: !!user,
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

function LoginPage({ onLoginSuccess }: { onLoginSuccess: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const success = await login(email, password);
      if (success) {
        onLoginSuccess();
      } else {
        setError("Invalid email or password");
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
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
              />
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </Button>

            <div className="mt-6 p-4 bg-muted rounded-lg text-sm space-y-2">
              <p className="font-medium">Demo Credentials:</p>
              <div className="space-y-1">
                <p className="text-muted-foreground">
                  Admin: admin@birlaopenmindspreschool.com / admin123
                </p>
                <p className="text-muted-foreground">
                  Parent: parent@example.com / parent123
                </p>
              </div>
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

function DashboardOverview() {
  const totalStudents = mockStudents.length;
  const recentActivities = mockActivities.slice(0, 3);
  const pendingFees = mockFees.filter(
    (f) => f.status === "pending" || f.status === "overdue",
  ).length;
  const upcomingEvents = mockEvents.filter(
    (e) => new Date(e.date) >= new Date(),
  ).length;
  const totalRevenue = mockFees
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
            <div className="text-3xl font-bold text-secondary">
              {mockActivities.length}
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
              ₹{(totalRevenue / 1000).toFixed(0)}K
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
            {mockStudents.slice(0, 4).map((student) => (
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
                <Badge variant="outline">{student.parentName}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function StudentsTab() {
  const [students, setStudents] = useState<Student[]>(mockStudents);
  const [searchTerm, setSearchTerm] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newStudent, setNewStudent] = useState<Partial<Student>>({
    name: "",
    age: 3,
    parentName: "",
    parentEmail: "",
    parentPhone: "",
    class: "Pre-Nursery B",
    admissionDate: new Date().toISOString().split("T")[0],
  });

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.parentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.class.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleAddStudent = () => {
    const student: Student = {
      id: `s${students.length + 1}`,
      photoUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${newStudent.name}`,
      ...(newStudent as Student),
    };
    setStudents([...students, student]);
    setDialogOpen(false);
    setNewStudent({
      name: "",
      age: 3,
      parentName: "",
      parentEmail: "",
      parentPhone: "",
      class: "Pre-Nursery B",
      admissionDate: new Date().toISOString().split("T")[0],
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Student Management</CardTitle>
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Student
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Add New Student</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
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
                        value={newStudent.age}
                        onChange={(e) =>
                          setNewStudent({
                            ...newStudent,
                            age: parseInt(e.target.value),
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
                          <SelectItem value="Pre-Nursery A">
                            Pre-Nursery A
                          </SelectItem>
                          <SelectItem value="Pre-Nursery B">
                            Pre-Nursery B
                          </SelectItem>
                          <SelectItem value="Nursery A">Nursery A</SelectItem>
                          <SelectItem value="Nursery B">Nursery B</SelectItem>
                          <SelectItem value="KG-1">KG-1</SelectItem>
                          <SelectItem value="KG-2">KG-2</SelectItem>
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

                  <div className="space-y-2">
                    <Label htmlFor="parentName">Parent Name</Label>
                    <Input
                      id="parentName"
                      value={newStudent.parentName}
                      onChange={(e) =>
                        setNewStudent({
                          ...newStudent,
                          parentName: e.target.value,
                        })
                      }
                      placeholder="Enter parent name"
                    />
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
                      <Label htmlFor="parentPhone">Parent Phone</Label>
                      <Input
                        id="parentPhone"
                        value={newStudent.parentPhone}
                        onChange={(e) =>
                          setNewStudent({
                            ...newStudent,
                            parentPhone: e.target.value,
                          })
                        }
                        placeholder="+91 98765 43210"
                      />
                    </div>
                  </div>

                  <Button onClick={handleAddStudent} className="w-full">
                    Add Student
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
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>Class</TableHead>
                  <TableHead>Age</TableHead>
                  <TableHead>Parent Details</TableHead>
                  <TableHead>Admission Date</TableHead>
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
                        <p className="font-medium">{student.parentName}</p>
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Mail className="w-3 h-3" />
                          <span className="text-xs">{student.parentEmail}</span>
                        </div>
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Phone className="w-3 h-3" />
                          <span className="text-xs">{student.parentPhone}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Calendar className="w-3 h-3" />
                        {new Date(student.admissionDate).toLocaleDateString(
                          "en-IN",
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

function ActivitiesTab() {
  const [activities, setActivities] = useState<ActivityType[]>(mockActivities);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [photoUrls, setPhotoUrls] = useState<string>("");
  const [newActivity, setNewActivity] = useState<Partial<ActivityType>>({
    title: "",
    description: "",
    date: new Date().toISOString().split("T")[0],
    time: "10:00 AM",
    class: "Nursery A",
    postedBy: "Admin",
  });

  const handleAddActivity = () => {
    const activity: ActivityType = {
      id: `a${activities.length + 1}`,
      photos: photoUrls
        .split(",")
        .map((url) => url.trim())
        .filter(Boolean),
      ...(newActivity as ActivityType),
    };
    setActivities([activity, ...activities]);
    setDialogOpen(false);
    setNewActivity({
      title: "",
      description: "",
      date: new Date().toISOString().split("T")[0],
      time: "10:00 AM",
      class: "Nursery A",
      postedBy: "Admin",
    });
    setPhotoUrls("");
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Daily Activities</CardTitle>
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Post Activity
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Post New Activity</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
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
                      <Label htmlFor="class">Class</Label>
                      <Select
                        value={newActivity.class}
                        onValueChange={(value) =>
                          setNewActivity({ ...newActivity, class: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Pre-Nursery A">
                            Pre-Nursery A
                          </SelectItem>
                          <SelectItem value="Pre-Nursery B">
                            Pre-Nursery B
                          </SelectItem>
                          <SelectItem value="Nursery A">Nursery A</SelectItem>
                          <SelectItem value="Nursery B">Nursery B</SelectItem>
                          <SelectItem value="KG-1">KG-1</SelectItem>
                          <SelectItem value="KG-2">KG-2</SelectItem>
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
                    <Label htmlFor="photos">Photo URLs (comma-separated)</Label>
                    <Textarea
                      id="photos"
                      value={photoUrls}
                      onChange={(e) => setPhotoUrls(e.target.value)}
                      placeholder="https://example.com/photo1.jpg, https://example.com/photo2.jpg"
                      rows={3}
                    />
                  </div>

                  <Button onClick={handleAddActivity} className="w-full">
                    <Upload className="w-4 h-4 mr-2" />
                    Post Activity
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {activities.map((activity) => (
              <Card key={activity.id} className="overflow-hidden">
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
                            {activity.date} • {activity.time}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Posted by {activity.postedBy}
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
  const [fees, setFees] = useState<Fee[]>(mockFees);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<
    "all" | "paid" | "pending" | "overdue"
  >("all");

  const filteredFees = fees.filter((fee) => {
    const matchesSearch =
      fee.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      fee.term.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "all" || fee.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const totalFees = fees.reduce((sum, fee) => sum + fee.amount, 0);
  const paidFees = fees
    .filter((f) => f.status === "paid")
    .reduce((sum, fee) => sum + fee.amount, 0);
  const pendingFees = fees
    .filter((f) => f.status === "pending")
    .reduce((sum, fee) => sum + fee.amount, 0);
  const overdueFees = fees
    .filter((f) => f.status === "overdue")
    .reduce((sum, fee) => sum + fee.amount, 0);
  const collectionRate = (paidFees / totalFees) * 100;

  const handleMarkAsPaid = (feeId: string) => {
    setFees(
      fees.map((fee) =>
        fee.id === feeId
          ? {
              ...fee,
              status: "paid" as const,
              paidDate: new Date().toISOString().split("T")[0],
            }
          : fee,
      ),
    );
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
      <div className="grid gap-4 md:grid-cols-4">
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

        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Collection Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {collectionRate.toFixed(0)}%
            </div>
            <Progress value={collectionRate} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Fee Management</CardTitle>
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
                  <TableHead>Term</TableHead>
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
                      {fee.studentName}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{fee.term}</Badge>
                    </TableCell>
                    <TableCell className="font-medium">
                      <div className="flex items-center">
                        <IndianRupee className="w-4 h-4 mr-1" />
                        {fee.amount.toLocaleString("en-IN")}
                      </div>
                    </TableCell>
                    <TableCell>
                      {new Date(fee.dueDate).toLocaleDateString("en-IN")}
                    </TableCell>
                    <TableCell>
                      {fee.paidDate
                        ? new Date(fee.paidDate).toLocaleDateString("en-IN")
                        : "-"}
                    </TableCell>
                    <TableCell>{getStatusBadge(fee.status)}</TableCell>
                    <TableCell>
                      {fee.status !== "paid" && (
                        <Button
                          size="sm"
                          onClick={() => handleMarkAsPaid(fee.id)}
                        >
                          Mark as Paid
                        </Button>
                      )}
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

function EventsTab() {
  const [events, setEvents] = useState<Event[]>(mockEvents);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [photoUrls, setPhotoUrls] = useState<string>("");
  const [newEvent, setNewEvent] = useState<Partial<Event>>({
    title: "",
    description: "",
    date: new Date().toISOString().split("T")[0],
    time: "10:00 AM",
    location: "",
    rsvpCount: 0,
  });

  const handleAddEvent = () => {
    const event: Event = {
      id: `e${events.length + 1}`,
      photos: photoUrls
        .split(",")
        .map((url) => url.trim())
        .filter(Boolean),
      ...(newEvent as Event),
    };
    setEvents([event, ...events]);
    setDialogOpen(false);
    setNewEvent({
      title: "",
      description: "",
      date: new Date().toISOString().split("T")[0],
      time: "10:00 AM",
      location: "",
      rsvpCount: 0,
    });
    setPhotoUrls("");
  };

  const upcomingEvents = events.filter((e) => new Date(e.date) >= new Date());
  const pastEvents = events.filter((e) => new Date(e.date) < new Date());

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Events Management</CardTitle>
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Create Event
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Create New Event</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
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
                    <Label htmlFor="eventPhotos">
                      Photo URLs (comma-separated)
                    </Label>
                    <Textarea
                      id="eventPhotos"
                      value={photoUrls}
                      onChange={(e) => setPhotoUrls(e.target.value)}
                      placeholder="https://example.com/photo1.jpg, https://example.com/photo2.jpg"
                      rows={3}
                    />
                  </div>

                  <Button onClick={handleAddEvent} className="w-full">
                    Create Event
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
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
                      <CardTitle className="text-lg">{event.title}</CardTitle>
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
                      <CardTitle className="text-lg flex items-center gap-2">
                        {event.title}
                        <Badge variant="secondary">Past</Badge>
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

function AdminDashboard() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  const [showLogin, setShowLogin] = useState(false);

  const handleLogout = () => {
    logout();
    setShowLogin(true);
  };

  if (showLogin) {
    return <LoginPage onLoginSuccess={() => setShowLogin(false)} />;
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
          <TabsList className="grid w-full grid-cols-5 mb-8">
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
          </TabsList>

          <TabsContent value="overview">
            <DashboardOverview />
          </TabsContent>

          <TabsContent value="students">
            <StudentsTab />
          </TabsContent>

          <TabsContent value="activities">
            <ActivitiesTab />
          </TabsContent>

          <TabsContent value="fees">
            <FeesTab />
          </TabsContent>

          <TabsContent value="events">
            <EventsTab />
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

  const handleLogout = () => {
    logout();
    setShowLogin(true);
  };

  if (showLogin) {
    return <LoginPage onLoginSuccess={() => setShowLogin(false)} />;
  }

  const myChildren = mockStudents.filter((s) =>
    user?.studentIds?.includes(s.id),
  );
  const myChildrenClasses = myChildren.map((c) => c.class);
  const myActivities = mockActivities.filter((a) =>
    myChildrenClasses.includes(a.class),
  );
  const myFees = mockFees.filter((f) =>
    user?.studentIds?.includes(f.studentId),
  );
  const upcomingEvents = mockEvents.filter(
    (e) => new Date(e.date) >= new Date(),
  );

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
              {myActivities.map((activity) => (
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
                          </div>
                        ))}
                      </div>
                    )}
                    <p className="text-xs text-muted-foreground mt-3">
                      Posted by {activity.postedBy}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="fees" className="space-y-6 mt-6">
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
              <h3 className="font-semibold text-lg">Upcoming Events</h3>
              <div className="grid gap-4 md:grid-cols-2">
                {upcomingEvents.map((event) => (
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
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">
                        {event.description}
                      </p>
                      <Button className="w-full">RSVP for Event</Button>
                    </CardContent>
                  </Card>
                ))}
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

function DashboardContent() {
  const { user, isAuthenticated } = useAuth();
  const [showLogin, setShowLogin] = useState(!isAuthenticated);

  if (showLogin || !isAuthenticated) {
    return <LoginPage onLoginSuccess={() => setShowLogin(false)} />;
  }

  return user?.role === "admin" ? <AdminDashboard /> : <ParentDashboard />;
}

export function Login() {
  return (
    <AuthProvider>
      <DashboardContent />
    </AuthProvider>
  );
}

export default Login;
