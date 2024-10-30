import { createBrowserRouter, Navigate } from "react-router-dom";

import AuthLayout from "./layouts/AuthLayout";

import LoginPage from "./pages/auth/LoginPage";

import VerifyPage from "./pages/auth/VerifyPage";

import DashboardLayout from "./layouts/DashboardLayout";
import { MembersPage } from "./pages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/member/login" />,
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        path: "members",
        element: <MembersPage />,
      },
    ],
  },

  {
    path: "/member",
    element: <AuthLayout />,
    children: [
      {
        index: true,
        path: "login",
        element: <LoginPage />,
      },
    ],
  },

  {
    path: "/member/login",
    element: <AuthLayout />,
    children: [
      {
        path: "verify",
        element: <VerifyPage />,
      },
    ],
  },
]);

export default router;
