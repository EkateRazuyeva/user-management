import {create} from 'zustand/react';
import {Filters, User} from '@/lib/types';
import {Users} from '@/lib/Users';

type UsersStore = {
    users: User[];
    filteredUsers: User[];
    filters: Filters;
    currentPage: number;
    setCurrentPage: (page: number) => void;

    setFilter: <K extends keyof Filters>(key: K, value: Filters[K]) => void;
    clearFilter: (key: keyof Filters) => void;
    addUser: (user: User) => void;
    updateUser: (user: User) => void;
    deleteUser: (id: number) => void;
};

const applyFilters = (users: typeof Users, filters: Filters) => {
    return users.filter((user) => {
        const matchName = user.name
            .toLowerCase()
            .includes(filters.name);

        const matchEmail = user.email
            .toLowerCase()
            .includes(filters.email);

        const matchCity = filters.city ? user.address.city === filters.city : true;
        const matchCompanies = filters.companies.length
            ? filters.companies.includes(user.company.name)
            : true;

        return matchName && matchEmail && matchCity && matchCompanies;

    });
};

export const useUsersStore = create<UsersStore>((set, get) => ({
    users: Users,
    filteredUsers: Users,
    filters: {
        name: '',
        email: '',
        city: '',
        companies: []
    },
    currentPage: 1,
    setCurrentPage: (page) => set({ currentPage: page }),

    setFilter: (key, value) => {
        const {users, filters} = get();
        const newFilters = {...filters, [key]: value};

        set({
            filters: newFilters,
            filteredUsers: applyFilters(users, newFilters),
            currentPage: 1,
        });

    },

    clearFilter: (key) => {
        const {filters, users} = get();

        const newFilters = {...filters, [key]: ''};

        if (key === 'companies') {
            newFilters.companies = [];
        } else {
            newFilters[key] = '';
        }

        set({
            filters: newFilters,
            filteredUsers: applyFilters(users, newFilters),
            currentPage: 1,
        });
    },
    addUser: (user: User) => {
        const {users, filters} = get();

        const newUsers = [user, ...users];

        set({
            users: newUsers,
            filteredUsers: applyFilters(newUsers, filters),
            currentPage: 1,
        });
    },
    updateUser: (updatedUser: User) => {
        const {users, filters} = get();
        const exists = users.find(u => u.id === updatedUser.id);

        if (!exists) {
            throw new Error('User not found');
        }

        const newUsers = users.map(u => u.id === updatedUser.id ? updatedUser : u);
        set({
            users: newUsers,
            filteredUsers: applyFilters(newUsers, filters),
        });
    },
    deleteUser: (id: number) => {
        const {users} = get();
        const exists = users.find(u => u.id === id);

        if (!exists) {
            throw new Error('User not found');
        }

        set((state) => ({
            users: state.users.filter(u => u.id !== id),
            filteredUsers: state.filteredUsers.filter(u => u.id !== id),
        }));
    }
}));


