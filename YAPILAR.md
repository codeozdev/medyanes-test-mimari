# Skeleton
- marketing/page.jsx -> shadcn/ui skeleton kullanıyor. Gelen veri yüklenene kadar skeleton gösteriliyor.
- Sabit sayıda (örneğin 6) skeleton kullanmak yerine, gerçek ürün sayısını (PRODUCTS_TO_SHOW) skeleton sayısına aktaran dinamik bir yapı kullandık. Böylece gelecekte gösterilecek ürün sayısı değiştiğinde, skeleton sayısı da otomatik olarak uyum sağlayacak."
- Skeleton bileşeni, gerçek içeriği tam olarak taklit etmek için aynı CSS yapısını ve yerleşimi kullanmalıdır. Skeleton'un amacı, henüz yüklenmemiş içeriğin görsel yerini tutmaktır, bu nedenle boyutlar, boşluklar ve yerleşim gerçek bileşenle aynı olmalıdır. Böylece içerik yüklendiğinde sayfa düzeni bozulmadan sorunsuz bir geçiş sağlanır
- "Başlık, buton gibi statik öğelerin skeleton göstermeden hemen yüklenmesi gerekir. Bu nedenle, sayfa yapısını veri gerektiren dinamik kısımları (Suspense içinde) ve statik kısımları (Suspense dışında) olacak şekilde ayırmalıyız. Böylece kullanıcı sayfaya girdiğinde statik içeriği hemen görür, sadece veri çekilen bölüm için bekleme durumu (skeleton) gösterilir.
- Ayrıca skeleton yapacağımız div'lere sabit bir değer verirsek birebir aynı olmuş olur ve veri yüklendikten sonra kayma gibi durum olmaz











