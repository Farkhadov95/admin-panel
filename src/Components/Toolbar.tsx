import { Box, Button, HStack, Text } from "@chakra-ui/react";
import { PiSelectionAllFill } from "react-icons/pi";
import {
  MdOutlineDeleteForever,
  MdLockOutline,
  MdLockOpen,
} from "react-icons/md";
import useStore from "../store/store";
import apiClient from "../services/api-client";

type UserStatus = {
  id: string;
  isActive: boolean;
};

const dispatchStatusChange = (data: UserStatus[]) => {
  const token = localStorage.getItem("admin-token");
  if (token) apiClient.defaults.headers.common["x-auth-token"] = `${token}`;

  apiClient
    .put("/regs", data)
    .then((res) => {
      console.log(res.data);
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      return [];
    });

  return;
};

const Toolbar = () => {
  const { selectedUsers } = useStore();
  const changeUsersStatus = (status: boolean) => {
    const users = selectedUsers;

    users.map((user) => {
      user.isActive = status;
      return user;
    });
    dispatchStatusChange(users);
    console.log(users);
    console.log(selectedUsers);
  };

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
        <Button
          bgColor={"red"}
          color={"white"}
          marginLeft={2}
          onClick={() => changeUsersStatus(false)}
        >
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
