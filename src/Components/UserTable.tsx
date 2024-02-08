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

const UserTable = () => {
  return (
    <TableContainer>
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
          <UserTableItem />
          <UserTableItem />
          <UserTableItem />
        </Tbody>
        <Tfoot></Tfoot>
      </Table>
    </TableContainer>
  );
};

export default UserTable;
