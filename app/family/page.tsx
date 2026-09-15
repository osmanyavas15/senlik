'use client';

import Link from 'next/link';
import { useState } from 'react';

interface FamilyCategory {
  id: string;
  name: string;
  icon: string;
  subCategories: string[];
}

export default function Family() {
  const [step, setStep] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<FamilyCategory | null>(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState('');

  const WHATSAPP_NUMBER = '905467463931';

  const categories: FamilyCategory[] = [
    { id: 'ev-bakim', name: 'Ev Bakımı', icon: '🏠', subCategories: ['Genel Temizlik', 'Derin Temizlik', 'Cam Silme', 'Ütü', 'Çamaşır', 'Bulaşık', 'Düzenleme', 'Dezenfeksiyon'] },
    { id: 'cocuk-bakim', name: 'Çocuk Bakımı', icon: '👶', subCategories: ['Bebek Bakıcısı', 'Çocuk Bakıcısı', 'Gündüz Bakımı', 'Gece Bakımı', 'Ödev Yardımı', 'Oyun Arkadaşı', 'Okul Servisi', 'Etkinlik'] },
    { id: 'yasli-bakim', name: 'Yaşlı Bakımı', icon: '👴', subCategories: ['Evde Bakım', 'Refakatçi', 'Hasta Bakımı', 'İlaç Takibi', 'Yemek Yardımı', 'Alışveriş', 'Doktor Randevu', 'Sosyal Aktivite'] },
    { id: 'yemek', name: 'Ev Yemeği', icon: '🍲', subCategories: ['Günlük Yemek', 'Haftalık Menü', 'Diyet Yemek', 'Bebek Maması', 'Davet Yemeği', 'Pasta Börek', 'Kahvaltı', 'Özel Gün'] },
    { id: 'bahce', name: 'Bahçe Bakımı', icon: '🌳', subCategories: ['Çim Biçme', 'Çiçek Bakımı', 'Ağaç Budama', 'Sulama', 'Gübreleme', 'Peyzaj', 'İlaçlama', 'Sebze Bahçesi'] },
    { id: 'evcil', name: 'Evcil Hayvan', icon: '🐾', subCategories: ['Köpek Gezdirme', 'Kedi Bakımı', 'Pet Sitting', 'Beslenme', 'Tımar', 'Veteriner', 'Eğitim', 'Pet Otel'] },
    { id: 'tamir', name: 'Ev Tamiri', icon: '🔧', subCategories: ['Musluk Tamiri', 'Priz Tamiri', 'Kapı Kilit', 'Menteşe', 'Raf Montaj', 'Perde Montaj', 'Ampul', 'Küçük Tamir'] },
    { id: 'organizasyon', name: 'Ev Organizasyonu', icon: '📦', subCategories: ['Dolap Düzeni', 'Mutfak Düzeni', 'Depo Düzeni', 'Garaj', 'Kiler', 'Çekmece', 'Kıyafet', 'Genel Düzen'] },
    { id: 'tasima', name: 'Ev Taşıma', icon: '🚚', subCategories: ['Ev Taşıma', 'Eşya Taşıma', 'Paketleme', 'Montaj Demontaj', 'Depolama', 'Asansör', 'Şehir İçi', 'Şehirlerarası'] },
    { id: 'ozel-ders', name: 'Özel Ders', icon: '📚', subCategories: ['Matematik', 'İngilizce', 'Fen', 'Türkçe', 'Müzik', 'Resim', 'Kodlama', 'Ödev Takibi'] },
    { id: 'saglik', name: 'Evde Sağlık', icon: '🏥', subCategories: ['Hemşire', 'Fizyoterapi', 'Enjeksiyon', 'Serum', 'Pansuman', 'Tansiyon', 'Şeker Ölçüm', 'Bakım'] },
    { id: 'guzellik', name: 'Evde Güzellik', icon: '💇', subCategories: ['Kuaför', 'Manikür Pedikür', 'Cilt Bakımı', 'Ağda', 'Makyaj', 'Masaj', 'Saç Boyama', 'Kaş Alma'] },
    { id: 'dekorasyon', name: 'Ev Dekorasyon', icon: '🎨', subCategories: ['İç Mimari', 'Renk Danışmanlığı', 'Mobilya Seçimi', 'Aydınlatma', 'Duvar Kağıdı', 'Perde', 'Aksesuar', 'Feng Shui'] },
    { id: 'boya', name: 'Boya Badana', icon: '🖌️', subCategories: ['İç Cephe', 'Dış Cephe', 'Tavan', 'Duvar', 'Kapı Pencere', 'Dekoratif', 'Alçı', 'Sıva'] },
    { id: 'temizlik-ozel', name: 'Özel Temizlik', icon: '✨', subCategories: ['Koltuk Yıkama', 'Halı Yıkama', 'Yorgan Yıkama', 'Perde Yıkama', 'Cam Cephe', 'İnşaat Sonrası', 'Buharlı', 'Antibakteriyel'] },
    { id: 'guvenlik', name: 'Ev Güvenliği', icon: '🔒', subCategories: ['Kamera', 'Alarm', 'Kapı Kilidi', 'Interkom', 'Kasa', 'Sensör', 'Akıllı Kilit', 'İzleme'] },
    { id: 'akilli-ev', name: 'Akıllı Ev', icon: '🏡', subCategories: ['Akıllı Aydınlatma', 'Termostat', 'Perde Otomasyon', 'Ses Sistemi', 'Kamera', 'Kapı Zili', 'Priz', 'Kurulum'] },
    { id: 'ilaclama', name: 'İlaçlama', icon: '🐜', subCategories: ['Böcek İlaçlama', 'Fare', 'Hamam Böceği', 'Karınca', 'Kene', 'Güve', 'Örümcek', 'Genel İlaçlama'] },
    { id: 'nakliye-ozel', name: 'Özel Taşıma', icon: '📦', subCategories: ['Beyaz Eşya', 'Mobilya', 'Piyano', 'Kasa', 'Sanat Eseri', 'Hassas Eşya', 'Ofis', 'Tek Parça'] },
    { id: 'kisisel-asistan', name: 'Kişisel Asistan', icon: '👔', subCategories: ['Alışveriş', 'Fatura Ödeme', 'Randevu Alma', 'Kargo Takip', 'Resmi İşlemler', 'Rezervasyon', 'Organizasyon', 'Genel Yardım'] },
  ];

  const handleCategorySelect = (category: FamilyCategory) => {
    setSelectedCategory(category);
    setStep(2);
  };

  const handleSubCategorySelect = (subCategory: string) => {
    setSelectedSubCategory(subCategory);
    setStep(3);
  };

  const handleWhatsAppContact = () => {
    let message = `Merhaba, ${selectedCategory?.name}`;
    if (selectedSubCategory) message += ` - ${selectedSubCategory}`;
    message += ` hizmeti hakkında yardımcı olur musunuz?`;

    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const resetSelection = () => {
    setStep(1);
    setSelectedCategory(null);
    setSelectedSubCategory('');
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
        <div className="mb-12">
          <div className="flex justify-between items-center max-w-md mx-auto">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                  step >= s ? 'bg-amber-500 text-white' : 'bg-gray-700 text-gray-400'
                }`}>
                  {s}
                </div>
                {s < 3 && <div className={`w-20 h-1 ${step > s ? 'bg-amber-500' : 'bg-gray-700'}`} />}
              </div>
            ))}
          </div>
          <div className="text-center mt-4 text-gray-400 text-sm">
            {step === 1 && 'Kategori Seçin'}
            {step === 2 && 'Alt Kategori Seçin'}
            {step === 3 && 'İletişime Geçin'}
          </div>
        </div>

        {step === 1 && (
          <div>
            <h1 className="text-4xl font-bold text-white mb-2 text-center">🏠 Aile & Ev</h1>
            <p className="text-gray-300 text-center mb-12">Evinizle ilgili hangi konuda yardıma ihtiyacınız var?</p>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleCategorySelect(category)}
                  className="bg-gray-800 hover:bg-gray-700 border-2 border-gray-700 hover:border-amber-500 rounded-xl p-6 transition-all hover:scale-105"
                >
                  <div className="text-4xl mb-3">{category.icon}</div>
                  <p className="text-white font-semibold text-sm">{category.name}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && selectedCategory && (
          <div className="max-w-4xl mx-auto text-center">
            <div className="text-6xl mb-6">{selectedCategory.icon}</div>
            <h2 className="text-3xl font-bold text-white mb-2">{selectedCategory.name}</h2>
            <p className="text-gray-300 mb-12">Hangi konuda destek istiyorsunuz?</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {selectedCategory.subCategories.map((sub) => (
                <button
                  key={sub}
                  onClick={() => handleSubCategorySelect(sub)}
                  className="bg-gray-800 hover:bg-amber-500 border-2 border-gray-700 hover:border-amber-500 rounded-lg py-6 px-4 text-white font-semibold transition-all hover:scale-105"
                >
                  {sub}
                </button>
              ))}
            </div>
            <button onClick={resetSelection} className="mt-8 text-amber-400 hover:text-amber-500">
              ← Kategorilere Dön
            </button>
          </div>
        )}

        {step === 3 && selectedCategory && (
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-12 border-2 border-green-500 shadow-2xl">
              <div className="text-6xl mb-6">✅</div>
              <h2 className="text-3xl font-bold text-white mb-6">Talebiniz Hazır!</h2>
              <div className="bg-gray-700 rounded-lg p-6 mb-8 text-left">
                <h3 className="text-amber-400 font-bold mb-4">Seçtikleriniz:</h3>
                <div className="space-y-2 text-white">
                  <p><span className="text-gray-400">Kategori:</span> {selectedCategory.icon} {selectedCategory.name}</p>
                  {selectedSubCategory && <p><span className="text-gray-400">Alan:</span> {selectedSubCategory}</p>}
                </div>
              </div>
              <p className="text-gray-300 mb-8 text-lg">
                Seçtiğiniz <span className="text-amber-400 font-bold">{selectedSubCategory}</span> hizmeti için uzman ekibimizden hemen yardım alın!
              </p>
              <button
                onClick={handleWhatsAppContact}
                className="bg-green-500 hover:bg-green-600 text-white font-bold px-12 py-4 rounded-xl transition-all hover:scale-105 text-xl inline-flex items-center gap-3 shadow-lg"
              >
                <span className="text-2xl">📱</span>
                WhatsApp ile İletişime Geç
              </button>
              <p className="text-gray-400 mt-6 text-sm">7/24 ekibimiz size yardımcı olmaya hazır!</p>
              <button onClick={resetSelection} className="mt-8 block mx-auto text-amber-400 hover:text-amber-500">
                ← Yeni Talep Oluştur
              </button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}