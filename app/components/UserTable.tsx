'use client'
import {
    Table,
    TableBody,
    TableCell, TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import {useUsersStore} from '@/lib/Store';
import {clsx} from 'clsx';
import {useEffect, useState} from 'react';
import {SkeletonTable} from '@/app/components/SkeletonTable';
import {EmptyState} from '@/app/components/EmptyState';

export const UserTable = () => {
    const users = useUsersStore((state) => state.users);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 500);
        return () => clearTimeout(timer);
    }, []);

    const tableHeaders = users.length > 0
        ? Object.keys(users[0])
            .filter(key => key !== 'id')
            .map(key => key.toUpperCase())
        : [];

    const baseCellClass = 'px-6 py-2';
    const headerClass = clsx(baseCellClass, 'text-left', 'bg-purple-200', 'font-semibold');
    const rowClass = 'hover:bg-purple-100 transition-colors';

    if (loading) return <SkeletonTable/>;
    if (users.length === 0) return <EmptyState/>;

    return (
        <div className="overflow-x-auto">
            <Table className="min-w-[700px] max-w-5xl mx-auto border border-purple-300">
                <TableHeader>
                    <TableRow>
                        {tableHeaders.map((header) => (
                            <TableHead key={header} className={headerClass}>
                                {header}
                            </TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {users.map((user) => (
                        <TableRow key={user.id} className={rowClass}>
                            <TableCell className={`font-medium ${baseCellClass}`}>{user.name}</TableCell>
                            <TableCell className={baseCellClass}>{user.email}</TableCell>
                            <TableCell className={baseCellClass}>{user.phone}</TableCell>
                            <TableCell className={baseCellClass}>{user.company.name}</TableCell>
                            <TableCell className={baseCellClass}>{user.address.city}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell colSpan={5} className="text-center text-red-500 text-xl">
                            Pagination
                        </TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        </div>
    )
};
