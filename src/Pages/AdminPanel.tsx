import { Box } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import Toolbar from "../components/Toolbar";
import UserTable from "../components/UserTable";

const AdminPanel = () => {
  return (
    <Box>
      <Navbar />
      <Toolbar />
      <UserTable />
    </Box>
  );
};

export default AdminPanel;
