import { Box, Button, HStack, Text } from "@chakra-ui/react";
import { PiSelectionAllFill } from "react-icons/pi";
import {
  MdOutlineDeleteForever,
  MdLockOutline,
  MdLockOpen,
} from "react-icons/md";
import useStore from "../store/store";
import { apiClient } from "../services/api-client";

type UserStatus = {
  _id: string;
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

const dispatchDeleteUsers = (data: string[]) => {
  const token = localStorage.getItem("admin-token");
  if (token) apiClient.defaults.headers.common["x-auth-token"] = `${token}`;

  apiClient
    .delete("/regs", { data })
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
  const { selectedUsers, selectAll, allUsers } = useStore();
  const changeUsersStatus = (status: boolean) => {
    const users = selectedUsers;

    users.map((user) => {
      user.isActive = status;
      return user;
    });
    dispatchStatusChange(users);
    console.log(selectedUsers);
  };

  const deleteUsers = () => {
    const usersIds = selectedUsers.map((user) => user._id);
    dispatchDeleteUsers(usersIds);
    console.log(usersIds);
  };

  const handleSelect = () => {
    const users = allUsers;
    const adaptedUsers = users.map(({ _id, isActive }) => ({ _id, isActive }));
    selectAll(adaptedUsers);
  };

  return (
    <HStack
      paddingX={10}
      paddingY={5}
      display={"flex"}
      justifyContent={"space-between"}
    >
      <Button bgColor={"grey"} color={"white"} onClick={handleSelect}>
        <PiSelectionAllFill />
        <Text paddingLeft={1}>Select all</Text>
      </Button>

      <Box>
        <Button bgColor={"grey"} color={"white"} onClick={() => deleteUsers()}>
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
        <Button
          bgColor={"Green"}
          color={"white"}
          marginLeft={2}
          onClick={() => changeUsersStatus(true)}
        >
          <MdLockOpen />
          <Text paddingLeft={1}>Unblock</Text>
        </Button>
      </Box>
    </HStack>
  );
};

export default Toolbar;
