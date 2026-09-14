'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Profile() {
  const [name, setName] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    // Şimdilik placeholder
    setSuccess('Profil güncellendi!');
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.length < 6) {
      setError('Şifre en az 6 karakter olmalı');
      return;
    }
    // Şimdilik placeholder
    setSuccess('Şifre değiştirildi!');
  };

  return (
    <div className="min-h-screen bg-slate-900 p-6">
      <div className="max-w-2xl mx-auto">
        <Link href="/dashboard" className="text-amber-500 hover:text-amber-600 mb-6 inline-block">
          ← Geri
        </Link>

        <h1 className="text-4xl font-bold text-white mb-8">Profilim</h1>

        {error && <div className="bg-red-600 text-white p-4 rounded-lg mb-6">{error}</div>}
        {success && <div className="bg-green-600 text-white p-4 rounded-lg mb-6">{success}</div>}

        {/* Profil Güncelleme */}
        <div className="bg-slate-800 rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">Bilgilerini Güncelle</h2>
          <form onSubmit={handleUpdateProfile} className="space-y-4">
            <div>
              <label className="block text-gray-300 mb-2">Ad Soyad</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-slate-700 text-white px-4 py-3 rounded-lg border border-slate-600"
                placeholder="Ad Soyad"
              />
            </div>
            <button className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-lg w-full">
              Güncelle
            </button>
          </form>
        </div>

        {/* Şifre Değiştir */}
        <div className="bg-slate-800 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-white mb-6">Şifre Değiştir</h2>
          <form onSubmit={handleChangePassword} className="space-y-4">
            <div>
              <label className="block text-gray-300 mb-2">Eski Şifre</label>
              <input
                type="password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                className="w-full bg-slate-700 text-white px-4 py-3 rounded-lg border border-slate-600"
              />
            </div>
            <div>
              <label className="block text-gray-300 mb-2">Yeni Şifre</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full bg-slate-700 text-white px-4 py-3 rounded-lg border border-slate-600"
              />
            </div>
            <button className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-lg w-full">
              Şifre Değiştir
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}