'use client'
import { Label } from '@/components/ui/label';
import { useUsersStore } from '@/lib/Store';
import {Checkbox} from '@/components/ui/checkbox';

export const CompanyCheckboxes = () => {
    const { users, filters, setFilter } = useUsersStore();
    const uniqueCompanies = Array.from(new Set(users.map(user => user.company.name)));

    const toggleCompany = (company: string) => {
        const current = filters.companies;
        if (current.includes(company)) {
            setFilter('companies', current.filter(c => c !== company));
        } else {
            setFilter('companies', [...current, company]);
        }
    };

    return (
        <div className="flex flex-col space-y-2 ml-5">
            <Label>Компании</Label>
            <div className={"flex py-2 space-x-2"}>
                {uniqueCompanies.map((company) => (
                    <div key={company} className="flex items-center space-x-2">
                        <Checkbox
                            checked={filters.companies.includes(company)}
                            onCheckedChange={() => toggleCompany(company)}
                            className={"border-2 border-gray-500 "}
                        />
                        <span>{company}</span>
                    </div>
                ))}
            </div>

        </div>
    );
};
