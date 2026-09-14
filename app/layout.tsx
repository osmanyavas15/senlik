'use client';

import './globals.css';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    window.location.href = '/auth/login';
  };

  return (
    <html lang="tr">
      <body className="bg-slate-900">
        {/* Navbar */}
        <nav className="bg-slate-800 border-b border-slate-700">
          <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold text-amber-500">
              Senlik
            </Link>

            <div className="flex gap-6 items-center">
              {isLoggedIn ? (
                <>
                  <Link href="/dashboard" className="text-gray-300 hover:text-white">
                    Siparişlerim
                  </Link>
                  <Link href="/dashboard/profile" className="text-gray-300 hover:text-white">
                    Profilim
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                  >
                    Çıkış Yap
                  </button>
                </>
              ) : (
                <>
                  <Link href="/auth/login" className="text-gray-300 hover:text-white">
                    Giriş Yap
                  </Link>
                  <Link href="/auth/register" className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg">
                    Kayıt Ol
                  </Link>
                </>
              )}
            </div>
          </div>
        </nav>

        {children}
      </body>
    </html>
  );
}