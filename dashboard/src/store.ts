import { create } from 'zustand';

export interface TokenStore {
  token: string;
  setToken: (data: string) => void;
}

const useTokenStore = create<TokenStore>((set) => ({
  token: '',
  // @ts-ignore
  setToken: () => set((state, data: string) => ({ token: data })),
}));

export default useTokenStore;
