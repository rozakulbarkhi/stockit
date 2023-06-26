import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { ThemeProvider } from "./contexts/theme.jsx";
import Layout from "./layouts/Layout.jsx";
import { Toaster } from "react-hot-toast";
import { RouterProvider } from "react-router-dom";
import { App, router } from "../src/App.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
      <Layout>
        <RouterProvider router={router}>
          <App />
        </RouterProvider>
        <Toaster />
      </Layout>
    </ThemeProvider>
  </React.StrictMode>
);
