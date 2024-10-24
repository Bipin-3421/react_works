import { createBrowserRouter } from "react-router-dom";

import AuthLayout from "./layouts/AuthLayout";

import LoginPage from "./pages/auth/LoginPage";

const router = createBrowserRouter([
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <LoginPage />,
      },
    ],
  },
]);

export default router;
