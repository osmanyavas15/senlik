'use client';

import Link from 'next/link';
import { useState } from 'react';

interface Category {
  id: string;
  name: string;
  icon: string;
  hasGender?: boolean;
  hasSizes?: boolean;
  sizeType?: 'shoe' | 'clothing' | 'none';
  brands: string[];
}

export default function Marketplace() {
  const [step, setStep] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [selectedGender, setSelectedGender] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');

  const WHATSAPP_NUMBER = '905467463931';

  const categories: Category[] = [
    { id: 'ayakkabi', name: 'Ayakkabı', icon: '👟', hasGender: true, hasSizes: true, sizeType: 'shoe', brands: ['Nike', 'Adidas', 'Puma', 'New Balance', 'Reebok', 'Converse', 'Vans', 'Skechers'] },
    { id: 'giyim', name: 'Giyim', icon: '👕', hasGender: true, hasSizes: true, sizeType: 'clothing', brands: ['Zara', 'H&M', 'Mango', 'LC Waikiki', 'Koton', 'DeFacto', 'Pull&Bear', 'Bershka'] },
    { id: 'elektronik', name: 'Elektronik', icon: '💻', hasGender: false, hasSizes: false, sizeType: 'none', brands: ['Apple', 'Samsung', 'Xiaomi', 'Huawei', 'Lenovo', 'HP', 'Dell', 'Asus'] },
    { id: 'telefon', name: 'Telefon', icon: '📱', hasGender: false, hasSizes: false, sizeType: 'none', brands: ['iPhone', 'Samsung', 'Xiaomi', 'Oppo', 'Vivo', 'Realme', 'Huawei', 'OnePlus'] },
    { id: 'saat', name: 'Saat', icon: '⌚', hasGender: true, hasSizes: false, sizeType: 'none', brands: ['Rolex', 'Casio', 'Fossil', 'Apple Watch', 'Samsung', 'Garmin', 'Seiko', 'Citizen'] },
    { id: 'canta', name: 'Çanta', icon: '👜', hasGender: true, hasSizes: false, sizeType: 'none', brands: ['Louis Vuitton', 'Gucci', 'Michael Kors', 'Guess', 'Zara', 'Mango', 'H&M', 'Fossil'] },
    { id: 'parfum', name: 'Parfüm', icon: '🌸', hasGender: true, hasSizes: false, sizeType: 'none', brands: ['Chanel', 'Dior', 'Gucci', 'Tom Ford', 'Versace', 'YSL', 'Armani', 'Hugo Boss'] },
    { id: 'kozmetik', name: 'Kozmetik', icon: '💄', hasGender: false, hasSizes: false, sizeType: 'none', brands: ['MAC', 'Maybelline', 'L\'Oreal', 'Loreal', 'NYX', 'Fenty', 'Urban Decay', 'Sephora'] },
    { id: 'gaming', name: 'Gaming', icon: '🎮', hasGender: false, hasSizes: false, sizeType: 'none', brands: ['PlayStation', 'Xbox', 'Nintendo', 'Razer', 'Logitech', 'SteelSeries', 'Corsair', 'HyperX'] },
    { id: 'kulaklik', name: 'Kulaklık', icon: '🎧', hasGender: false, hasSizes: false, sizeType: 'none', brands: ['Sony', 'Bose', 'Apple', 'Samsung', 'JBL', 'Sennheiser', 'Beats', 'Anker'] },
    { id: 'spor', name: 'Spor', icon: '⚽', hasGender: true, hasSizes: true, sizeType: 'clothing', brands: ['Nike', 'Adidas', 'Puma', 'Under Armour', 'Reebok', 'Asics', 'New Balance', 'Decathlon'] },
    { id: 'mobilya', name: 'Mobilya', icon: '🛋️', hasGender: false, hasSizes: false, sizeType: 'none', brands: ['IKEA', 'Bellona', 'İstikbal', 'Mondi', 'Doğtaş', 'Kelebek', 'Vivense', 'Enza'] },
    { id: 'mutfak', name: 'Mutfak', icon: '🍳', hasGender: false, hasSizes: false, sizeType: 'none', brands: ['Arçelik', 'Bosch', 'Siemens', 'Tefal', 'Karaca', 'Emsan', 'Fakir', 'Philips'] },
    { id: 'bebek', name: 'Bebek', icon: '👶', hasGender: false, hasSizes: false, sizeType: 'none', brands: ['Pampers', 'Prima', 'Molfix', 'Chicco', 'Bebem', 'Uni Baby', 'Sleepy', 'Huggies'] },
    { id: 'kitap', name: 'Kitap', icon: '📚', hasGender: false, hasSizes: false, sizeType: 'none', brands: ['Can Yayınları', 'YKY', 'İş Bankası', 'Doğan Kitap', 'Everest', 'Pegasus', 'Alfa', 'Kırmızı Kedi'] },
    { id: 'takı', name: 'Takı', icon: '💍', hasGender: true, hasSizes: false, sizeType: 'none', brands: ['Atasay', 'Altınbaş', 'Zen', 'Storks', 'Swarovski', 'Pandora', 'Trendyol', 'Nurçelik'] },
    { id: 'gozluk', name: 'Gözlük', icon: '🕶️', hasGender: true, hasSizes: false, sizeType: 'none', brands: ['Ray-Ban', 'Oakley', 'Gucci', 'Prada', 'Versace', 'Police', 'Emporio Armani', 'Tom Ford'] },
    { id: 'oto', name: 'Oto Aksesuar', icon: '🚗', hasGender: false, hasSizes: false, sizeType: 'none', brands: ['Bosch', 'Michelin', 'Continental', 'Pirelli', 'Castrol', 'Mobil', 'Shell', 'Total'] },
    { id: 'evtekstil', name: 'Ev Tekstil', icon: '🛏️', hasGender: false, hasSizes: false, sizeType: 'none', brands: ['English Home', 'Madame Coco', 'Karaca Home', 'Taç', 'Yataş', 'İpek', 'Özdilek', 'Zucchi'] },
    { id: 'petshop', name: 'Pet Shop', icon: '🐾', hasGender: false, hasSizes: false, sizeType: 'none', brands: ['Royal Canin', 'Pro Plan', 'Whiskas', 'Pedigree', 'Felix', 'Friskies', 'Reflex', 'Brit'] },
  ];

  const shoeSizes = {
    kadin: ['35', '36', '37', '38', '39', '40', '41', '42'],
    erkek: ['38', '39', '40', '41', '42', '43', '44', '45', '46', '47'],
  };

  const clothingSizes = {
    kadin: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    erkek: ['S', 'M', 'L', 'XL', 'XXL', '3XL'],
  };

  const handleCategorySelect = (category: Category) => {
    setSelectedCategory(category);
    if (category.hasGender) {
      setStep(2);
    } else if (category.hasSizes) {
      setStep(3);
    } else {
      setStep(4);
    }
  };

  const handleGenderSelect = (gender: string) => {
    setSelectedGender(gender);
    if (selectedCategory?.hasSizes) {
      setStep(3);
    } else {
      setStep(4);
    }
  };

  const handleSizeSelect = (size: string) => {
    setSelectedSize(size);
    setStep(4);
  };

  const handleBrandSelect = (brand: string) => {
    setSelectedBrand(brand);
    setStep(5);
  };

  const handleWhatsAppContact = () => {
    let message = `Merhaba, ${selectedCategory?.name}`;
    if (selectedGender) message += ` (${selectedGender === 'kadin' ? 'Kadın' : 'Erkek'})`;
    if (selectedSize) message += `, Beden/Numara: ${selectedSize}`;
    if (selectedBrand) message += `, Marka: ${selectedBrand}`;
    message += ` hakkında yardımcı olur musunuz?`;

    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const resetSelection = () => {
    setStep(1);
    setSelectedCategory(null);
    setSelectedGender('');
    setSelectedSize('');
    setSelectedBrand('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      {/* Navigation */}
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
        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex justify-between items-center max-w-2xl mx-auto">
            {[1, 2, 3, 4, 5].map((s) => (
              <div key={s} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                  step >= s ? 'bg-amber-500 text-white' : 'bg-gray-700 text-gray-400'
                }`}>
                  {s}
                </div>
                {s < 5 && <div className={`w-12 h-1 ${step > s ? 'bg-amber-500' : 'bg-gray-700'}`} />}
              </div>
            ))}
          </div>
          <div className="text-center mt-4 text-gray-400 text-sm">
            {step === 1 && 'Kategori Seçin'}
            {step === 2 && 'Cinsiyet Seçin'}
            {step === 3 && 'Beden/Numara Seçin'}
            {step === 4 && 'Marka Seçin'}
            {step === 5 && 'İletişime Geçin'}
          </div>
        </div>

        {/* STEP 1: Categories */}
        {step === 1 && (
          <div>
            <h1 className="text-4xl font-bold text-white mb-2 text-center">🛍️ Pazaryeri</h1>
            <p className="text-gray-300 text-center mb-12">Ne almak istiyorsunuz? Kategori seçin</p>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleCategorySelect(category)}
                  className="bg-gray-800 hover:bg-gray-700 border-2 border-gray-700 hover:border-amber-500 rounded-xl p-6 transition-all hover:scale-105"
                >
                  <div className="text-4xl mb-3">{category.icon}</div>
                  <p className="text-white font-semibold">{category.name}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 2: Gender */}
        {step === 2 && selectedCategory && (
          <div className="max-w-2xl mx-auto text-center">
            <div className="text-6xl mb-6">{selectedCategory.icon}</div>
            <h2 className="text-3xl font-bold text-white mb-2">{selectedCategory.name}</h2>
            <p className="text-gray-300 mb-12">Kimin için arıyorsunuz?</p>

            <div className="grid grid-cols-2 gap-6">
              <button
                onClick={() => handleGenderSelect('kadin')}
                className="bg-pink-600 hover:bg-pink-700 rounded-xl p-12 transition-all hover:scale-105"
              >
                <div className="text-6xl mb-4">👩</div>
                <p className="text-white text-2xl font-bold">Kadın</p>
              </button>

              <button
                onClick={() => handleGenderSelect('erkek')}
                className="bg-blue-600 hover:bg-blue-700 rounded-xl p-12 transition-all hover:scale-105"
              >
                <div className="text-6xl mb-4">👨</div>
                <p className="text-white text-2xl font-bold">Erkek</p>
              </button>
            </div>

            <button onClick={resetSelection} className="mt-8 text-amber-400 hover:text-amber-500">
              ← Kategoriye Dön
            </button>
          </div>
        )}

        {/* STEP 3: Size */}
        {step === 3 && selectedCategory && (
          <div className="max-w-3xl mx-auto text-center">
            <div className="text-6xl mb-6">{selectedCategory.icon}</div>
            <h2 className="text-3xl font-bold text-white mb-2">
              {selectedCategory.name} {selectedGender && `(${selectedGender === 'kadin' ? 'Kadın' : 'Erkek'})`}
            </h2>
            <p className="text-gray-300 mb-12">
              {selectedCategory.sizeType === 'shoe' ? 'Numaranızı seçin' : 'Bedeninizi seçin'}
            </p>

            <div className="grid grid-cols-4 md:grid-cols-6 gap-4">
              {selectedCategory.sizeType === 'shoe' &&
                (selectedGender === 'kadin' ? shoeSizes.kadin : shoeSizes.erkek).map((size) => (
                  <button
                    key={size}
                    onClick={() => handleSizeSelect(size)}
                    className="bg-gray-800 hover:bg-amber-500 border-2 border-gray-700 hover:border-amber-500 rounded-lg py-4 text-white text-xl font-bold transition-all hover:scale-105"
                  >
                    {size}
                  </button>
                ))}

              {selectedCategory.sizeType === 'clothing' &&
                (selectedGender === 'kadin' ? clothingSizes.kadin : clothingSizes.erkek).map((size) => (
                  <button
                    key={size}
                    onClick={() => handleSizeSelect(size)}
                    className="bg-gray-800 hover:bg-amber-500 border-2 border-gray-700 hover:border-amber-500 rounded-lg py-4 text-white text-xl font-bold transition-all hover:scale-105"
                  >
                    {size}
                  </button>
                ))}
            </div>

            <button onClick={resetSelection} className="mt-8 text-amber-400 hover:text-amber-500">
              ← Başa Dön
            </button>
          </div>
        )}

        {/* STEP 4: Brand */}
        {step === 4 && selectedCategory && (
          <div className="max-w-3xl mx-auto text-center">
            <div className="text-6xl mb-6">{selectedCategory.icon}</div>
            <h2 className="text-3xl font-bold text-white mb-2">Marka Seçin</h2>
            <p className="text-gray-300 mb-12">Hangi markayı tercih edersiniz?</p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {selectedCategory.brands.map((brand) => (
                <button
                  key={brand}
                  onClick={() => handleBrandSelect(brand)}
                  className="bg-gray-800 hover:bg-amber-500 border-2 border-gray-700 hover:border-amber-500 rounded-lg py-6 px-4 text-white font-bold transition-all hover:scale-105"
                >
                  {brand}
                </button>
              ))}
            </div>

            <button onClick={resetSelection} className="mt-8 text-amber-400 hover:text-amber-500">
              ← Başa Dön
            </button>
          </div>
        )}

        {/* STEP 5: WhatsApp Contact */}
        {step === 5 && selectedCategory && (
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-12 border-2 border-green-500 shadow-2xl">
              <div className="text-6xl mb-6">✅</div>
              <h2 className="text-3xl font-bold text-white mb-6">Seçiminiz Tamamlandı!</h2>

              {/* Selection Summary */}
              <div className="bg-gray-700 rounded-lg p-6 mb-8 text-left">
                <h3 className="text-amber-400 font-bold mb-4">Seçtikleriniz:</h3>
                <div className="space-y-2 text-white">
                  <p><span className="text-gray-400">Kategori:</span> {selectedCategory.icon} {selectedCategory.name}</p>
                  {selectedGender && <p><span className="text-gray-400">Cinsiyet:</span> {selectedGender === 'kadin' ? 'Kadın' : 'Erkek'}</p>}
                  {selectedSize && <p><span className="text-gray-400">Beden/Numara:</span> {selectedSize}</p>}
                  {selectedBrand && <p><span className="text-gray-400">Marka:</span> {selectedBrand}</p>}
                </div>
              </div>

              <p className="text-gray-300 mb-8 text-lg">
                Seçtiğiniz özelliklerde <span className="text-amber-400 font-bold">{selectedBrand} {selectedCategory.name}</span> için
                uzman ekibimizden hemen yardım alın!
              </p>

              {/* WhatsApp Button */}
              <button
                onClick={handleWhatsAppContact}
                className="bg-green-500 hover:bg-green-600 text-white font-bold px-12 py-4 rounded-xl transition-all hover:scale-105 text-xl inline-flex items-center gap-3 shadow-lg"
              >
                <span className="text-2xl">📱</span>
                WhatsApp ile İletişime Geç
              </button>

              <p className="text-gray-400 mt-6 text-sm">
                7/24 ekibimiz size yardımcı olmaya hazır!
              </p>

              <button onClick={resetSelection} className="mt-8 block mx-auto text-amber-400 hover:text-amber-500">
                ← Yeni Arama Yap
              </button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}