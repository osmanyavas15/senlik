'use client';

import Link from 'next/link';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-slate-900 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8">Siparişlerim</h1>

        {/* Boş Durum */}
        <div className="bg-slate-800 rounded-lg p-12 text-center">
          <p className="text-gray-400 text-lg mb-6">Henüz siparişiniz yok</p>
          <Link
            href="/"
            className="bg-amber-500 hover:bg-amber-600 text-white px-8 py-3 rounded-lg inline-block"
          >
            Alışverişe Başla
          </Link>
        </div>
      </div>
    </div>
  );
}