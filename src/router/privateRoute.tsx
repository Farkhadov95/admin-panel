import useAuth from "../hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const isUser = useAuth();
  if (!isUser) return <Navigate to={"/"} />;
  return <Outlet />;
};

export default PrivateRoute;
