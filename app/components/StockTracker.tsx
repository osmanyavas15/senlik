'use client';

import { useEffect, useState } from 'react';

interface Stock {
  id: string;
  name: string;
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
}

export default function StockTracker() {
  const [stocks, setStocks] = useState<Stock[]>([
    // Uluslararası
    { id: '1', name: 'Altın', symbol: 'XAU/USD', price: 2045.50, change: 12.30, changePercent: 0.61 },
    { id: '2', name: 'Bitcoin', symbol: 'BTC/USD', price: 42150.00, change: 850.00, changePercent: 2.06 },

    // BIST Bankacılık
    { id: '3', name: 'Garanti Bankası', symbol: 'GARAN', price: 2.15, change: 0.05, changePercent: 2.38 },
    { id: '4', name: 'Akbank', symbol: 'AKBNK', price: 8.90, change: -0.15, changePercent: -1.65 },
    { id: '5', name: 'İş Bankası', symbol: 'ISCTR', price: 45.20, change: 0.80, changePercent: 1.80 },
    { id: '6', name: 'Halk Bankası', symbol: 'HALKB', price: 18.50, change: -0.30, changePercent: -1.59 },

    // BIST Telekom
    { id: '7', name: 'Türk Telekom', symbol: 'TTELECOM', price: 55.50, change: 1.20, changePercent: 2.21 },
    { id: '8', name: 'Vodafone', symbol: 'VODAFONE', price: 8.75, change: 0.10, changePercent: 1.16 },

    // BIST Enerji
    { id: '9', name: 'Türkiye Petrolleri', symbol: 'TUPRS', price: 128.00, change: 2.50, changePercent: 1.99 },
    { id: '10', name: 'Aksa Enerji', symbol: 'AKSA', price: 23.80, change: -0.50, changePercent: -2.06 },

    // BIST Perakende
    { id: '11', name: 'Migros', symbol: 'MGROS', price: 184.50, change: 3.20, changePercent: 1.76 },
    { id: '12', name: 'Tesco Kipa', symbol: 'KIPA', price: 42.00, change: -1.00, changePercent: -2.33 },
  ]);

  return (
    <div className="bg-slate-800 rounded-lg p-6 mb-8">
      <h2 className="text-2xl font-bold text-white mb-6">📈 Günlük Borsa Takibi (BIST)</h2>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-700">
            <tr>
              <th className="px-4 py-3 text-left text-gray-300">Hisse</th>
              <th className="px-4 py-3 text-left text-gray-300">Sembol</th>
              <th className="px-4 py-3 text-right text-gray-300">Fiyat</th>
              <th className="px-4 py-3 text-right text-gray-300">Değişim</th>
              <th className="px-4 py-3 text-right text-gray-300">%</th>
            </tr>
          </thead>
          <tbody>
            {stocks.map((stock) => (
              <tr key={stock.id} className="border-b border-slate-700 hover:bg-slate-700/50">
                <td className="px-4 py-3 text-white font-medium">{stock.name}</td>
                <td className="px-4 py-3 text-gray-400">{stock.symbol}</td>
                <td className="px-4 py-3 text-right text-white">₺{stock.price.toFixed(2)}</td>
                <td className={`px-4 py-3 text-right ${stock.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)}
                </td>
                <td className={`px-4 py-3 text-right font-bold ${stock.changePercent >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {stock.changePercent >= 0 ? '+' : ''}{stock.changePercent}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}