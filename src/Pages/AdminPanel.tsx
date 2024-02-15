import { Box } from "@chakra-ui/react";
import Navbar from "../components/navbar";
import Toolbar from "../components/toolbar";
import UserTable from "../components/userTable";
import useStore from "../store/store";
import { Navigate, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const AdminPanel = () => {
  const { error, blockedUsers } = useStore();
  const currentUserID = sessionStorage.getItem("currentUser");
  const isUserBlocked = blockedUsers.some((user) => user._id === currentUserID);
  const navigate = useNavigate();

  useEffect(() => {
    if (error !== "") {
      const timeoutId = setTimeout(() => {
        navigate("/");
      }, 2000);

      return () => clearTimeout(timeoutId);
    }
  }, [error, navigate]);

  return isUserBlocked ? (
    <Navigate to="/" />
  ) : (
    <Box>
      {error !== "" && (
        <Box
          width={"100%"}
          height={"50px"}
          bgColor={"red"}
          padding={"10px"}
          paddingX={"30px"}
          color={"white"}
          fontSize={"20px"}
          fontWeight={"bold"}
          position={"absolute"}
          top={"0"}
          zIndex={"1"}
        >
          {error}
        </Box>
      )}
      <Navbar />
      <Toolbar />
      <UserTable />
    </Box>
  );
};

export default AdminPanel;
