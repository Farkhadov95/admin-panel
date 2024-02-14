import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";

const RequireAuth: React.FC<{ children: ReactNode }> = ({ children }) => {
  const currentUserID = sessionStorage.getItem("currentUser");

  if (!currentUserID) {
    return <Navigate to="/" />;
  }

  return children;
};

export default RequireAuth;
