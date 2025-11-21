'use client'
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import {SearchIcon, XIcon} from 'lucide-react';
import {Label} from '@/components/ui/label'
import {useUsersStore} from '@/lib/Store';
import {Search} from '@/lib/types';
import {useEffect, useState} from 'react';

type Props = {
    kind: Search
}

export const SearchInput = ({kind}: Props) => {
    const {filters, setFilter, clearFilter} = useUsersStore();
    const [localValue, setLocalValue] = useState(filters[kind]);

    useEffect(() => {
        const handler = setTimeout(() => {
            setFilter(kind, localValue);
        }, 500);

        return () => clearTimeout(handler);
    }, [localValue, kind, setFilter]);

    const ClearFilterHandler = () => {
        setLocalValue('');
        clearFilter(kind)
    }

    return (
        <div className="flex w-full max-w-sm items-end gap-1 px-3">
            <div className="relative grid w-full max-w-sm items-center gap-3">
                <Label htmlFor="email">Поиск по {kind}</Label>
                <Input type={kind === Search.Email ? 'email' : 'text'}
                       value={localValue}
                       placeholder={kind}
                       onChange={(e) => setLocalValue(e.currentTarget.value)}
                       className="pl-10 pr-10"
                />
                <SearchIcon className="absolute left-3 top-3/4 -translate-y-1/2 text-gray-400" size={16} />
            </div>

            <Button
                type="button"
                variant="outline"
                onClick={ClearFilterHandler}
            >
                <XIcon/>
            </Button>
        </div>
    )
}