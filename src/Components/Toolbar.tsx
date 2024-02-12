import { Box, Button, HStack, Text } from "@chakra-ui/react";
import { PiSelectionAllFill } from "react-icons/pi";
import {
  MdOutlineDeleteForever,
  MdLockOutline,
  MdLockOpen,
} from "react-icons/md";

const Toolbar = () => {
  return (
    <HStack
      paddingX={10}
      paddingY={5}
      display={"flex"}
      justifyContent={"space-between"}
    >
      <Button bgColor={"grey"} color={"white"}>
        <PiSelectionAllFill />
        <Text paddingLeft={1}>Select all</Text>
      </Button>

      <Box>
        <Button bgColor={"grey"} color={"white"}>
          <MdOutlineDeleteForever />
          <Text paddingLeft={1}>Delete</Text>
        </Button>
        <Button bgColor={"red"} color={"white"} marginLeft={2}>
          <MdLockOutline />
          <Text paddingLeft={1}>Block</Text>
        </Button>
        <Button bgColor={"Green"} color={"white"} marginLeft={2}>
          <MdLockOpen />
          <Text paddingLeft={1}>Unblock</Text>
        </Button>
      </Box>
    </HStack>
  );
};

export default Toolbar;
