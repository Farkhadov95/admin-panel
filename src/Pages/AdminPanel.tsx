import { Box } from "@chakra-ui/react";
import Navbar from "../components/navbar";
import Toolbar from "../components/toolbar";
import UserTable from "../components/userTable";
import useStore from "../store/store";
import { Navigate } from "react-router-dom";

const AdminPanel = () => {
  const { blockedUsers } = useStore();
  const currentUserID = sessionStorage.getItem("currentUser");
  const isUserBlocked = blockedUsers.some((user) => user._id === currentUserID);

  return isUserBlocked ? (
    <Navigate to="/" />
  ) : (
    <Box>
      <Navbar />
      <Toolbar />
      <UserTable />
    </Box>
  );
};

export default AdminPanel;
