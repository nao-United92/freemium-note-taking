import { User } from '@supabase/supabase-js';
import { atom, useAtom } from 'jotai';

const currentUserAtom = atom<User>();

export const userCurrentStore = () => {
  const [currentUser, setCurrentUser] = useAtom(currentUserAtom);

  return { currentUser, set: setCurrentUser };
};

const currentUserStore = userCurrentStore();
currentUserStore.set(userData);
currentUserStore.currentUser;
