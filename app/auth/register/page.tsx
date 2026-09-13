'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    setLoading(true);

    try {
      if (!formData.name.trim()) throw new Error('Ad Soyad gerekli');
      if (!formData.email.includes('@')) throw new Error('Geçerli bir email girin');
      if (formData.password.length < 6) throw new Error('Şifre en az 6 karakter olmalı');
      if (formData.password !== formData.confirmPassword) throw new Error('Şifreler eşleşmiyor');

      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.toLowerCase().trim(),
          password: formData.password,
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Kayıt başarısız');

      setSuccess(true);
      localStorage.setItem('token', data.token);
      setTimeout(() => {
        if (data.user.role === 'admin') {
          router.push('/admin');
        } else {
          router.push('/dashboard');
        }
      }, 1500);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center px-4 py-8">
      <div className="max-w-md w-full bg-gray-800 rounded-lg border border-gray-700 p-8">
        <h1 className="text-3xl font-bold text-white mb-2 text-center">Senlik</h1>
        <p className="text-gray-400 text-center mb-8">Yeni Hesap Oluştur</p>

        {success && (
          <div className="mb-4 bg-green-900 border border-green-700 text-green-100 px-4 py-3 rounded-lg text-sm">
            ✓ Kayıt başarılı! Yönlendiriliyorsunuz...
          </div>
        )}

        {error && (
          <div className="mb-4 bg-red-900 border border-red-700 text-red-100 px-4 py-3 rounded-lg text-sm">
            ✗ {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">Ad Soyad *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Osman Yavaş"
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg focus:border-amber-500 focus:outline-none placeholder-gray-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">Email *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="osman@example.com"
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg focus:border-amber-500 focus:outline-none placeholder-gray-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">Şifre *</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••"
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg focus:border-amber-500 focus:outline-none placeholder-gray-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">Şifre Tekrar *</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="••••••"
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg focus:border-amber-500 focus:outline-none placeholder-gray-500"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading || success}
            className="w-full bg-amber-500 hover:bg-amber-600 disabled:bg-gray-600 text-white font-bold py-2 rounded-lg transition mt-6"
          >
            {loading ? 'Kaydediliyor...' : success ? 'Başarılı!' : 'Kayıt Ol'}
          </button>
        </form>

        <p className="text-gray-400 text-center mt-6">
          Zaten üye misiniz?{' '}
          <Link href="/auth/login" className="text-amber-400 hover:text-amber-300 font-semibold">
            Giriş Yapın
          </Link>
        </p>
      </div>
    </div>
  );
}