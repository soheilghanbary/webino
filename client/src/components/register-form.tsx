import { TextField } from '@/components/text-field';
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';

const schema = z
  .object({
    phone: z.string().min(11, { message: 'شماره تلفن باید 11 رقم باشد' }),
    password: z.string().min(8, { message: 'رمز عبور باید حداقل 8 کاراکتر باشد' }),
    confirmPassword: z.string().min(8, { message: 'رمز عبور باید حداقل 8 کاراکتر باشد' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'رمز عبور و تکرار آن باید مطابقت داشته باشند',
    path: ['confirmPassword'], // Path of the error
  });

type Schema = z.infer<typeof schema>;

export const RegisterForm = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Schema>({
    resolver: zodResolver(schema),
  });
  const onSubmit = handleSubmit(async (data) => {
    const values = { phone: data.phone, password: data.password };
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(values),
    });
    const result = await res.json();
    if (res.ok) {
      toast.success(result.msg);
      navigate({ to: '/' });
    }
    if (!res.ok) {
      toast.error(result.msg);
    }
  });
  return (
    <form onSubmit={onSubmit} className="w-full space-y-4">
      <TextField label="شماره تلفن" {...register('phone')} />
      {errors.phone && <span className="text-xs text-destructive">{errors.phone.message}</span>}
      <TextField type="password" label="رمز عبور" {...register('password')} />
      {errors.password && <span className="text-xs text-destructive">{errors.password.message}</span>}
      <TextField type="password" label="تکرار رمز عبور" {...register('confirmPassword')} />
      {errors.confirmPassword && <span className="text-xs text-destructive">{errors.confirmPassword.message}</span>}
      <Button type="submit" fullWidth>
        ایجاد حساب
      </Button>
    </form>
  );
};
