// import { Navigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import UserList from "../components/UserTable";
// import useAuth from "../hooks/useAuth";

const AdminPanel = () => {
  return (
    <>
      <Navbar />
      <UserList />
    </>
  );
};

export default AdminPanel;
