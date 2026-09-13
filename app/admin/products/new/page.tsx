'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function NewProductPage() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    category: 'marketplace',
    image: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const categories = [
    { id: 'marketplace', name: 'Pazaryeri', icon: '🛍️' },
    { id: 'electronics', name: 'Elektronik', icon: '📱' },
    { id: 'fashion', name: 'Moda', icon: '👔' },
    { id: 'home', name: 'Ev & Yaşam', icon: '🏠' },
    { id: 'services', name: 'Hizmetler', icon: '🔧' },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      // Validasyon
      if (!formData.name.trim()) {
        throw new Error('Ürün adı gerekli');
      }
      if (!formData.price || parseFloat(formData.price) <= 0) {
        throw new Error('Geçerli bir fiyat girin');
      }
      if (!formData.stock || parseInt(formData.stock) < 0) {
        throw new Error('Geçerli bir stok miktarı girin');
      }

      // Simüle edilmiş başarılı kayıt
      console.log('Ürün Verileri:', {
        ...formData,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock),
        addedAt: new Date().toLocaleString('tr-TR'),
      });

      setSuccess(true);
      setFormData({
        name: '',
        description: '',
        price: '',
        stock: '',
        category: 'marketplace',
        image: '',
      });

      // 2 saniye sonra başarı mesajını gizle
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700 sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-white">Yeni Ürün Ekle</h1>
            <Link href="/admin" className="text-amber-400 hover:text-amber-300 transition">
              ← Admin Panel
            </Link>
          </div>
        </div>
      </div>

      {/* Form Container */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-gray-800 rounded-lg border border-gray-700 p-8">
          {/* Success Message */}
          {success && (
            <div className="mb-6 bg-green-900 border border-green-700 text-green-100 px-4 py-3 rounded-lg">
              ✓ Ürün başarıyla eklendi!
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mb-6 bg-red-900 border border-red-700 text-red-100 px-4 py-3 rounded-lg">
              ✗ {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Ürün Adı */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Ürün Adı *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Örn: iPhone 15 Pro"
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 text-white rounded-lg focus:border-amber-500 focus:outline-none placeholder-gray-500"
                required
              />
            </div>

            {/* Açıklama */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Açıklama
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Ürün hakkında detaylı açıklama..."
                rows={4}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 text-white rounded-lg focus:border-amber-500 focus:outline-none placeholder-gray-500 resize-none"
              />
            </div>

            {/* Fiyat ve Stok */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Fiyat */}
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Fiyat (₺) *
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="9999.99"
                  step="0.01"
                  min="0"
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 text-white rounded-lg focus:border-amber-500 focus:outline-none placeholder-gray-500"
                  required
                />
              </div>

              {/* Stok */}
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Stok Miktarı *
                </label>
                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  placeholder="0"
                  min="0"
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 text-white rounded-lg focus:border-amber-500 focus:outline-none placeholder-gray-500"
                  required
                />
              </div>
            </div>

            {/* Kategori */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Kategori *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 text-white rounded-lg focus:border-amber-500 focus:outline-none"
              >
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.icon} {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Resim URL */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Ürün Resmi URL
              </label>
              <input
                type="url"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 text-white rounded-lg focus:border-amber-500 focus:outline-none placeholder-gray-500"
              />
              {formData.image && (
                <div className="mt-4">
                  <p className="text-sm text-gray-400 mb-2">Önizleme:</p>
                  <img
                    src={formData.image}
                    alt="Ürün"
                    className="max-w-xs h-40 object-cover rounded-lg border border-gray-600"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        'https://via.placeholder.com/300?text=Hata';
                    }}
                  />
                </div>
              )}
            </div>

            {/* Form Buttons */}
            <div className="flex gap-4 pt-6">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-amber-500 hover:bg-amber-600 disabled:bg-gray-600 text-white font-bold py-3 px-4 rounded-lg transition"
              >
                {loading ? 'Kaydediliyor...' : '✓ Ürünü Ekle'}
              </button>
              <Link href="/admin" className="flex-1">
                <button
                  type="button"
                  className="w-full bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-4 rounded-lg transition"
                >
                  ← İptal
                </button>
              </Link>
            </div>

            {/* Info */}
            <div className="bg-blue-900 border border-blue-700 text-blue-100 px-4 py-3 rounded-lg text-sm">
              💡 <strong>Not:</strong> Form geçerli verilerin doğru girildiğinden emin olun. Veritabanı entegrasyonu ilerde eklenecek.
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}