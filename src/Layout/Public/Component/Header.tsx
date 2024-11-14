'use client';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const ITEMS = [
  {
    title: 'About Us',
    url: '/about-us',
  },
  {
    title: 'Terms and Condition',
    url: '/terms-and-condition',
  },
  {
    title: 'Privacy Policy',
    url: '/privacy-policy',
  },
];

const PublicHeader = () => {
  const path = usePathname();
  return (
    <header className="publicHeader">
      <div className="container d-flex justify-content-between">
        <Image src={'/assets/images/logo.png'} width={80} height={50} alt="logo" />
        <nav className="py-2">
          <ul className="nav me-auto">
            {ITEMS.map((item, idx) => (
              <li key={`public-headerr-${idx}`} className="nav-item">
                <Link href={item.url} className={`nav-link px-2 ${path === item.url ? 'active' : ''}`}>
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default PublicHeader;
