import {
  Table,
  TableContainer,
  Tbody,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import UserTableItem from "./UserTableItem";
import { useEffect } from "react";
import useStore from "../store/store";
import { Users } from "../types/user";
import { useNavigate } from "react-router-dom";
import { getUsers } from "../services/api-client";

const UserTable = () => {
  const { addAllUsers, allUsers, selectedUsers } = useStore();
  const navigate = useNavigate();

  const checkCurrentUser = (users: Users) => {
    const currentUserID = sessionStorage.getItem("currentUser");
    const isUser = users.some((user) => user._id === currentUserID);
    if (!isUser) navigate("/");
    return isUser;
  };

  const isIdAvailable = (id: string) =>
    selectedUsers.some((user) => user._id === id);

  useEffect(() => {
    getUsers(addAllUsers, checkCurrentUser);
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
                isChecked={isIdAvailable(user._id)}
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
