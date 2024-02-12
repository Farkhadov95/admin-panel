import {create} from 'zustand';

type UserSelect = {
    id: string,
    isActive: boolean,
}

type State = {
    selectedUsers: UserSelect[],
    addUser: (user: UserSelect) => void;
    removeUser: (id: string) => void;
}

const useStore = create<State>((set) => ({
    selectedUsers: [],
    addUser: (user) => set((state) => ({
        selectedUsers: [...state.selectedUsers, user]
    })),
    removeUser: (id) => set((state) => ({
        selectedUsers: state.selectedUsers.filter(user => user.id !== id)
    }))
}))

export default useStore;
