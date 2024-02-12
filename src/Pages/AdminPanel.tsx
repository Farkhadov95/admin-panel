// import { Navigate } from "react-router-dom";
import Navbar from "../components/Navbar";
// import Toolbar from "../components/Toolbar";
import UserList from "../components/UserTable";
// import useAuth from "../hooks/useAuth";

const AdminPanel = () => {
  return (
    <>
      <Navbar />
      {/* <Toolbar /> */}
      <UserList />
    </>
  );
};

export default AdminPanel;
