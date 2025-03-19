import { create } from 'zustand';

interface UserState {
  user: any | null;
  setUser: (user: any) => void;
  clearUser: () => void;
}

const useUserStore = create<UserState>((set) => ({
  user: null, 
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }), 
}));

export default useUserStore;
