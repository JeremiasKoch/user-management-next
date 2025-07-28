import { create } from 'zustand';

type UserT = {
  userName: string;
  age: number;
};

type UserStoreT = {
  users: UserT[];
  addUser: (user: UserT) => void;
  clearUsers: () => void;
};
export const useUserStore = create<UserStoreT>((set) => ({
  users: [],
  addUser: (user) => {
    set((state) => ({
      users: [...state.users, user],
    }));
  },
  clearUsers: () => {
    set({
      users: [],
    });
  },
}));
