'use client'
import {Label} from '@/components/ui/label';
import {useUsersStore} from '@/lib/Store';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';
import {useState} from 'react';

export const CitySelect = () => {
    const {users, filters, setFilter} = useUsersStore();
    const [value, setValue] = useState(filters.city);
    const uniqueCities = Array.from(new Set(users.map(user => user.address.city)));

    const ChangeValueHandler = (val: string) => {
        setValue(val === "all" ? "" : val);
        setFilter('city', val === "all" ? "" : val);
    }

    return (
        <div className="flex flex-col space-y-3">
            <Label htmlFor="city">{`По городу ${value}`}</Label>
            <Select
                value={value}
                onValueChange={(value) => ChangeValueHandler(value)}
            >
                <SelectTrigger  className={"w-[200px]"}>
                    <SelectValue placeholder="Выберите город"
                    />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">Все города</SelectItem>
                    {uniqueCities.map(city => (
                        <SelectItem key={city} value={city}>
                            {city}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );

};