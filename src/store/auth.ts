import { User } from '@/types';
import { StateTree } from "pinia";
const initialState = {
  token: null as string | null,
  user: null as User | null,
};
export const useAuthStore = defineStore("auth", {
  state: () => initialState,
  getters: {
    isLogin: (state) => !!state.token,
  },
  actions: {
    logout() {
      this.token = null;
      this.user = null;
    },
  },
  persist: {
    serializer: {
      deserialize: (val: string) => JSON.parse(atob(val)),
      serialize: (val: StateTree) => btoa(JSON.stringify(val)),
    },
  },
});