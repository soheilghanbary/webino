import { rpc } from '@server/api';
import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';

export const Route = createFileRoute('/')({
  component: IndexPage,
});

function IndexPage() {
  const [data, setData] = useState({});
  const onHandle = async () => {
    const res = await rpc.hello.$get();
    const result = await res.json();
    setData(result);
  };
  return (
    <div className="p-8">
      <h1 className="text-center text-2xl font-black">You'r Now use Modern Vite App</h1>
      <button type="button" onClick={onHandle}>
        say hello
      </button>
      <div className="rounded-md bg-secondary p-4">
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
    </div>
  );
}
