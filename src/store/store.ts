import {create} from 'zustand';
import { User } from '../types/user';

type UserSelect = {
    _id: string,
    isActive: boolean,
}

type State = {
    allUsers: User[],
    selectedUsers: UserSelect[],
    addUser: (user: UserSelect) => void;
    removeUser: (id: string) => void;
    addAllUsers: (users: User[]) => void;
    selectAll: (users: UserSelect[]) => void;
}

const useStore = create<State>((set) => ({
    allUsers: [],
    selectedUsers: [],
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
    }))
}))

export default useStore;
