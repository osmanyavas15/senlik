'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState('overview');

  // Profil düzenleme
  const [editName, setEditName] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [profileMsg, setProfileMsg] = useState('');
  const [profileErr, setProfileErr] = useState('');

  // Şifre değiştirme
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordConfirm, setNewPasswordConfirm] = useState('');
  const [passMsg, setPassMsg] = useState('');
  const [passErr, setPassErr] = useState('');

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      router.push('/auth/login');
      return;
    }
    const parsedUser = JSON.parse(storedUser);
    setUser(parsedUser);
    setEditName(parsedUser.name);
    setEditEmail(parsedUser.email);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/');
  };

  const handleProfileUpdate = async () => {
    if (!user) return;
    setProfileMsg('');
    setProfileErr('');

    try {
      const res = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: user.id, name: editName, email: editEmail }),
      });
      const data = await res.json();

      if (res.ok) {
        const updatedUser = { ...user, name: editName, email: editEmail };
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setProfileMsg('Profil başarıyla güncellendi!');
        setTimeout(() => setProfileMsg(''), 3000);
      } else {
        setProfileErr(data.error || 'Güncelleme başarısız');
      }
    } catch {
      setProfileErr('Bağlantı hatası');
    }
  };

  const handlePasswordChange = async () => {
    if (!user) return;
    setPassMsg('');
    setPassErr('');

    if (newPassword !== newPasswordConfirm) {
      setPassErr('Yeni şifreler eşleşmiyor');
      return;
    }

    try {
      const res = await fetch('/api/user/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: user.id, oldPassword, newPassword }),
      });
      const data = await res.json();

      if (res.ok) {
        setPassMsg('Şifre başarıyla değiştirildi!');
        setOldPassword('');
        setNewPassword('');
        setNewPasswordConfirm('');
        setTimeout(() => setPassMsg(''), 3000);
      } else {
        setPassErr(data.error || 'Şifre değiştirilemedi');
      }
    } catch {
      setPassErr('Bağlantı hatası');
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <p className="text-white text-xl">Yükleniyor...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      {/* Navbar */}
      <nav className="bg-gray-900 border-b border-gray-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
              Senlik
            </Link>
            <div className="flex items-center gap-4">
              <span className="text-gray-300 hidden sm:block">Merhaba, {user.name}</span>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm transition"
              >
                Çıkış Yap
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Karşılama */}
        <div className="bg-gradient-to-r from-amber-600 to-amber-700 rounded-2xl p-8 mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Hoş geldin, {user.name}! 👋</h1>
          <p className="text-amber-100">Senlik hesabınızı buradan yönetebilirsiniz.</p>
          {user.role === 'admin' && (
            <Link href="/admin" className="inline-block mt-4 bg-white text-amber-700 font-bold px-6 py-2 rounded-lg hover:bg-gray-100 transition">
              👨‍💼 Admin Paneli
            </Link>
          )}
        </div>

        {/* Tab Menü */}
        <div className="flex flex-wrap gap-2 mb-8">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-6 py-3 rounded-lg font-semibold transition ${
              activeTab === 'overview' ? 'bg-amber-500 text-white' : 'bg-slate-800 text-gray-300 hover:bg-slate-700'
            }`}
          >
            📊 Genel Bakış
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            className={`px-6 py-3 rounded-lg font-semibold transition ${
              activeTab === 'profile' ? 'bg-amber-500 text-white' : 'bg-slate-800 text-gray-300 hover:bg-slate-700'
            }`}
          >
            👤 Profil
          </button>
          <button
            onClick={() => setActiveTab('password')}
            className={`px-6 py-3 rounded-lg font-semibold transition ${
              activeTab === 'password' ? 'bg-amber-500 text-white' : 'bg-slate-800 text-gray-300 hover:bg-slate-700'
            }`}
          >
            🔒 Şifre
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-6 py-3 rounded-lg font-semibold transition ${
              activeTab === 'orders' ? 'bg-amber-500 text-white' : 'bg-slate-800 text-gray-300 hover:bg-slate-700'
            }`}
          >
            📦 Siparişlerim
          </button>
        </div>

        {/* GENEL BAKIŞ */}
        {activeTab === 'overview' && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                <div className="text-3xl mb-2">📦</div>
                <p className="text-gray-400 text-sm">Toplam Sipariş</p>
                <p className="text-3xl font-bold text-white">0</p>
              </div>
              <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                <div className="text-3xl mb-2">⏳</div>
                <p className="text-gray-400 text-sm">Bekleyen</p>
                <p className="text-3xl font-bold text-white">0</p>
              </div>
              <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                <div className="text-3xl mb-2">✅</div>
                <p className="text-gray-400 text-sm">Tamamlanan</p>
                <p className="text-3xl font-bold text-white">0</p>
              </div>
              <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                <div className="text-3xl mb-2">❤️</div>
                <p className="text-gray-400 text-sm">Favoriler</p>
                <p className="text-3xl font-bold text-white">0</p>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-white mb-4">Hızlı Erişim</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <Link href="/marketplace" className="bg-blue-600 hover:bg-blue-700 rounded-xl p-6 text-center transition hover:scale-105">
                <div className="text-4xl mb-2">🛍️</div>
                <p className="text-white font-semibold">Pazaryeri</p>
              </Link>
              <Link href="/services" className="bg-green-600 hover:bg-green-700 rounded-xl p-6 text-center transition hover:scale-105">
                <div className="text-4xl mb-2">🔧</div>
                <p className="text-white font-semibold">Hizmetler</p>
              </Link>
              <Link href="/business" className="bg-purple-600 hover:bg-purple-700 rounded-xl p-6 text-center transition hover:scale-105">
                <div className="text-4xl mb-2">💼</div>
                <p className="text-white font-semibold">Business</p>
              </Link>
              <Link href="/family" className="bg-yellow-600 hover:bg-yellow-700 rounded-xl p-6 text-center transition hover:scale-105">
                <div className="text-4xl mb-2">🏠</div>
                <p className="text-white font-semibold">Aile & Ev</p>
              </Link>
              <Link href="/valuables" className="bg-amber-600 hover:bg-amber-700 rounded-xl p-6 text-center transition hover:scale-105">
                <div className="text-4xl mb-2">💎</div>
                <p className="text-white font-semibold">Değerli Varlıklar</p>
              </Link>
            </div>
          </div>
        )}

        {/* PROFİL */}
        {activeTab === 'profile' && (
          <div className="max-w-2xl">
            <div className="bg-slate-800 rounded-xl p-8 border border-slate-700">
              <h2 className="text-2xl font-bold text-white mb-6">Profil Bilgilerim</h2>

              {profileMsg && <div className="bg-green-600 text-white p-4 rounded-lg mb-4">{profileMsg}</div>}
              {profileErr && <div className="bg-red-600 text-white p-4 rounded-lg mb-4">{profileErr}</div>}

              <div className="space-y-4">
                <div>
                  <label className="block text-gray-300 mb-2">Ad Soyad</label>
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="w-full bg-slate-700 text-white px-4 py-3 rounded-lg border border-slate-600 focus:border-amber-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-2">Email</label>
                  <input
                    type="email"
                    value={editEmail}
                    onChange={(e) => setEditEmail(e.target.value)}
                    className="w-full bg-slate-700 text-white px-4 py-3 rounded-lg border border-slate-600 focus:border-amber-500 focus:outline-none"
                  />
                </div>
                <button
                  onClick={handleProfileUpdate}
                  className="bg-amber-500 hover:bg-amber-600 text-white font-bold px-6 py-3 rounded-lg transition w-full"
                >
                  Bilgileri Güncelle
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ŞİFRE */}
        {activeTab === 'password' && (
          <div className="max-w-2xl">
            <div className="bg-slate-800 rounded-xl p-8 border border-slate-700">
              <h2 className="text-2xl font-bold text-white mb-6">Şifre Değiştir</h2>

              {passMsg && <div className="bg-green-600 text-white p-4 rounded-lg mb-4">{passMsg}</div>}
              {passErr && <div className="bg-red-600 text-white p-4 rounded-lg mb-4">{passErr}</div>}

              <div className="space-y-4">
                <div>
                  <label className="block text-gray-300 mb-2">Mevcut Şifre</label>
                  <input
                    type="password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    className="w-full bg-slate-700 text-white px-4 py-3 rounded-lg border border-slate-600 focus:border-amber-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-2">Yeni Şifre</label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full bg-slate-700 text-white px-4 py-3 rounded-lg border border-slate-600 focus:border-amber-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-2">Yeni Şifre Tekrar</label>
                  <input
                    type="password"
                    value={newPasswordConfirm}
                    onChange={(e) => setNewPasswordConfirm(e.target.value)}
                    className="w-full bg-slate-700 text-white px-4 py-3 rounded-lg border border-slate-600 focus:border-amber-500 focus:outline-none"
                  />
                </div>
                <button
                  onClick={handlePasswordChange}
                  className="bg-amber-500 hover:bg-amber-600 text-white font-bold px-6 py-3 rounded-lg transition w-full"
                >
                  Şifreyi Değiştir
                </button>
              </div>
            </div>
          </div>
        )}

        {/* SİPARİŞLER */}
        {activeTab === 'orders' && (
          <div className="bg-slate-800 rounded-xl p-12 border border-slate-700 text-center">
            <div className="text-6xl mb-4">📦</div>
            <h2 className="text-2xl font-bold text-white mb-2">Henüz Siparişiniz Yok</h2>
            <p className="text-gray-400 mb-6">Alışverişe başlamak için kategorilere göz atın!</p>
            <Link href="/marketplace" className="inline-block bg-amber-500 hover:bg-amber-600 text-white font-bold px-8 py-3 rounded-lg transition">
              Alışverişe Başla
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}