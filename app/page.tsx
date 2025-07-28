import { ErrorDialog } from '@/components';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <ErrorDialog />
      <div className="min-h-screen  flex flex-col flex-grow items-center ">
        <Link
          href="/rickAndMorty/characters"
          className="p-1 rounded bg-amber-200 mb-4"
        >
          Show Rick and Morty Characters
        </Link>
        <Link href="/user" className="p-1 rounded bg-amber-200 mb-4">
          Show original project users
        </Link>
      </div>
    </>
  );
}
