'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Valuables() {
  const [stocks] = useState([
    { id: '1', name: 'Gram Altın', symbol: 'GR-ALTIN', price: 6705.78, change: 78.50, changePercent: 1.17 },
    { id: '2', name: 'Çeyrek Altın', symbol: 'CEYREK', price: 10978.00, change: 128.00, changePercent: 1.18 },
    { id: '3', name: 'Yarım Altın', symbol: 'YARIM', price: 21956.00, change: 256.00, changePercent: 1.18 },
    { id: '4', name: 'Tam Altın', symbol: 'TAM', price: 43912.00, change: 512.00, changePercent: 1.18 },
    { id: '5', name: 'Cumhuriyet Altını', symbol: 'CUMHUR', price: 44800.00, change: 520.00, changePercent: 1.17 },
    { id: '6', name: 'Ons Altın', symbol: 'ONS', price: 4296.68, change: -52.20, changePercent: -1.20 },
    { id: '7', name: 'Gümüş (Gram)', symbol: 'GUMUS', price: 99.04, change: -1.63, changePercent: -1.62 },
    { id: '8', name: 'Dolar', symbol: 'USD', price: 48.62, change: 0.10, changePercent: 0.21 },
    { id: '9', name: 'Euro', symbol: 'EUR', price: 56.21, change: -0.11, changePercent: -0.20 },
    { id: '10', name: 'Sterlin', symbol: 'GBP', price: 64.75, change: 0.15, changePercent: 0.23 },
    { id: '11', name: 'Bitcoin', symbol: 'BTC', price: 78439.60, change: -1195.00, changePercent: -1.50 },
    { id: '12', name: 'Petrol (Varil)', symbol: 'PETROL', price: 107.47, change: 2.85, changePercent: 2.73 },
  ]);

  const WHATSAPP_NUMBER = '905467463931';

  const handleWhatsApp = (name: string) => {
    const message = `Merhaba, ${name} alım/satım işlemi hakkında bilgi almak istiyorum.`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      <nav className="bg-gray-900 border-b border-gray-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
              Senlik
            </Link>
            <Link href="/" className="text-gray-300 hover:text-amber-400">
              ← Ana Sayfa
            </Link>
          </div>
        </div>
      </nav>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-white mb-2 text-center">💎 Değerli Varlıklar</h1>
        <p className="text-gray-300 text-center mb-12">Güncel altın, döviz ve kripto fiyatları</p>

        <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-700">
                <tr>
                  <th className="px-4 py-4 text-left text-gray-300">Varlık</th>
                  <th className="px-4 py-4 text-right text-gray-300">Fiyat (₺)</th>
                  <th className="px-4 py-4 text-right text-gray-300">Değişim</th>
                  <th className="px-4 py-4 text-right text-gray-300">%</th>
                  <th className="px-4 py-4 text-center text-gray-300">İşlem</th>
                </tr>
              </thead>
              <tbody>
                {stocks.map((stock) => (
                  <tr key={stock.id} className="border-b border-gray-700 hover:bg-gray-700/50">
                    <td className="px-4 py-4 text-white font-medium">{stock.name}</td>
                    <td className="px-4 py-4 text-right text-white">₺{stock.price.toLocaleString('tr-TR', { minimumFractionDigits: 2 })}</td>
                    <td className={`px-4 py-4 text-right ${stock.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)}
                    </td>
                    <td className={`px-4 py-4 text-right font-bold ${stock.changePercent >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {stock.changePercent >= 0 ? '+' : ''}{stock.changePercent}%
                    </td>
                    <td className="px-4 py-4 text-center">
                      <button
                        onClick={() => handleWhatsApp(stock.name)}
                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm transition"
                      >
                        📱 İletişim
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <p className="text-gray-400 text-center mt-6 text-sm">
          * Fiyatlar bilgilendirme amaçlıdır. Güncel alım/satım fiyatı için WhatsApp ile iletişime geçin.
        </p>
      </section>
    </div>
  );
}