import {create} from 'zustand';

import {SKIP_ONBOARDING_KEY, TOKEN_KEY} from '../constants';
import {getCurrentUser} from '../lib/auth';
import {User} from '../types/auth';
import {deleteFromSecureStore, getFromSecureStore} from '../utils/helpers';

interface Store {
  user: User | null;
  setUser: (user: User) => void;
  fetchCurrentUser: () => void;
  logout: () => void;
  authenticating: boolean;
  loggingOut: boolean;
}
export const useAuthStore = create<Store>(set => ({
  user: null,
  setUser: user => set({user}),
  authenticating: true,
  loggingOut: false,
  fetchCurrentUser: async () => {
    try {
      const token = await getFromSecureStore(TOKEN_KEY);
      if (!token) {
        return null;
      }
      const user = await getCurrentUser();
      set({user});
      return user;
    } catch (error) {
      console.log(JSON.stringify(error));
      return null;
    } finally {
      set({authenticating: false});
    }
  },
  logout: async () => {
    try {
      set({loggingOut: true});
      await deleteFromSecureStore(TOKEN_KEY);
      // await deleteFromSecureStore(SKIP_ONBOARDING_KEY);
      setTimeout(() => {
        set({user: null, loggingOut: false});
      }, 2000);
    } catch (error) {
      console.log('Failed to logout');
    }
  },
}));
