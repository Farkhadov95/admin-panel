import { createBrowserRouter } from "react-router-dom";
import Registration from "../Pages/Registration";
import AdminPanel from "../Pages/AdminPanel";
import Login from "../Pages/Login";
import ErrorPage from "../Pages/NotFound";
import RequireAuth from "../components/RequireAuth";

const router = createBrowserRouter([
  { path: "/", element: <Login /> },
  { path: "/signup", element: <Registration /> },
  {
    path: "/admin",
    element: (
      <RequireAuth>
        <AdminPanel />
      </RequireAuth>
    ),
  },
  { path: "*", element: <ErrorPage /> },
]);

export default router;
