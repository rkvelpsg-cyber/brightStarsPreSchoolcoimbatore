import { createBrowserRouter } from "react-router";
import { Home } from "./pages/Home";
import { ApplyAdmission } from "./pages/ApplyAdmission";
import { Login } from "./pages/Login";
import { ParentDashboard } from "./pages/ParentDashboard";
import { AdminDashboard } from "./pages/AdminDashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
  },
  {
    path: "/apply-admission",
    Component: ApplyAdmission,
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/dashboard/parent",
    Component: ParentDashboard,
  },
  {
    path: "/dashboard/admin",
    Component: AdminDashboard,
  },
  {
    path: "*",
    Component: Home,
  },
]);
