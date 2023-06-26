import { createBrowserRouter } from "react-router-dom";
import Table from "./components/Table";
import Login from "./auth/Login";
import NotFound from "./404";

// eslint-disable-next-line react-refresh/only-export-components
export const router = createBrowserRouter([
  {
    path: "/auth",
    element: <Login />,
  },
  {
    path: "/dashboard",
    element: <Table />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export const App = () => {
  return router;
};
