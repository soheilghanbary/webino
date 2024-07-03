import { LoginForm } from '@/components/login-form';
import { Text } from '@/components/ui/text';
import { Link, createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/auth/login')({
  component: () => <div>Hello /auth/login!</div>,
});

export default function LoginPage() {
  return (
    <section className="mx-auto flex h-dvh max-w-sm flex-col items-center justify-center gap-4 p-8">
      <h1 className="text-center text-4xl font-black">خرجینو</h1>
      <Text center>اپلیکشن مدیریت خرج های شخصی</Text>
      <LoginForm />
      <p className="pt-8 text-center">
        ثبت نام نکرده اید؟{' '}
        <Link className="font-medium text-blue-500 underline" to={'/auth/register'}>
          ایجاد حساب
        </Link>
      </p>
    </section>
  );
}
