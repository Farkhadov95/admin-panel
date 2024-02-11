import { Checkbox, Td, Tr } from "@chakra-ui/react";
import { User } from "../types/user";

type UserProp = {
  user: User;
};

const UserTableItem = ({ user }: UserProp) => {
  const { _id, email, logTime, regTime, isActive } = user;
  return (
    <Tr>
      <Td>
        <Checkbox />
      </Td>
      <Td>{_id}</Td>
      <Td>{email}</Td>
      <Td>{logTime.toLocaleString()}</Td>
      <Td>{regTime.toLocaleString()}</Td>
      <Td>{isActive ? "Active" : "Blocked"}</Td>
    </Tr>
  );
};

export default UserTableItem;
