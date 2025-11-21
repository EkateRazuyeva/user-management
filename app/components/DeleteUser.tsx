'use client'
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogTrigger,
    DialogClose
} from '@/components/ui/dialog';
import { useUsersStore } from '@/lib/Store';
import {toast} from 'sonner';

type Props = {
    userId: number;
};

export const DeleteUserButton = ({ userId }: Props) => {
    const { deleteUser } = useUsersStore();
    const [open, setOpen] = useState(false);

    const handleDelete = () => {
        try{
            deleteUser(userId);
            setOpen(false);
            toast.success('Пользователь успешно удалён');
        } catch (error) {
            toast.error(`Ошибка при удалении: ${error}`);
        }

    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="destructive" size="sm"
                        onClick={(e) => e.stopPropagation()}>
                    Удалить
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[400px]">
                <DialogHeader>
                    <DialogTitle>Подтверждение удаления</DialogTitle>
                </DialogHeader>
                <p>Вы уверены, что хотите удалить этого пользователя?</p>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">Отмена</Button>
                    </DialogClose>
                    <Button variant="destructive" onClick={handleDelete}>Удалить</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
