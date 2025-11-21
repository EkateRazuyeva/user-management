'use client'
import {Button} from '@/components/ui/button'
import {z} from 'zod';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import {Input} from '@/components/ui/input'
import {Label} from '@/components/ui/label'
import {useUsersStore} from '@/lib/Store';
import {useForm} from 'react-hook-form';
import {useState} from 'react';
import {zodResolver} from '@hookform/resolvers/zod';
import {toast} from 'sonner';

export const fields = ['name', 'email', 'phone', 'city', 'company'] as const;
export type UserForm = Record<typeof fields[number], string>;

const userSchema = z.object({
    name: z.string().min(1, 'Имя обязательно'),
    email: z.string()
        .email()
        .refine((val) => {
            const {users} = useUsersStore.getState();
            return !users.some(u => u.email === val);
        }, {message: 'Email уже существует'}),

    phone: z.string()
        .min(1, 'Телефон обязателен')
        .regex(/^\d{7,}$/, 'Телефон должен содержать минимум 7 цифр'),
    city: z.string().min(1, 'Город обязателен'),
    company: z.string().min(1, 'Компания обязательна'),
});


export const AddUserModal = () => {
    const [open, setOpen] = useState(false);
    const {register, handleSubmit, reset, formState: {errors}} = useForm<UserForm>({
        resolver: zodResolver(userSchema),
    });

    const {users, addUser} = useUsersStore();
    const onSubmit = (data: UserForm) => {

        const newUser = {
            id: users.length ? users[users.length - 1].id + 1 : 1,
            name: data.name,
            email: data.email,
            phone: data.phone,
            address: {city: data.city},
            company: {name: data.company}
        };
        addUser(newUser);

        reset();
        setOpen(false);
        toast.success("Пользователь успешно добавлен");
    };

    console.log()
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">Добавить пользователя</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <DialogHeader>
                        <DialogTitle>Добавить пользователя</DialogTitle>
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
                        <Button type="submit">Добавить</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
