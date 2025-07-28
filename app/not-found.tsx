'use client';

import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="h-screen flex flex-col items-center justify-center gap-4 bg-gray-100">
      <h1 className="text-4xl font-bold text-red-600">404 - Page Not Found</h1>
      <p className="text-gray-700 text-lg">
        Sorry, the page you are looking for does not exist.
      </p>
      <Link
        href="/"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Go Home
      </Link>
    </div>
  );
}
