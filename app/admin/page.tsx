'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function AdminPanel() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Placeholder - sonra API'den çek
    setUsers([
      { id: 1, name: 'Osman Yavaş', email: 'osmanyavas15@gmail.com', role: 'admin', createdAt: '2026-09-14' },
      { id: 2, name: 'Test User', email: 'test@example.com', role: 'buyer', createdAt: '2026-09-14' },
    ]);
    setLoading(false);
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 p-6">
      <div className="max-w-6xl mx-auto">
        <Link href="/" className="text-amber-500 hover:text-amber-600 mb-6 inline-block">
          ← Ana Sayfa
        </Link>

        <h1 className="text-4xl font-bold text-white mb-8">Admin Panel</h1>

        {error && <div className="bg-red-600 text-white p-4 rounded-lg mb-6">{error}</div>}

        {/* İstatistikler */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          <div className="bg-slate-800 rounded-lg p-6">
            <p className="text-gray-400 mb-2">Toplam Kullanıcı</p>
            <p className="text-3xl font-bold text-amber-500">{users.length}</p>
          </div>
          <div className="bg-slate-800 rounded-lg p-6">
            <p className="text-gray-400 mb-2">Admin</p>
            <p className="text-3xl font-bold text-green-500">{users.filter(u => u.role === 'admin').length}</p>
          </div>
          <div className="bg-slate-800 rounded-lg p-6">
            <p className="text-gray-400 mb-2">Alıcı</p>
            <p className="text-3xl font-bold text-blue-500">{users.filter(u => u.role === 'buyer').length}</p>
          </div>
        </div>

        {/* Kullanıcı Listesi */}
        <div className="bg-slate-800 rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-700">
            <h2 className="text-2xl font-bold text-white">Kullanıcılar</h2>
          </div>

          {loading ? (
            <div className="p-6 text-center text-gray-400">Yükleniyor...</div>
          ) : (
            <table className="w-full">
              <thead className="bg-slate-700">
                <tr>
                  <th className="px-6 py-3 text-left text-gray-300">Ad</th>
                  <th className="px-6 py-3 text-left text-gray-300">Email</th>
                  <th className="px-6 py-3 text-left text-gray-300">Rol</th>
                  <th className="px-6 py-3 text-left text-gray-300">Kayıt Tarihi</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-b border-slate-700 hover:bg-slate-700/50">
                    <td className="px-6 py-4 text-white">{user.name}</td>
                    <td className="px-6 py-4 text-gray-300">{user.email}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm ${
                          user.role === 'admin'
                            ? 'bg-red-600 text-white'
                            : 'bg-blue-600 text-white'
                        }`}
                      >
                        {user.role === 'admin' ? 'Admin' : 'Alıcı'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-300">{user.createdAt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}