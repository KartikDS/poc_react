import '../styles/globals.scss';
import 'react-datepicker/dist/react-datepicker.css';
import { Inter } from 'next/font/google';
import React from 'react';

import { AppProvider } from '@/components/App';
import { ErrorBoundary } from '@/components/ErrorBoundary';

const inter = Inter({ subsets: ['latin'] });

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.2/css/all.min.css"
          integrity="sha512-1sCRPdkRXhBV2PBLUdRb4tMg1w2YPf37qatUFeS7zlBy7jJI8Lf4VHwWfZZfpXtYSLy85pkm9GaYVYMfw5BC1A=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
        <link rel="icon" href={`/assets/images/favicon.ico`} sizes="any" />
      </head>
      <body className={inter.className} suppressHydrationWarning={true}>
        <AppProvider>
          <ErrorBoundary> {children}</ErrorBoundary>
        </AppProvider>
      </body>
    </html>
  );
}
