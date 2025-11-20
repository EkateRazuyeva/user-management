import {Button} from '@/components/ui/button';

export const EmptyState = () => {
    return (
        <div className="flex flex-col items-center justify-center space-y-2 text-gray-500">
            <div className="text-gray-500 text-xl">Ничего не найдено</div>
            <Button
                variant="outline"
                size="lg"
                className="bg-violet-500 text-xl text-white"
                onClick={()=>{}}
            >
                Очистить фильтр
            </Button>
        </div>
    );
};
