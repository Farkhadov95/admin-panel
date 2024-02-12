import { useNavigate } from "react-router-dom";
import { Users } from "../types/user";
import { useEffect, useState } from "react";

export const useCheckCurrentUser = (users: Users): boolean => {
  const navigate = useNavigate();
  const [isCurrentUser, setIsCurrentUser] = useState<boolean>(false);

  useEffect(() => {
    const currentUserID = sessionStorage.getItem("currentUser");
    const isUser = users.some((user) => user._id === currentUserID);
    setIsCurrentUser(isUser);
    if (!isUser) navigate("/");
  }, [users, navigate]);

  console.log(isCurrentUser);
  return isCurrentUser;
};