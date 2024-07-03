'use client';
import { cn } from '@/lib/utils';
import { Link, useRouterState } from '@tanstack/react-router';
import { ChartSolidIcon, GridSolidIcon, HomeSolidIcon, PlusSolidIcon } from './icons';

export const BottomNavigation = () => {
  return (
    <section className="container fixed bottom-0 left-1/2 z-50 mx-auto grid w-full -translate-x-1/2 grid-cols-4 border-x border-t bg-background p-2">
      <NavigationLink title="خانه" to="/" icon={HomeSolidIcon} />
      <NavigationLink title="خرج جدید" to="/expenses/create" icon={PlusSolidIcon} />
      <NavigationLink title="دسته بندی ها" to="/categories" icon={GridSolidIcon} />
      {/* <NavigationLink title="کارت ها" to="/cards" icon={CardsSolidIcon} /> */}
      <NavigationLink title="گزارش" to="/report" icon={ChartSolidIcon} />
    </section>
  );
};

type NavigationLinkProps = {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  icon: any;
  title: string;
  to: string;
};

const NavigationLink = ({ title, to, icon: Icon }: NavigationLinkProps) => {
  const router = useRouterState();
  const pathname = router.location.pathname;
  const isActive = pathname === to;
  return (
    <Link
      to={to}
      className={cn(
        'flex size-full flex-col items-center justify-center gap-1.5 fill-muted-foreground text-center text-muted-foreground',
        {
          'dark:text-priamry fill-primary text-primary dark:fill-primary': isActive,
        },
      )}
    >
      <Icon className="size-5" />
      <p className="text-xs font-medium">{title}</p>
    </Link>
  );
};
