import { Box } from "@chakra-ui/react";
import Navbar from "../components/navbar";
import Toolbar from "../components/toolbar";
import UserTable from "../components/userTable";

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
