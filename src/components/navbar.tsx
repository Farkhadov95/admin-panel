import { Button, HStack, Text } from "@chakra-ui/react";
import { NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    sessionStorage.removeItem("currentUser");
    navigate("/");
  };
  return (
    <HStack
      padding={10}
      height={30}
      display={"flex"}
      justifyContent={"space-between"}
      bgColor={"teal.600"}
    >
      <Text
        textTransform={"uppercase"}
        fontWeight={"bold"}
        color={"white"}
        fontStyle={"italic"}
      >
        Admin Panel
      </Text>
      <Button
        as={NavLink}
        to={"/"}
        fontWeight={"Bold"}
        textDecoration={"none"}
        onClick={() => handleLogout()}
      >
        Exit
      </Button>
    </HStack>
  );
};

export default Navbar;
