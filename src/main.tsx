import React from "react";
import { RouterProvider } from "react-router-dom";

import "./index.css";
import router from "./router.tsx";
import ReactDOM from "react-dom/client";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
