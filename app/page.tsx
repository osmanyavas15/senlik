'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    {
      id: 1,
      name: 'Pazaryeri',
      description: 'Elektronik, Teknoloji, Moda, Aksesuar',
      icon: '🛍️',
      slug: 'marketplace',
      color: 'from-blue-600 to-blue-800',
    },
    {
      id: 2,
      name: 'Hizmetler',
      description: 'Temizlik, Teknik Servis, Montaj',
      icon: '🔧',
      slug: 'services',
      color: 'from-green-600 to-green-800',
    },
    {
      id: 3,
      name: 'Business',
      description: 'B2B Ticaret, Tedarikçi Bulma',
      icon: '💼',
      slug: 'business',
      color: 'from-purple-600 to-purple-800',
    },
    {
      id: 4,
      name: 'Aile & Ev',
      description: 'Ev Bakımı, Operasyonel Destek',
      icon: '🏠',
      slug: 'family',
      color: 'from-yellow-600 to-yellow-800',
    },
    {
      id: 5,
      name: 'Senlik Smart',
      description: 'Yapay Zeka Destekli Asistan',
      icon: '🤖',
      slug: 'smart',
      color: 'from-pink-600 to-pink-800',
    },
    {
      id: 6,
      name: 'Değerli Varlıklar',
      description: 'Altın, Gümüş, Kıymetli Materyaller',
      icon: '💎',
      slug: 'valuables',
      color: 'from-amber-600 to-amber-800',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      {/* Navigation */}
      <nav className="bg-gray-900 bg-opacity-95 backdrop-blur-md border-b border-gray-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
                Senlik
              </div>
            </div>

            {/* Menu Items */}
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-white hover:text-amber-400 transition">
                Ana Sayfa
              </Link>
              <Link href="/marketplace" className="text-gray-300 hover:text-amber-400 transition">
                Pazaryeri
              </Link>
              <Link href="/services" className="text-gray-300 hover:text-amber-400 transition">
                Hizmetler
              </Link>
              <Link href="/business" className="text-gray-300 hover:text-amber-400 transition">
                Business
              </Link>
              <Link href="/admin" className="text-gray-300 hover:text-amber-400 transition">
                Admin
              </Link>
            </div>

            {/* Right side icons */}
            <div className="flex items-center space-x-6">
              <button className="text-gray-300 hover:text-amber-400 transition text-xl">
                ❤️
              </button>
              <button className="text-gray-300 hover:text-amber-400 transition text-xl">
                🛒
              </button>
              <Link
                href="/auth/login"
                className="text-gray-300 hover:text-amber-400 transition font-semibold text-sm"
              >
                👤 Hesap
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="text-white">Senlik&apos;e Katılın</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Hayatın, ticaretin ve hizmetlerin yeni merkezi
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Senlik'te ne arıyorsunuz?"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-6 py-4 bg-gray-800 text-white rounded-lg border-2 border-gray-700 hover:border-amber-500 focus:border-amber-500 focus:outline-none placeholder-gray-500 text-lg"
              />
              <button className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white px-6 py-2 rounded-lg transition">
                🔍
              </button>
            </div>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {categories.map((category) => (
            <Link key={category.id} href={`/${category.slug}`}>
              <div
                className={`bg-gradient-to-br ${category.color} rounded-xl p-8 cursor-pointer hover:shadow-2xl hover:scale-105 transition duration-300 h-full border border-gray-700 hover:border-amber-400`}
              >
                <div className="text-5xl mb-4">{category.icon}</div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  {category.name}
                </h3>
                <p className="text-gray-100 text-sm">{category.description}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* Features Section */}
        <section className="bg-gray-800 rounded-xl p-12 mb-20 border border-gray-700">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            Neden Senlik?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-4">🔒</div>
              <h3 className="text-xl font-bold text-white mb-2">Güvenilir</h3>
              <p className="text-gray-300">
                Tüm işlemleriniz güvenli ve korumalı
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-bold text-white mb-2">Hızlı</h3>
              <p className="text-gray-300">
                İhtiyacınız olan her şeyi anında bulun
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🌟</div>
              <h3 className="text-xl font-bold text-white mb-2">Kaliteli</h3>
              <p className="text-gray-300">
                En iyi ürün ve hizmet seçenekleri
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Henüz üye değil misiniz?
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/login">
              <button className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold px-8 py-3 rounded-lg transition w-full sm:w-auto">
                Giriş Yap
              </button>
            </Link>
            <Link href="/auth/register">
              <button className="border-2 border-amber-500 text-amber-400 hover:bg-amber-500 hover:text-white font-bold px-8 py-3 rounded-lg transition w-full sm:w-auto">
                Kayıt Ol
              </button>
            </Link>
          </div>
        </section>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-700 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="text-white font-bold mb-4">Senlik</h4>
              <p className="text-gray-400 text-sm">
                Dijital yaşam, ticaret ve hizmet platformu
              </p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Hizmetler</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>
                  <Link href="/marketplace" className="hover:text-amber-400">
                    Pazaryeri
                  </Link>
                </li>
                <li>
                  <Link href="/services" className="hover:text-amber-400">
                    Hizmetler
                  </Link>
                </li>
                <li>
                  <Link href="/business" className="hover:text-amber-400">
                    Business
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Hakkımızda</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>
                  <Link href="/about" className="hover:text-amber-400">
                    Hakkında
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-amber-400">
                    İletişim
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Yasal</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>
                  <Link href="/privacy" className="hover:text-amber-400">
                    Gizlilik
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-amber-400">
                    Şartlar
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8 text-center text-gray-400 text-sm">
            <p>&copy; 2026 Senlik. Tüm hakları saklıdır.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}