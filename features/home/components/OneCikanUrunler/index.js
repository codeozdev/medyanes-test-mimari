import Link from "next/link";
import { Suspense } from "react";
import { FeaturedProductsWrapper, ProductGridSkeleton } from "../..";

// Sayfada kaç ürün gösterileceğini tanımlıyoruz
const PRODUCTS_TO_SHOW = 8;

export default function OneCikanUrunler() {
  return (
    <div className="bg-white py-10">
      <div className="mx-auto max-w-7xl px-6">
        {/* Statik başlık - hemen gösterilir */}
        <div className="mx-auto max-w-2xl lg:text-center">
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Öne Çıkan Ürünler
          </h1>
        </div>

        {/* Dinamik içerik - Suspense ile yükleme gösterilir */}
        <Suspense fallback={<ProductGridSkeleton count={PRODUCTS_TO_SHOW} />}>
          <FeaturedProductsWrapper count={PRODUCTS_TO_SHOW} />
        </Suspense>

        {/* Statik buton - hemen gösterilir */}
        <div className="mt-12 text-center">
          <Link
            href="/products"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700">
            Tüm Ürünleri Gör
          </Link>
        </div>
      </div>
    </div>
  );
}

/*


Suspense mekanizması şöyle çalışır:
- FeaturedProductsWrapper veri çekme işlemi yapıyorsa veya dinamik olarak yükleniyorsa
- Yükleme sırasında Suspense otomatik olarak FeaturedProductsSkeleton'u gösterir
- Veri yükleme tamamlandığında, FeaturedProductsSkeleton kaybolur ve gerçek içerik (FeaturedProductsWrapper) gösterilir

Bu yaklaşım, kullanıcıya yükleme durumunda boş ekran yerine iskelet (skeleton) göstererek daha iyi bir deneyim sağlar.


*/
