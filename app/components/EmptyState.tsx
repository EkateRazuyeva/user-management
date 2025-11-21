import {Button} from '@/components/ui/button';
import {useUsersStore} from '@/lib/Store';

export const EmptyState = () => {
    const { clearAllFilters } = useUsersStore();
    return (
        <div className="flex flex-col items-center justify-center space-y-2 text-gray-500">
            <div className="text-gray-500 text-xl">Ничего не найдено</div>
            <Button
                variant="outline"
                size="lg"
                className="bg-violet-500 text-xl text-white"
                onClick={clearAllFilters}
            >
                Очистить фильтр
            </Button>
        </div>
    );
};
