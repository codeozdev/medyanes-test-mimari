# Server Side & Client Side Rendering
Next.js uygulamalarında, tüm sayfayı 'use client' ile işaretlemek yerine, yalnızca client-side işlevsellik gerektiren componentler ayrı .jsx/.tsx dosyalarına ayırmak ve bu componentleri server-side olarak kalan ana sayfaya import etmek daha verimli bir mimari yaklaşımdır. Bu yöntem, gereksiz JavaScript'in istemciye gönderilmesini önler, server-side rendering avantajlarını korur ve uygulamanın performansını iyileştirir.
Next.js tavsiye edilen yöntem olabildiğince client-side işlevselliği kullanmak yerine, server-side işlevselliği kullanmaktır.

# Not
- Bir veriyi fetch ile sayfa içerisinde çekmek yerine, ayrı bir component içerisinde çekmek daha sonra bu veriyi gerekli sayfaya import etmek daha mantıklıdır.
- Giriş yapmadan kullanılabilecek sayfalar route gruplandırma ile giriş yapılması gereken sayfalardan ayrılacak

# Ölçeklenebilen Klasör Yapısı
(Integrated Feature-Based Architecture) çoğu orta ve büyük ölçekli Next.js projesi için ideal bir seçimdir. Şu sebeplerden dolayı bu yapıyı kullanmanızı öneriyorum:
Ölçeklenebilirlik: Projeniz büyüdükçe her özellik kendi sınırları içinde tutulur, böylece kodun bakımı ve genişletilmesi daha kolay olur.
App Router Uyumlu: Next.js'in modern App Router yapısıyla tam uyumlu çalışır.
Temiz Arayüzler: Her özellik modülü kendi içerisinde mantıklı bir şekilde organize edilmiş ve dışa açık arayüzlerini net bir şekilde tanımlamış.
Server/Client Ayrımı: Client tarafında çalışacak bileşenlerin açıkça belirtilmesi, performans optimizasyonu ve hata yönetimi açısından büyük avantaj sağlar.
Ekibiniz küçükse veya Next.js'e yeni başlıyorsanız, başlangıçta tam olarak bu karmaşıklıkta bir yapı kurmayabilirsiniz, ancak bu yönde ilerlemek ve zamanla bu yapıya geçmek mantıklı olacaktır.
/app           # Sayfa ve rotalar
/features      # İş mantığı ve özellik bileşenleri 
/components    # Genel/paylaşılan UI bileşenleri
/lib           # Yardımcı araçlar ve konfigürasyon
/public        # Statik dosyalar


# NOTLAR
- "use client" kullandığımız componenetlerin sonuna .client.jsx yazabiliriz. (okunurluluğu artırmak amaçıyla)
- container yapısı iptal oldu sayfaların içi bomboş olduğu için kendileri bir nevi container görevi görüyor



# Gemini
Anladım, şimdi mimarinin kendisini, yani bu yapılandırmanın temsil ettiği **mimari deseni (architectural pattern)** açıklayan bir yazı istiyorsunuz. Harika!

---

**Mimari Yaklaşım: Entegre Özellik Tabanlı Modüler Mimari (Integrated Feature-Based Modular Architecture)**

Projemizde benimsenen mimari yapı, modern web uygulamaları geliştirmede sıklıkla tercih edilen **Özellik Tabanlı Mimari (Feature-Based Architecture)** deseninin, Next.js App Router'ın getirdiği full-stack yeteneklerle **entegre edilmiş** ve **modülerliği** ön plana çıkaran bir uygulamasıdır.

**1. Temel Desen: Özellik Tabanlı Mimari**

Bu mimarinin temelinde, kodu teknik katmanlara (Model-View-Controller gibi) veya dosya türlerine (components, services, utils) göre ayırmak yerine, uygulamanın **işlevsel özelliklerine (features)** veya **iş alanlarına (business domains)** göre organize etme fikri yatar. Örneğin, bir e-ticaret uygulamasında "ürünler", "siparişler", "kullanıcı kimlik doğrulaması", "ödeme" gibi birimler ayrı birer özellik olarak ele alınır.

