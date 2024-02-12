import axios from "axios";
import { SignInForm, SignUpForm, User, UserStatus, Users } from "../types/user";

export const apiClient = axios.create({
  baseURL: 'https://calm-woodland-21789-b98acf1fada1.herokuapp.com/api',
  timeout: 5000
})

export const getUsers = async (
  onSuccess: (data: Users) => void,
  checkUser: (data: Users) => boolean
) => {
  const token = localStorage.getItem("admin-token");
  if (token) apiClient.defaults.headers.common["x-auth-token"] = `${token}`;

  const result = apiClient
    .get("/regs")
    .then((res) => {
      if (checkUser(res.data)) {
        onSuccess(res.data);
        return res.data;
      }
      console.log(res.data);
      return [];
    })
    .catch((err) => {
      console.log(err);
      return [];
    });

  return result;
};

export const signUp = (data: SignUpForm, onSuccess: (currentUser: User) => void) => {
  apiClient
    .post("/regs", {
      email: data.email,
      password: data.password,
    })
    .then((res) => {
      console.log(res.data);
      const token = res.data.token;
      localStorage.setItem("admin-token", token);
      onSuccess(res.data);
    })
    .catch((err) => console.log(err));
};

export const signIn = (data: SignInForm, onSuccess: (currentUser: User) => void) => {
  const token = localStorage.getItem("admin-token");
  if (token) {
    apiClient
      .post("/auth", {
        email: data.email,
        password: data.password,
      })
      .then((res) => {
        console.log(res.data);
        onSuccess(res.data);
      })
      .catch((err) => console.log(err));
  }
};

export const dispatchStatusChange = (data: UserStatus[]) => {
  const token = localStorage.getItem("admin-token");
  if (token) apiClient.defaults.headers.common["x-auth-token"] = `${token}`;

  apiClient
    .put("/regs", data)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      return [];
    });

  return;
};

export const dispatchDeleteUsers = (data: string[], checkUser: (users: Users) => boolean, onUserCheckFail: () => void) => {
  const token = localStorage.getItem("admin-token");
  if (token) apiClient.defaults.headers.common["x-auth-token"] = `${token}`;

  apiClient
    .delete("/regs", { data })
    .then((res) => {
      if(checkUser(res.data)) {
        console.log(checkUser(res.data));
        onUserCheckFail()
        return [];
      } else {
        return res.data;
      }
      return [];
    })
    .catch((err) => {
      console.log(err);
      return [];
    });

  return;
};

