'use client';

import Link from 'next/link';
import { useState } from 'react';

interface Service {
  id: string;
  name: string;
  icon: string;
  subCategories: string[];
  options?: { [key: string]: string[] };
}

export default function Services() {
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState('');
  const [selectedOption, setSelectedOption] = useState('');

  const WHATSAPP_NUMBER = '905467463931';

  const services: Service[] = [
    {
      id: 'ozel-ders',
      name: 'Özel Ders',
      icon: '📚',
      subCategories: ['Matematik', 'Fizik', 'Kimya', 'Biyoloji', 'İngilizce', 'Türkçe', 'Tarih', 'Coğrafya', 'Almanca', 'Fransızca'],
      options: {
        'default': ['İlkokul', 'Ortaokul', 'Lise', 'Üniversite', 'YKS Hazırlık', 'LGS Hazırlık'],
      },
    },
    {
      id: 'temizlik',
      name: 'Temizlik',
      icon: '🧹',
      subCategories: ['Ev Temizliği', 'Ofis Temizliği', 'Cam Temizliği', 'Halı Yıkama', 'Koltuk Yıkama', 'İnşaat Sonrası', 'Dış Cephe', 'Genel Temizlik'],
    },
    {
      id: 'teknik',
      name: 'Teknik Servis',
      icon: '🔧',
      subCategories: ['Elektrik', 'Su Tesisatı', 'Kombi', 'Klima', 'Beyaz Eşya', 'Televizyon', 'Bilgisayar', 'Telefon Tamiri'],
    },
    {
      id: 'nakliyat',
      name: 'Nakliyat',
      icon: '🚚',
      subCategories: ['Ev Taşıma', 'Ofis Taşıma', 'Şehirlerarası', 'Eşya Depolama', 'Parça Eşya', 'Asansörlü Taşıma', 'Paketleme', 'Montaj'],
    },
    {
      id: 'tadilat',
      name: 'Tadilat & Dekorasyon',
      icon: '🔨',
      subCategories: ['Boya Badana', 'Fayans', 'Parke', 'Alçıpan', 'Mutfak Dolabı', 'Banyo Yenileme', 'Dekorasyon', 'Genel Tadilat'],
    },
    {
      id: 'guzellik',
      name: 'Güzellik & Bakım',
      icon: '💇',
      subCategories: ['Kuaför', 'Berber', 'Manikür Pedikür', 'Cilt Bakımı', 'Makyaj', 'Masaj', 'Ağda', 'Kaş Tasarımı'],
    },
    {
      id: 'saglik',
      name: 'Sağlık',
      icon: '🏥',
      subCategories: ['Evde Hasta Bakımı', 'Fizyoterapi', 'Diyetisyen', 'Psikolog', 'Hemşire', 'Yaşlı Bakımı', 'Bebek Bakımı', 'Refakatçi'],
    },
    {
      id: 'egitim',
      name: 'Eğitim & Kurs',
      icon: '🎓',
      subCategories: ['Müzik Dersi', 'Resim Dersi', 'Dans Kursu', 'Yüzme', 'Spor Antrenörü', 'Yoga', 'Kodlama', 'Sürücü Kursu'],
    },
    {
      id: 'organizasyon',
      name: 'Organizasyon',
      icon: '🎉',
      subCategories: ['Düğün', 'Nişan', 'Doğum Günü', 'Kına Gecesi', 'Baby Shower', 'Mezuniyet', 'Kurumsal Etkinlik', 'Parti'],
    },
    {
      id: 'oto',
      name: 'Oto Hizmetleri',
      icon: '🚗',
      subCategories: ['Oto Yıkama', 'Lastik Değişimi', 'Yağ Değişimi', 'Oto Tamir', 'Oto Elektrik', 'Kaporta Boya', 'Cam Değişimi', 'Detaylı Temizlik'],
    },
    {
      id: 'bahce',
      name: 'Bahçe & Peyzaj',
      icon: '🌳',
      subCategories: ['Çim Biçme', 'Ağaç Budama', 'Peyzaj Tasarım', 'Sulama Sistemi', 'Bahçe Bakımı', 'Çiçek Dikimi', 'Havuz Bakımı', 'Sera Kurulumu'],
    },
    {
      id: 'hukuk',
      name: 'Hukuki Danışmanlık',
      icon: '⚖️',
      subCategories: ['Boşanma', 'İş Hukuku', 'Ceza Hukuku', 'Ticaret Hukuku', 'Gayrimenkul', 'Miras', 'Tazminat', 'Sözleşme'],
    },
    {
      id: 'muhasebe',
      name: 'Muhasebe & Finans',
      icon: '💰',
      subCategories: ['Vergi Danışmanlığı', 'Muhasebe', 'Bordro', 'Şirket Kuruluşu', 'Mali Müşavir', 'Finansal Danışman', 'Beyanname', 'Denetim'],
    },
    {
      id: 'yazilim',
      name: 'Yazılım & Web',
      icon: '💻',
      subCategories: ['Web Sitesi', 'Mobil Uygulama', 'E-Ticaret', 'SEO', 'Grafik Tasarım', 'Logo Tasarım', 'Sosyal Medya', 'Dijital Pazarlama'],
    },
    {
      id: 'cocuk',
      name: 'Çocuk Hizmetleri',
      icon: '👶',
      subCategories: ['Bebek Bakıcısı', 'Çocuk Etkinlik', 'Doğum Günü Animasyon', 'Çocuk Fotoğrafçısı', 'Palyaço', 'Yüz Boyama', 'Balon Süsleme', 'Çocuk Eğitmeni'],
    },
    {
      id: 'ev-yemek',
      name: 'Ev Yemeği & Catering',
      icon: '🍲',
      subCategories: ['Günlük Yemek', 'Davet Yemeği', 'Catering', 'Pasta Sipariş', 'Kına Yemeği', 'Kurumsal Yemek', 'Diyet Yemek', 'Özel Menü'],
    },
    {
      id: 'guvenlik',
      name: 'Güvenlik',
      icon: '🔒',
      subCategories: ['Kamera Sistemi', 'Alarm Sistemi', 'Özel Güvenlik', 'Kapı Kilidi', 'Kasa', 'Interkom', 'Bariyer', 'Bekçi Hizmeti'],
    },
    {
      id: 'fotograf',
      name: 'Fotoğraf & Video',
      icon: '📸',
      subCategories: ['Düğün Çekimi', 'Nişan Çekimi', 'Bebek Çekimi', 'Ürün Fotoğrafı', 'Drone Çekimi', 'Klip Çekimi', 'Vesikalık', 'Aile Çekimi'],
    },
    {
      id: 'evcil',
      name: 'Evcil Hayvan',
      icon: '🐾',
      subCategories: ['Veteriner', 'Pet Kuaför', 'Köpek Eğitimi', 'Pet Otel', 'Pet Taksi', 'Hayvan Bakıcısı', 'Aşılama', 'Tırnak Kesimi'],
    },
    {
      id: 'danismanlik',
      name: 'Danışmanlık',
      icon: '💼',
      subCategories: ['İş Kurma', 'Kariyer', 'Emlak', 'Sigorta', 'Yatırım', 'İhracat', 'Franchise', 'Marka Danışmanlığı'],
    },
  ];

  const handleServiceSelect = (service: Service) => {
    setSelectedService(service);
    setStep(2);
  };

  const handleSubCategorySelect = (subCategory: string) => {
    setSelectedSubCategory(subCategory);
    if (selectedService?.options) {
      setStep(3);
    } else {
      setStep(4);
    }
  };

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
    setStep(4);
  };

  const handleWhatsAppContact = () => {
    let message = `Merhaba, ${selectedService?.name}`;
    if (selectedSubCategory) message += ` - ${selectedSubCategory}`;
    if (selectedOption) message += ` (${selectedOption})`;
    message += ` hizmeti hakkında yardımcı olur musunuz?`;

    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const resetSelection = () => {
    setStep(1);
    setSelectedService(null);
    setSelectedSubCategory('');
    setSelectedOption('');
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
            {[1, 2, 3, 4].map((s) => (
              <div key={s} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                  step >= s ? 'bg-amber-500 text-white' : 'bg-gray-700 text-gray-400'
                }`}>
                  {s}
                </div>
                {s < 4 && <div className={`w-16 h-1 ${step > s ? 'bg-amber-500' : 'bg-gray-700'}`} />}
              </div>
            ))}
          </div>
          <div className="text-center mt-4 text-gray-400 text-sm">
            {step === 1 && 'Hizmet Seçin'}
            {step === 2 && 'Alt Kategori Seçin'}
            {step === 3 && 'Detay Seçin'}
            {step === 4 && 'İletişime Geçin'}
          </div>
        </div>

        {/* STEP 1: Services */}
        {step === 1 && (
          <div>
            <h1 className="text-4xl font-bold text-white mb-2 text-center">🔧 Hizmetler</h1>
            <p className="text-gray-300 text-center mb-12">Hangi hizmete ihtiyacınız var?</p>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {services.map((service) => (
                <button
                  key={service.id}
                  onClick={() => handleServiceSelect(service)}
                  className="bg-gray-800 hover:bg-gray-700 border-2 border-gray-700 hover:border-amber-500 rounded-xl p-6 transition-all hover:scale-105"
                >
                  <div className="text-4xl mb-3">{service.icon}</div>
                  <p className="text-white font-semibold text-sm">{service.name}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 2: Sub Categories */}
        {step === 2 && selectedService && (
          <div className="max-w-4xl mx-auto text-center">
            <div className="text-6xl mb-6">{selectedService.icon}</div>
            <h2 className="text-3xl font-bold text-white mb-2">{selectedService.name}</h2>
            <p className="text-gray-300 mb-12">Hangi alanda hizmet istiyorsunuz?</p>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {selectedService.subCategories.map((sub) => (
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
              ← Hizmetlere Dön
            </button>
          </div>
        )}

        {/* STEP 3: Options (Sadece Özel Ders için seviye) */}
        {step === 3 && selectedService?.options && (
          <div className="max-w-3xl mx-auto text-center">
            <div className="text-6xl mb-6">{selectedService.icon}</div>
            <h2 className="text-3xl font-bold text-white mb-2">{selectedSubCategory}</h2>
            <p className="text-gray-300 mb-12">Seviye/Detay seçin</p>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {selectedService.options.default.map((option) => (
                <button
                  key={option}
                  onClick={() => handleOptionSelect(option)}
                  className="bg-gray-800 hover:bg-amber-500 border-2 border-gray-700 hover:border-amber-500 rounded-lg py-6 px-4 text-white font-semibold transition-all hover:scale-105"
                >
                  {option}
                </button>
              ))}
            </div>

            <button onClick={resetSelection} className="mt-8 text-amber-400 hover:text-amber-500">
              ← Başa Dön
            </button>
          </div>
        )}

        {/* STEP 4: WhatsApp Contact */}
        {step === 4 && selectedService && (
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-12 border-2 border-green-500 shadow-2xl">
              <div className="text-6xl mb-6">✅</div>
              <h2 className="text-3xl font-bold text-white mb-6">Talebiniz Hazır!</h2>

              <div className="bg-gray-700 rounded-lg p-6 mb-8 text-left">
                <h3 className="text-amber-400 font-bold mb-4">Seçtikleriniz:</h3>
                <div className="space-y-2 text-white">
                  <p><span className="text-gray-400">Hizmet:</span> {selectedService.icon} {selectedService.name}</p>
                  {selectedSubCategory && <p><span className="text-gray-400">Alan:</span> {selectedSubCategory}</p>}
                  {selectedOption && <p><span className="text-gray-400">Detay:</span> {selectedOption}</p>}
                </div>
              </div>

              <p className="text-gray-300 mb-8 text-lg">
                Seçtiğiniz <span className="text-amber-400 font-bold">{selectedSubCategory} {selectedService.name}</span> hizmeti için
                uzman ekibimizden hemen yardım alın!
              </p>

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
                ← Yeni Talep Oluştur
              </button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}