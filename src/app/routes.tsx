import { createBrowserRouter } from "react-router";
export const router = createBrowserRouter([
  {
    path: "/",
    lazy: async () => {
      const module = await import("./pages/Home");
      return { Component: module.Home };
    },
  },
  {
    path: "/apply-admission",
    lazy: async () => {
      const module = await import("./pages/ApplyAdmission");
      return { Component: module.ApplyAdmission };
    },
  },
  {
    path: "/login",
    lazy: async () => {
      const module = await import("./pages/Login");
      return { Component: module.Login };
    },
  },
  {
    path: "/dashboard/parent",
    lazy: async () => {
      const module = await import("./pages/ParentDashboard");
      return { Component: module.ParentDashboard };
    },
  },
  {
    path: "/dashboard/admin",
    lazy: async () => {
      const module = await import("./pages/AdminDashboard");
      return { Component: module.AdminDashboard };
    },
  },
  {
    path: "*",
    lazy: async () => {
      const module = await import("./pages/Home");
      return { Component: module.Home };
    },
  },
]);
