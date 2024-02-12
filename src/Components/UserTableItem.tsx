import { Checkbox, Td, Tr } from "@chakra-ui/react";
import { User } from "../types/user";
import useStore from "../store/store";

type UserProp = {
  user: User;
  isChecked: boolean;
};

const UserTableItem = ({ user, isChecked }: UserProp) => {
  const { _id, email, logTime, regTime, isActive } = user;
  const { addUser, removeUser } = useStore();
  const handleCheckbox = (isChecked: boolean) => {
    if (isChecked) {
      addUser({ _id: _id, isActive: isChecked });
    } else {
      removeUser(_id);
    }
  };
  return (
    <Tr>
      <Td>
        <Checkbox
          isChecked={isChecked}
          onChange={(e) => handleCheckbox(e.target.checked)}
        />
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
