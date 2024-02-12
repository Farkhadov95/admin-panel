import { Box } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import Toolbar from "../components/Toolbar";
import UserList from "../components/UserTable";

const AdminPanel = () => {
  return (
    <Box>
      <Navbar />
      <Toolbar />
      <UserList />
    </Box>
  );
};

export default AdminPanel;
