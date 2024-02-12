import { Box } from "@chakra-ui/react";
import Navbar from "../components/navbar";
import Toolbar from "../components/toolbar";
import UserList from "../components/userTable";

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
