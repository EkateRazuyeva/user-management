import {Button} from '@/components/ui/button';
import {useUsersStore} from '@/lib/Store';

type PaginationProps = {
    totalItems: number;
    pageSize?: number;
};

export const Pagination = ({ totalItems, pageSize = 10 }: PaginationProps) => {
    const { currentPage, setCurrentPage } = useUsersStore();
    const totalPages = Math.ceil(totalItems / pageSize);

    return (
        <div className="flex justify-center items-center gap-2 mt-4">
            <Button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
            >
                Previous
            </Button>

            <div className={"w-10"}>{currentPage} / {totalPages}</div>

            <Button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
            >
                Next
            </Button>
        </div>
    );
};
