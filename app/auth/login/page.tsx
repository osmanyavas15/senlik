'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (!formData.email.includes('@')) throw new Error('Geçerli bir email girin');
      if (!formData.password) throw new Error('Şifre gerekli');

      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error || 'Giriş başarısız');

      localStorage.setItem('token', data.token);

      if (data.user.role === 'admin') {
        router.push('/admin');
      } else if (data.user.role === 'seller') {
        router.push('/seller');
      } else {
        router.push('/dashboard');
      }
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
        <p className="text-gray-400 text-center mb-8">Hesabınıza Giriş Yapın</p>

        {error && (
          <div className="mb-4 bg-red-900 border border-red-700 text-red-100 px-4 py-3 rounded-lg text-sm">
            ✗ {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">
              Email *
            </label>
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
            <label className="block text-sm font-semibold text-gray-300 mb-2">
              Şifre *
            </label>
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

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-amber-500 hover:bg-amber-600 disabled:bg-gray-600 text-white font-bold py-2 rounded-lg transition mt-6"
          >
            {loading ? 'Giriş Yapılıyor...' : 'Giriş Yap'}
          </button>
        </form>

        <p className="text-gray-400 text-center mt-6">
          Hesabınız yok mu?{' '}
          <Link href="/auth/register" className="text-amber-400 hover:text-amber-300 font-semibold">
            Kayıt Olun
          </Link>
        </p>
      </div>
    </div>
  );
}