Bu yaklaşımın ana hedefleri şunlardır:

* **Modülerlik:** Her özellik, kendi içinde mümkün olduğunca bağımsız bir birim (modül) olarak geliştirilir.
* **Ölçeklenebilirlik:** Yeni özellikler eklemek veya mevcutları değiştirmek, diğer özellikleri minimum düzeyde etkileyerek daha kolay hale gelir.
* **Bakım Kolaylığı:** Belirli bir özellikle ilgili tüm kodlar bir arada bulunduğu için (yüksek cohesion), hata ayıklama ve güncelleme kolaylaşır.
* **Takım Özerkliği:** Farklı ekipler veya geliştiriciler, farklı özellikler üzerinde daha bağımsız ve paralel çalışabilir.
* **İş Alanı Odaklılık:** Kod organizasyonu, teknik detaylardan ziyade uygulamanın hizmet ettiği iş alanlarını yansıtır (Domain-Driven Design prensipleriyle uyumludur).

**2. Bizim Uygulamamız: "Entegre" Yaklaşım**

Projemizdeki yapı, genel Özellik Tabanlı Mimari prensiplerini almakla kalmaz, aynı zamanda Next.js'in (özellikle App Router'ın) sağladığı olanaklarla bunu bir adım öteye taşır:

* **Entegrasyon:** Sadece UI bileşenlerini değil, aynı zamanda o özelliğe ait **sunucu tarafı mantığını** (Server Actions, veri erişim fonksiyonları - data access) da aynı özellik klasörü (`features/*`) içinde barındırır. Bu, Next.js'in full-stack yeteneklerini kullanarak frontend ve backend kodunu özelliğin bağlamında bir araya getirir.
* **Birlikte Konumlandırma (Co-location):** Bir özellikle ilgili UI (`components/`), sunucu mantığı (`servers/`), tipler (`types.ts`), özellik içi paylaşılan kodlar (`lib/`) gibi tüm unsurlar fiziksel olarak birbirine yakın tutulur. Bu, geliştiricinin bağlamı kaybetmeden çalışmasını kolaylaştırır.
* **Net Sorumluluk Katmanları (Hem Global Hem Özellik İçi):**
    * **Global Katmanlar:** `components` (global UI), `lib` (global yardımcılar) gibi klasörler, tüm uygulama tarafından paylaşılan kodları barındırır.
    * **Özellik İçi Katmanlar:** Her özellik klasörü içinde de `components` (özelliğe özel UI), `servers` (özelliğe özel backend), `lib` (özellik içi paylaşılan) gibi mantıksal katmanlar bulunur.

**3. Geleneksel Yaklaşımlardan Farkı**

Geleneksel katmanlı mimarilerde (örn: MVC), bir özellik eklemek genellikle Model, View ve Controller katmanlarındaki farklı klasörlere dokunmayı gerektirir. Bizim yaklaşımımızda ise yeni bir özellik eklemek, büyük ölçüde yeni bir `features/` alt klasörü oluşturmak ve ilgili kodları bu klasör içine yerleştirmek anlamına gelir, bu da daha yüksek modülerlik sağlar.

**4. Sonuç**

Kullandığımız mimari, **Özellik Tabanlı Mimari**'nin temel prensiplerini benimseyen, Next.js App Router'ın full-stack yetenekleriyle **entegre edilmiş**, **modüler**, **birlikte konumlandırmayı (co-location)** teşvik eden ve **katmanlı sorumlulukları** (hem global hem özellik bazında) gözeten modern bir yaklaşımdır. Bu yapı, özellikle bizim gibi full-stack Next.js projeleri geliştiren ekipler için ölçeklenebilirlik, bakım kolaylığı ve geliştirme hızı açısından önemli avantajlar sunmaktadır.