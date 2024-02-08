import { Checkbox, Td, Tr } from "@chakra-ui/react";

const UserTableItem = () => {
  return (
    <Tr>
      <Td>
        <Checkbox />
      </Td>
      <Td>ID number</Td>
      <Td>Email</Td>
      <Td>Last Login Time</Td>
      <Td>Registration Time</Td>
      <Td>Status</Td>
    </Tr>
  );
};

export default UserTableItem;
