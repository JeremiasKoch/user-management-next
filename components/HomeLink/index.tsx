'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HomeIcon } from '../icons';

export const HomeLink = () => {
  const pathname = usePathname();
  if (pathname === '/') {
    return null;
  }

  return (
    <Link href="/" className="p-2 rounded bg-cyan-200 w-fit">
      <HomeIcon />
    </Link>
  );
};

export default HomeLink;
