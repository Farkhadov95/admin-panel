import { Box } from "@chakra-ui/react";
import Navbar from "./Components/Navbar";
import Toolbar from "./Components/Toolbar";
import UserTable from "./Components/UserTable";

function App() {
  return (
    <>
      <Navbar />
      <Box padding={10}>
        <Toolbar />
        <UserTable />
      </Box>
    </>
  );
}

export default App;
