import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {fields, UserForm, userSchema} from '@/app/components/AddUserModa';
import {useState} from 'react';
import {User} from '@/lib/types';
import {useUsersStore} from '@/lib/Store';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '@/components/ui/dialog';
import {Button} from '@/components/ui/button';
import {Label} from '@/components/ui/label';
import {Input} from '@/components/ui/input';
import {toast} from 'sonner';

type EditUserModalProps = {
    user: User;
    onClose: () => void;
};

export const EditUserModal = ({user, onClose}: EditUserModalProps) => {
    const {register, handleSubmit, reset, formState: {errors}} = useForm<UserForm>({
        defaultValues: {
            name: user.name,
            email: user.email,
            phone: user.phone,
            city: user.address.city,
            company: user.company.name,
        },
        resolver: zodResolver(userSchema),
    });

    const {updateUser} = useUsersStore();

    const onSubmit = (data: UserForm) => {
        const updatedUser = {
            ...user,
            name: data.name,
            email: data.email,
            phone: data.phone,
            address: {city: data.city},
            company: {name: data.company},
        };
        reset(data)
        updateUser(updatedUser);
        onClose();
        toast.success('Пользователь успешно обновлён');
    };

    return (
        <Dialog open onOpenChange={onClose}>
            <DialogTrigger asChild>
                <Button variant="outline">Редактировать</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <DialogHeader>
                        <DialogTitle>Редактировать пользователя</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-3">
                        {fields.map(field => (
                            <div key={field} className="grid gap-1">
                                <Label htmlFor={field}>{field.toUpperCase()}</Label>
                                <Input
                                    id={field}
                                    placeholder={field}
                                    {...register(field, {required: true})}
                                />
                                {errors[field] &&
                                    <span className="text-red-500 text-sm">{errors[field]?.message}</span>}
                            </div>
                        ))}
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Отмена</Button>
                        </DialogClose>
                        <Button type="submit">Сохранить</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};
