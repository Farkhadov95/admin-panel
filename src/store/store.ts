import {create} from 'zustand';
import { User, UserSelect } from '../types/user';

type State = {
    allUsers: User[],
    selectedUsers: UserSelect[],
    blockedUsers: User[],
    userStatus: boolean,
    error: string;
    addUser: (user: UserSelect) => void;
    removeUser: (id: string) => void;
    addAllUsers: (users: User[]) => void;
    selectAll: (users: UserSelect[]) => void;
    updateAllUsers: (users: User[]) => void;
    addError: (error: string) => void;
    updateBlockedUsers: (users: User[]) => void;
    changeUserStatus: (status: boolean) => void;
}

const useStore = create<State>((set) => ({
    allUsers: [],
    selectedUsers: [],
    blockedUsers: [],
    userStatus: true,
    error: '',
    addUser: (user) => set((state) => ({
        selectedUsers: [...state.selectedUsers, user]
    })),
    removeUser: (id) => set((state) => ({
        selectedUsers: state.selectedUsers.filter(user => user._id !== id)
    })),
    addAllUsers: (users) => set(() => ({
        allUsers: users
    })),
    selectAll: (users) => set(() => ({
        selectedUsers: users
    })),
    updateAllUsers: (updatedAllUser) => set(() => ({
        allUsers: updatedAllUser 
    })),
    addError: (error) => set(() => ({
        error: error
    })),
    updateBlockedUsers: (users) => set(() => ({
        blockedUsers: users
    })),
    changeUserStatus: (status) => set(() => ({
        userStatus: status
    }))
}))

export default useStore;
