export type User = {
    email: string;
    isActive: boolean;
    logTime: Date;
    regTime: Date;
    password: string;
    _id: string;
    _v: number;
  };

export type Users = User[];

export type SignUpForm = {
  email: string;
  password: string;
  passwordConf: string;
};

export type SignInForm= {
  email: string;
  password: string;
};

export type UserStatus = {
  _id: string;
  isActive: boolean;
};

export type UserSelect = {
  _id: string,
  isActive: boolean,
}