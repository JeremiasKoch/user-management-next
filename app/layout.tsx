import type { Metadata } from 'next';
import './globals.css';

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
      <body className="bg-gray-500 min-h-screen ">{children}</body>
    </html>
  );
}
