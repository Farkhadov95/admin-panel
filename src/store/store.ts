import {create} from 'zustand';
import { User, UserSelect } from '../types/user';

type State = {
    allUsers: User[],
    selectedUsers: UserSelect[],
    addUser: (user: UserSelect) => void;
    removeUser: (id: string) => void;
    addAllUsers: (users: User[]) => void;
    selectAll: (users: UserSelect[]) => void;
    updateAllUsers: (users: User[]) => void;
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
    })),
    updateAllUsers: (updatedAllUser) => set(() => ({
        allUsers: updatedAllUser 
    }))
}))

export default useStore;
