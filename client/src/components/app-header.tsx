type AppHeaderProps = {
  title: string;
  rightChild?: React.ReactNode;
  leftChild?: React.ReactNode;
};

export const AppHeader = ({ title, rightChild, leftChild }: AppHeaderProps) => (
  <header className="flex items-center justify-between border-b p-4">
    {rightChild}
    <h1 className="text-center text-xl font-semibold text-muted-foreground">
      {title}
    </h1>
    {leftChild}
  </header>
);
