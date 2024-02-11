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
