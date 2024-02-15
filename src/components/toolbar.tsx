import { Box, Button, Checkbox, HStack, Text } from "@chakra-ui/react";
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
import { useState } from "react";
import { errorWithTimer } from "../utils";

const Toolbar = () => {
  const { selectedUsers, selectAll, allUsers, updateAllUsers, addError } =
    useStore();
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
    if (isUser) localStorage.removeItem("admin-token");
    if (isUser) sessionStorage.removeItem("currentUser");

    return isUser;
  };

  const checkCurrentUser = (users: Users) => {
    const currentUserID = sessionStorage.getItem("currentUser");
    const isUserActive = users.find(
      (user) => user._id === currentUserID
    )?.isActive;

    if (!isUserActive) {
      sessionStorage.removeItem("currentUser");
      navigate("/");
    }
  };

  const handleStatus = (status: boolean) => {
    const updatedUsers = selectedUsers.map((user) => ({
      ...user,
      isActive: status,
    }));
    const newList = updateStatus(allUsers, updatedUsers);
    dispatchStatusChange(updatedUsers, errorWithTimer, addError);
    updateAllUsers(newList);
    checkCurrentUser(newList);
  };

  const handleDelete = () => {
    const usersIds = selectedUsers.map((user) => user._id);
    dispatchDeleteUsers(
      usersIds,
      isCurrentUserDeleted,
      onUserCheckFail,
      errorWithTimer,
      addError
    );
    updateAllUsers(updatedUsersList(allUsers, selectedUsers));
  };

  const handleSelectAll = () => {
    const users = allUsers;
    const adaptedUsers = users.map(({ _id, isActive }) => ({ _id, isActive }));
    selectAll(adaptedUsers);
  };

  const handleUnselectAll = () => {
    selectAll([]);
  };

  const [checkedStatus, setCheckedStatus] = useState(false);
  const manageSelectAll = () => {
    setCheckedStatus((prevCheckedStatus) => {
      const newCheckedStatus = !prevCheckedStatus;
      if (newCheckedStatus) {
        handleSelectAll();
      } else {
        handleUnselectAll();
      }
      return newCheckedStatus;
    });
  };

  return (
    <HStack
      paddingX={10}
      paddingY={5}
      display={"flex"}
      justifyContent={"space-between"}
    >
      <Button
        as={Checkbox}
        bgColor={"grey"}
        color={"white"}
        isChecked={checkedStatus}
        onChange={() => manageSelectAll()}
      >
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
