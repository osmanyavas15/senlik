'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  const stats = [
    { label: 'Toplam Ürün', value: '0', color: 'from-blue-600 to-blue-800' },
    { label: 'Toplam Hizmet', value: '0', color: 'from-green-600 to-green-800' },
    { label: 'Siparişler', value: '0', color: 'from-purple-600 to-purple-800' },
    { label: 'Kullanıcılar', value: '0', color: 'from-yellow-600 to-yellow-800' },
  ];

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-white">Admin Panel</h1>
            <Link href="/" className="text-amber-400 hover:text-amber-300 transition">
              ← Ana Sayfaya Dön
            </Link>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-8 overflow-x-auto">
            {[
              { id: 'overview', label: 'Genel Bakış', icon: '📊' },
              { id: 'products', label: 'Ürünler', icon: '📦' },
              { id: 'services', label: 'Hizmetler', icon: '🔧' },
              { id: 'orders', label: 'Siparişler', icon: '🛒' },
              { id: 'users', label: 'Kullanıcılar', icon: '👥' },
              { id: 'categories', label: 'Kategoriler', icon: '📂' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-4 font-semibold whitespace-nowrap transition border-b-2 ${
                  activeTab === tab.id
                    ? 'text-amber-400 border-amber-400'
                    : 'text-gray-400 border-transparent hover:text-gray-300'
                }`}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div>
            <h2 className="text-2xl font-bold text-white mb-8">Hoş Geldiniz</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {stats.map((stat, idx) => (
                <div
                  key={idx}
                  className={`bg-gradient-to-br ${stat.color} rounded-lg p-6 text-white`}
                >
                  <p className="text-gray-200 text-sm mb-2">{stat.label}</p>
                  <p className="text-4xl font-bold">{stat.value}</p>
                </div>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="bg-gray-800 rounded-lg p-8 border border-gray-700">
              <h3 className="text-xl font-bold text-white mb-6">Hızlı İşlemler</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Link href="/admin/products/new">
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition">
                    ➕ Yeni Ürün Ekle
                  </button>
                </Link>
                <Link href="/admin/services/new">
                  <button className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg transition">
                    ➕ Yeni Hizmet Ekle
                  </button>
                </Link>
                <Link href="/admin/orders">
                  <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-4 rounded-lg transition">
                    📦 Siparişleri Yönet
                  </button>
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Products Tab */}
        {activeTab === 'products' && (
          <div>
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-white">Ürünler</h2>
              <Link href="/admin/products/new">
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition">
                  ➕ Yeni Ürün
                </button>
              </Link>
            </div>
            <div className="bg-gray-800 rounded-lg p-8 border border-gray-700 text-center">
              <p className="text-gray-400">Henüz ürün eklenmemiştir. Başlamak için yeni ürün ekleyiniz.</p>
            </div>
          </div>
        )}

        {/* Services Tab */}
        {activeTab === 'services' && (
          <div>
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-white">Hizmetler</h2>
              <Link href="/admin/services/new">
                <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg transition">
                  ➕ Yeni Hizmet
                </button>
              </Link>
            </div>
            <div className="bg-gray-800 rounded-lg p-8 border border-gray-700 text-center">
              <p className="text-gray-400">Henüz hizmet eklenmemiştir. Başlamak için yeni hizmet ekleyiniz.</p>
            </div>
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div>
            <h2 className="text-2xl font-bold text-white mb-8">Siparişler</h2>
            <div className="bg-gray-800 rounded-lg p-8 border border-gray-700 text-center">
              <p className="text-gray-400">Henüz sipariş bulunmamaktadır.</p>
            </div>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div>
            <h2 className="text-2xl font-bold text-white mb-8">Kullanıcılar</h2>
            <div className="bg-gray-800 rounded-lg p-8 border border-gray-700 text-center">
              <p className="text-gray-400">Henüz kullanıcı bulunmamaktadır.</p>
            </div>
          </div>
        )}

        {/* Categories Tab */}
        {activeTab === 'categories' && (
          <div>
            <h2 className="text-2xl font-bold text-white mb-8">Kategoriler</h2>
            <div className="bg-gray-800 rounded-lg p-8 border border-gray-700 text-center">
              <p className="text-gray-400">Kategoriler yönetim alanı.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}