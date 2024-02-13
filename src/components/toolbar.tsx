import { Box, Button, HStack, Text } from "@chakra-ui/react";
import { PiSelectionAllFill } from "react-icons/pi";
import {
  MdOutlineDeleteForever,
  MdLockOutline,
  MdLockOpen,
} from "react-icons/md";
import useStore from "../store/store";
import {
  dispatchDeleteUsers,
  dispatchStatusChange,
} from "../services/api-client";
import { UserSelect, Users } from "../types/user";
import { useNavigate } from "react-router-dom";

const Toolbar = () => {
  const { selectedUsers, selectAll, allUsers, updateAllUsers } = useStore();
  const navigate = useNavigate();
  const onUserCheckFail = () => navigate("/");

  const updateStatus = (oldUsers: Users, newUsers: UserSelect[]) => {
    const updatedList = oldUsers.map((user) => {
      const newUser = newUsers.find((newUser) => newUser._id === user._id);
      if (newUser) {
        return { ...user, isActive: newUser.isActive };
      } else {
        return user;
      }
    });
    return updatedList;
  };

  const updatedUsersList = (oldUsers: Users, deletedUsers: UserSelect[]) => {
    console.log(oldUsers);
    const updatedList = oldUsers.filter(
      (user) =>
        !deletedUsers.some((deletedUser) => deletedUser._id === user._id)
    );
    console.log(updatedList);
    return updatedList;
  };

  const isCurrentUserDeleted = (deletedUsers: Users) => {
    const currentUserID = sessionStorage.getItem("currentUser");
    const isUser = deletedUsers.some((user) => user._id === currentUserID);
    return isUser;
  };

  const checkCurrentUser = (users: Users) => {
    const currentUserID = sessionStorage.getItem("currentUser");
    const isUserActive = users.find(
      (user) => user._id === currentUserID
    )?.isActive;

    if (!isUserActive) navigate("/");
  };

  const handleStatus = (status: boolean) => {
    const updatedUsers = selectedUsers.map((user) => ({
      ...user,
      isActive: status,
    }));
    const newList = updateStatus(allUsers, updatedUsers);
    dispatchStatusChange(updatedUsers);
    updateAllUsers(newList);
    checkCurrentUser(newList);
  };

  const handleDelete = () => {
    const usersIds = selectedUsers.map((user) => user._id);
    dispatchDeleteUsers(usersIds, isCurrentUserDeleted, onUserCheckFail);
    updateAllUsers(updatedUsersList(allUsers, selectedUsers));
  };

  const handleSelectAll = () => {
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
      <Button bgColor={"grey"} color={"white"} onClick={handleSelectAll}>
        <PiSelectionAllFill />
        <Text paddingLeft={1}>Select all</Text>
      </Button>

      <Box>
        <Button bgColor={"grey"} color={"white"} onClick={() => handleDelete()}>
          <MdOutlineDeleteForever />
          <Text paddingLeft={1}>Delete</Text>
        </Button>

        <Button
          bgColor={"red"}
          color={"white"}
          marginLeft={2}
          onClick={() => handleStatus(false)}
        >
          <MdLockOutline />
          <Text paddingLeft={1}>Block</Text>
        </Button>

        <Button
          bgColor={"Green"}
          color={"white"}
          marginLeft={2}
          onClick={() => handleStatus(true)}
        >
          <MdLockOpen />
          <Text paddingLeft={1}>Unblock</Text>
        </Button>
      </Box>
    </HStack>
  );
};

export default Toolbar;
