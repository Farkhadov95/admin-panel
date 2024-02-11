import { Button, HStack, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Navbar = () => {
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
      <Button as={Link} to={"/"} fontWeight={"Bold"} textDecoration={"none"}>
        Exit
      </Button>
    </HStack>
  );
};

export default Navbar;
