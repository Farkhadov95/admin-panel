import { createBrowserRouter } from "react-router-dom";
import Registration from "../Pages/Registration";
import AdminPanel from "../Pages/AdminPanel";
import Login from "../Pages/Login";

const router = createBrowserRouter([
  { path: "/", element: <Login /> },
  { path: "/signup", element: <Registration /> },
  { path: "/admin", element: <AdminPanel /> },
]);

export default router;
