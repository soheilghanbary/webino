import { TextField } from '@/components/text-field';
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';

const schema = z.object({
  phone: z.string().min(11, { message: 'شماره تلفن باید 11 رقم باشد' }),
  password: z.string().min(8, { message: 'رمز عبور باید حداقل 8 کاراکتر باشد' }),
});

type Schema = z.infer<typeof schema>;

export const LoginForm = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Schema>({
    resolver: zodResolver(schema),
  });
  const onSubmit = handleSubmit(async (data) => {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
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
      <Button type="submit" fullWidth>
        ورود به حساب
      </Button>
    </form>
  );
};
