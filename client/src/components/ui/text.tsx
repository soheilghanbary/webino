import { cva } from 'class-variance-authority';

const TextVariants = cva('text-base/6 text-muted-foreground', {
  variants: {
    center: {
      true: 'text-center',
    },
  },
  defaultVariants: {
    center: false,
  },
});

export const Text = ({ children, center }: { children: React.ReactNode; center?: boolean }) => {
  return <p className={TextVariants({ center })}>{children}</p>;
};
