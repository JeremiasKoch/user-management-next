'use client';

import { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Caught error in error.tsx:', error);
  }, [error]);

  return (
    <div className="h-screen flex flex-col items-center justify-center gap-4 bg-red-50">
      <h2 className="text-2xl font-semibold text-red-700">
        Something went wrong
      </h2>
      <p className="text-gray-600 text-center max-w-lg">{error.message}</p>
      <button
        onClick={() => reset()}
        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
      >
        Try again
      </button>
    </div>
  );
}
