import axios from "axios";
import { SignInForm, SignUpForm, User, UserStatus, Users } from "../types/user";

export const apiClient = axios.create({
  baseURL: 'https://calm-woodland-21789-b98acf1fada1.herokuapp.com/api',
  timeout: 5000
})

export const getUsers = async (
  onSuccess: (data: Users) => void,
  checkUser: (data: Users) => boolean,
) => {
  const token = localStorage.getItem("admin-token");
  const email = localStorage.getItem('currentUserEmail');
  if (email) apiClient.defaults.headers.common["current-user-email"] = `${email}`;
  if (token) apiClient.defaults.headers.common["x-auth-token"] = `${token}`;
  
  const result = apiClient
    .get("/regs")
    .then((res) => {
      if (checkUser(res.data)) {
        onSuccess(res.data);
        return res.data;
      }
      return [];
    })
    .catch((err) => {
      console.log(err);
      return [];
    });
  return result;
};

export const signUp = (data: SignUpForm, onSuccess: (currentUser: User) => void, onFailUtil: (data: string, showError: (data: string) => void) => void, onFail: (data: string) => void) => {
  apiClient
    .post("/regs", {
      email: data.email,
      password: data.password,
    })
    .then((res) => {
      console.log(res.data);
      const token = res.data.token;
      const email = res.data.email;
      localStorage.setItem("admin-token", token);
      localStorage.setItem('currentUserEmail', email);
      onSuccess(res.data);
    })
    .catch((err) => {
      console.log(err);
      onFailUtil(err.response.data, onFail);
    });
};

export const signIn = (data: SignInForm, onSuccess: (currentUser: User) => void, onFailUtil: (data: string, showError: (data: string) => void) => void, onFail: (data: string) => void) => {
  const token = localStorage.getItem("admin-token");
  const email = localStorage.getItem('currentUserEmail');
  if (email) apiClient.defaults.headers.common["current-user-email"] = `${email}`;
  if (token) apiClient.defaults.headers.common["x-auth-token"] = `${token}`;

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
      .catch((err) => {
        onFailUtil(err.response.data, onFail);
      });
  }
};

export const dispatchStatusChange = (
  data: UserStatus[],
) => {
  const token = localStorage.getItem("admin-token");
  const email = localStorage.getItem('currentUserEmail');
  if (email) apiClient.defaults.headers.common["current-user-email"] = `${email}`;
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

export const dispatchDeleteUsers = (data: string[], isCurrentUserDeleted: (users: Users) => boolean, onUserCheckFail: () => void) => {
  const token = localStorage.getItem("admin-token");
  const email = localStorage.getItem('currentUserEmail');
  if (email) apiClient.defaults.headers.common["current-user-email"] = `${email}`;
  if (token) apiClient.defaults.headers.common["x-auth-token"] = `${token}`;

  apiClient
    .delete("/regs", { data })
    .then((res) => {
      if(isCurrentUserDeleted(res.data)) {
        onUserCheckFail()
        return [];
      } else {
        return res.data;
      }
    })
    .catch((err) => {
      console.log(err);
      return [];
    });

  return;
};

