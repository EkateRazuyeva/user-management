import {create} from 'zustand/react';
import {Filters, User} from '@/lib/types';
import {Users} from '@/lib/Users';

type UsersStore = {
    users: User[];
    filteredUsers: User[];
    filters: Filters;

    setFilter: (key: keyof Filters, value: string) => void;
    clearFilter: (key: keyof Filters) => void;
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

    setFilter: (key, value) => {
        const {users, filters} = get();
        const newFilters = {...filters, [key]: value};

        set({
            filters: newFilters,
            filteredUsers: applyFilters(users, newFilters),
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
        });
    },

}));


