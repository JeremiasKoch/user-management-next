import type { Metadata } from 'next';
import './globals.css';
import { QueryProvider } from '@/api/reactQueryProvider';

import { HomeLink } from '@/components';

export const metadata: Metadata = {
  title: 'User management App',
  description: 'Add and view users',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-indigo-100 min-h-screen px-5 py-6">
        <QueryProvider>
          <div className="flex flex-col">
            <HomeLink />
            {children}
          </div>
        </QueryProvider>
      </body>
    </html>
  );
}
