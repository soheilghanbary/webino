import { RegisterForm } from '@/components/register-form';
import { Text } from '@/components/ui/text';
import { createFileRoute, Link } from '@tanstack/react-router';

export const Route = createFileRoute('/auth/register')({
  component: RegisterPage,
});

function RegisterPage() {
  return (
    <section className="mx-auto flex h-dvh max-w-sm flex-col items-center justify-center gap-4 p-8">
      <h1 className="text-center text-4xl font-black">خرجینو</h1>
      <Text center>اپلیکشن مدیریت خرج های شخصی</Text>
      <RegisterForm />
      <p className="pt-8 text-center">
        قبلا ثبت نام کرده اید؟
        <Link className="font-medium text-blue-500 underline" to={'/auth/login'}>
          وارد شوید
        </Link>
      </p>
    </section>
  );
}
