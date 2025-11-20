import {create} from 'zustand/react';
import {User} from '@/lib/types';
import {Users} from '@/lib/Users';

type UsersStore = {
    users: User[];
};

export const useUsersStore = create<UsersStore>(() => ({
    users: Users
}));