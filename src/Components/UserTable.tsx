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
import apiClient from "../services/api-client";
import { useEffect, useState } from "react";
import useStore from "../store/store";

type User = {
  email: string;
  isActive: boolean;
  logTime: Date;
  regTime: Date;
  password: string;
  _id: string;
  _v: number;
};

const getUsers = (onSuccess: React.Dispatch<React.SetStateAction<User[]>>) => {
  const token = localStorage.getItem("admin-token");
  if (token) apiClient.defaults.headers.common["x-auth-token"] = `${token}`;

  const result = apiClient
    .get("/regs")
    .then((res) => {
      console.log(res.data);
      onSuccess(res.data);
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      return [];
    });

  return result;
};

const UserTable = () => {
  const [users, setUsers] = useState<User[]>([]);
  const selectedUsers = useStore();
  console.log(selectedUsers);
  useEffect(() => {
    getUsers(setUsers);
  }, []);

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
            {users.map((user) => (
              <UserTableItem key={user?._id} user={user} />
            ))}
          </Tbody>
          <Tfoot></Tfoot>
        </Table>
      </TableContainer>
    </>
  );
};

export default UserTable;
