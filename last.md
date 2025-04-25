my-fullstack-nextjs-app/
├── app/                      # Next.js App Router - Yönlendirme ve temel yerleşimler
│   ├── (marketing)/          # Rota Grubu: Pazarlama/Genel Sayfalar
│   │   ├── layout.jsx        # Pazarlamaya özel layout (örn: farklı Header/Footer)
│   │   ├── page.jsx          # Ana sayfa (/)
│   │   ├── error.js          # Marketing sayfaları için hata işleyici
│   │   ├── loading.js        # Marketing sayfaları için yükleme durumu
│   │   ├── not-found.js      # Marketing sayfaları için bulunamadı durumu
│   │   └── about/
│   │       └── page.jsx      # Hakkımızda (/about)
│   ├── (app)/                # Rota Grubu: Uygulama İçi (Giriş gerektiren)
│   │   ├── layout.jsx        # Uygulama içi ana layout (Header, Sidebar vb. import eder - components/layout'tan)
│   │   ├── error.js          # Uygulama sayfaları için hata işleyici
│   │   ├── loading.js        # Uygulama sayfaları için yükleme durumu
│   │   ├── not-found.js      # Uygulama sayfaları için bulunamadı durumu
│   │   ├── dashboard/
│   │   │   └── page.jsx      # (/dashboard) - features/dashboard'dan ilgili bileşenleri/veriyi kullanır
│   │   ├── products/
│   │   │   ├── page.jsx      # (/products) - features/products'dan ProductList vb. kullanır
│   │   │   ├── loading.js    # Ürünler sayfası için yükleme durumu
│   │   │   ├── error.js      # Ürünler sayfası için hata işleyici
│   │   │   ├── new/
│   │   │   │   └── page.jsx  # (/products/new) - features/products'dan ProductForm kullanır
│   │   │   └── [productId]/
│   │   │       ├── page.jsx  # (/products/123) - features/products'dan ProductDetailsView kullanır
│   │   │       ├── loading.js # Ürün detayı için yükleme durumu
│   │   │       ├── not-found.js # Ürün bulunamadığında gösterilecek sayfa
│   │   │       └── edit/
│   │   │           └── page.jsx # (/products/123/edit) - features/products'dan ProductForm kullanır
│   │   └── ...               # (orders, profile vb. için benzer yapı)
│   ├── api/                  # Harici API'ler veya Webhook'lar için Route Handlers
│   │   └── v1/
│   │       └── ...
|   |__ globals.css           # Temel stiller, Tailwind @layer tanımlamaları vb.
│   ├── layout.jsx            # Kök Layout (<html>, <body>, global context providers, Toaster/Notification sistemi)
│   └── not-found.js          # Global bulunamadı sayfası
│
├── features/                 # ** ANA ÖZELLİK MODÜLLERİ (İş Alanları) **
│   ├── products/             # Ürünler Özelliği
│   │   ├── components/       # Sadece ürünlere özel UI bileşenleri
│   │   │   ├── ProductCard.jsx          # Server Component olabilir
│   │   │   ├── ProductList.jsx          # Server Component olabilir
│   │   │   ├── CreateForm.client.jsx    # Client Component (form etkileşimi için)
│   │   │   ├── EditForm.client.jsx      # Client Component (form etkileşimi için)
│   │   │   └── ProductDetailsView.jsx   # Server Component olabilir
│   │   ├── servers/          # <<-- SERVER GRUPLAMA KLASÖRÜ
│   │   │   ├── actions.js    # Ürünlerle ilgili Server Actions (createProduct, updateProduct, deleteProduct)
│   │   │   └── data-access.js# Ürünler için Prisma sorgularını içeren fonksiyonlar
│   │   ├── utils.js          # (İsteğe bağlı) Sadece ürünlere özel yardımcı fonksiyonlar
│   │   ├── types.ts          # (TypeScript kullanılıyorsa) Ürünlere özel tipler
│   │   └── index.js          # Bu özelliğin dışa aktarılan arayüzü (app/ içinde kullanılacaklar)
│   ├── orders/               # Siparişler Özelliği (products gibi benzer iç yapı)
│   │   ├── components/
│   │   ├── servers/
│   │   │   ├── actions.js
│   │   │   └── data-access.js
│   │   └── index.js
│   ├── auth/                 # Kimlik Doğrulama Özelliği
│   │   ├── components/       # LoginForm.client.jsx, RegisterForm.client.jsx
│   │   ├── servers/
│   │   │   ├── actions.js    # loginAction, registerAction, logoutAction
│   │   │   └── data-access.js
│   │   ├── lib.js            # (İsteğe bağlı) Şifreleme, token işlemleri gibi auth'a özel mantık
│   │   └── index.js
│   ├── dashboard/            # Dashboard Özelliği
│   │   ├── components/
│   │   │   ├── DashboardStats.jsx
│   │   │   ├── RecentActivities.jsx
│   │   │   └── QuickActions.jsx
│   │   ├── servers/
│   │   │   ├── actions.js
│   │   │   └── data-access.js
│   │   └── index.js
│   └── ...                   # Diğer özellikler (profile, cart vb.)
│
├── components/               # ** GLOBAL / PAYLAŞILAN BİLEŞENLER (Özellik Bağımsız) **
│   ├── ui/                   # Temel UI elemanları (Genellikle Client Component veya basit Server Component)
│   │   ├── Button/index.jsx  # (index.jsx içinde Button.jsx olabilir)
│   │   ├── Input/index.jsx
│   │   ├── Modal/index.jsx
│   │   ├── Card/index.jsx
│   │   ├── Spinner/index.jsx
│   │   └── ...
│   ├── layout/               # Uygulama genelinde paylaşılan Layout bileşenleri
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   ├── Sidebar.client.jsx # Genellikle state veya etkileşim içerir
│   │   └── PageWrapper.jsx
│   └── ...
│
├── lib/                      # ** GLOBAL / PAYLAŞILAN Yardımlar & Konfigürasyonlar **
│   ├── prisma.js             # Global Prisma Client instance'ı başlatır ve export eder
│   ├── utils.js              # Uygulama genelinde kullanılan yardımcı fonksiyonlar (tarih, para birimi formatlama vb.)
│   ├── hooks/                # Global custom hook'lar (örn: useMediaQuery.client.js)
│   ├── constants.js          # Uygulama genelindeki sabit değerler (örn: roller, statü kodları)
│   ├── types/                # (TypeScript kullanılıyorsa) Global, paylaşılan tipler
│   ├── auth/                 # (İsteğe bağlı) Eğer auth çok basitse veya core session yönetimi burada olabilir
│   └── config/               # (İsteğe bağlı) Uygulama konfigürasyonları
│
├── prisma/                   # Prisma ORM ile ilgili dosyalar
│   ├── schema.prisma         # Veritabanı şeması (MongoDB için de kullanılır)
│   └── migrations/           # (SQL DB'ler için daha relevant ama klasör kalabilir)
│   └── seed.js               # (İsteğe bağlı) Başlangıç verisi ekleme script'i
│
├── public/                   # Statik dosyalar (resimler, fontlar)
│   ├── images/
│   └── ...
│
├── .env.local                # Ortam değişkenleri (DB bağlantısı, API anahtarları vb.)
├── .eslintrc.json            # ESLint yapılandırması
├── .gitignore
├── next.config.js            # Next.js yapılandırması
├── package.json
├── tailwind.config.js        # Tailwind CSS yapılandırması
└── tsconfig.json             # (TypeScript kullanılıyorsa)