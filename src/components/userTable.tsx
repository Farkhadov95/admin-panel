import {
  Table,
  TableContainer,
  Tbody,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import UserTableItem from "./userTableItem";
import { useEffect } from "react";
import useStore from "../store/store";
import { UserSelect, Users } from "../types/user";
import { useNavigate } from "react-router-dom";
import { getUsers } from "../services/api-client";
import { errorWithTimer } from "../utils";

const UserTable = () => {
  const { addAllUsers, allUsers, selectedUsers, addError } = useStore();
  const navigate = useNavigate();

  const checkCurrentUser = (users: Users): boolean => {
    const currentUserID = sessionStorage.getItem("currentUser");
    const isUser = users.some((user) => user._id === currentUserID);
    const isUserActive = users.find(
      (user) => user._id === currentUserID
    )?.isActive;

    if (!isUserActive || !isUser) {
      navigate("/");
      return false;
    }
    return true;
  };

  const isIdAvailable = (selected: UserSelect[], id: string) =>
    selected.some((user) => user._id === id);

  useEffect(() => {
    getUsers(addAllUsers, checkCurrentUser, errorWithTimer, addError);
  }, [addAllUsers]);

  return (
    <>
      <TableContainer paddingX={10}>
        <Table variant="striped" colorScheme={"teal.200"}>
          <Thead>
            <Tr>
              <Th>Select</Th>
              <Th>ID</Th>
              <Th>Email</Th>
              <Th>Last Login Time</Th>
              <Th>Registration Time</Th>
              <Th>Status</Th>
            </Tr>
          </Thead>
          <Tbody>
            {allUsers.map((user) => (
              <UserTableItem
                key={user?._id}
                user={user}
                isChecked={isIdAvailable(selectedUsers, user._id)}
              />
            ))}
          </Tbody>
          <Tfoot></Tfoot>
        </Table>
      </TableContainer>
    </>
  );
};

export default UserTable;
