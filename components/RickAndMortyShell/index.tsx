'use client';

import { PropsWithChildren } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const RickAndMortyShell = ({ children }: PropsWithChildren) => {
  const pathname = usePathname();

  return (
    <div className="flex flex-col items-center justify-center h-auto">
      <h1 className="text-2xl font-bold mb-4">Rick and Morty Characters</h1>

      <div className="flex gap-4 mb-4">
        <Link
          href="/rickAndMorty/characters"
          className={`px-4 py-2 rounded ${
            pathname === '/rickAndMorty/characters'
              ? 'bg-blue-600 text-white'
              : 'bg-blue-100 hover:bg-blue-200'
          }`}
        >
          Table
        </Link>
        <Link
          href="/rickAndMorty/logs"
          className={`px-4 py-2 rounded ${
            pathname === '/rickAndMorty/logs'
              ? 'bg-green-600 text-white'
              : 'bg-green-100 hover:bg-green-200'
          }`}
        >
          Logs
        </Link>
      </div>

      <div className="w-full max-w-4xl p-5 bg-gray-100 rounded">{children}</div>
    </div>
  );
};

export default RickAndMortyShell;
