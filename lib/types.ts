export type User = {
    id: number;
    name: string;
    email: string;
    phone: string;
    company: {
        name: string;
    };
    address: {
        city: string;
    };
};

export enum Search {
    Email = 'email',
    Name = 'name',
}

export type Filters = Record<Search, string> & {
    city: string;
    companies: string[];
};