import { fetchProducts } from "@/features/products/servers/actions";

export default async function HomePage() {
  // Ürünleri getir (sadece aktif olanları ve stokta bulunanları)
  const { success, data: products } = await fetchProducts({ stock: "in-stock" });

  // Sadece ilk 6 ürünü göster
  const featuredProducts = success ? products.slice(0, 6) : [];

  return (
    <div className="bg-white">
      {/* Featured Products Section */}
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-blue-600">Ürün Kataloğu</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Öne Çıkan Ürünler
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Sizin için seçtiğimiz en popüler ürünler. Tüm katalog için "Tüm Ürünleri Gör" butonuna
            tıklayın.
          </p>
        </div>

        {/* Product Grid */}
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:mt-20 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {featuredProducts.map((product) => (
            <div key={product.id} className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{product.name}</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {product.category?.name || "Kategorisiz"}
                    </p>
                  </div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    {product.stock > 0 ? "Stokta Var" : "Stokta Yok"}
                  </span>
                </div>
                <p className="mt-3 text-sm text-gray-500 line-clamp-3">{product.description}</p>
                <div className="mt-4 flex justify-between items-center">
                  <p className="text-lg font-medium text-gray-900">
                    {product.price.toLocaleString("tr-TR")} ₺
                  </p>
                  <a
                    href={`/products/${product.id}`}
                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200">
                    Detaylar
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        {featuredProducts.length > 0 && (
          <div className="mt-12 text-center">
            <a
              href="/products"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700">
              Tüm Ürünleri Gör
            </a>
          </div>
        )}

        {/* No Products Message */}
        {featuredProducts.length === 0 && (
          <div className="mt-12 text-center py-12 bg-gray-50 rounded-lg">
            <p className="text-gray-500">Henüz ürün bulunmamaktadır.</p>
          </div>
        )}
      </div>

      {/* Categories Section */}
      <div className="bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-blue-600">Ürün Kategorileri</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              İhtiyacınıza Göre Kategoriler
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              {[
                {
                  title: "Telefon",
                  description: "En son model akıllı telefonlar ve aksesuarlar.",
                  link: "/products?category=Telefon",
                },
                {
                  title: "Laptop",
                  description: "Güçlü ve taşınabilir laptop modelleri.",
                  link: "/products?category=Laptop",
                },
                {
                  title: "Giyim",
                  description: "Moda ve stil sahibi giyim ürünleri.",
                  link: "/products?category=Giyim",
                },
              ].map((category) => (
                <div key={category.title} className="flex flex-col">
                  <dt className="text-base font-semibold leading-7 text-gray-900">
                    {category.title}
                  </dt>
                  <dd className="mt-1 flex flex-auto flex-col text-base leading-7 text-gray-600">
                    <p className="flex-auto">{category.description}</p>
                    <p className="mt-4">
                      <a
                        href={category.link}
                        className="text-sm font-medium text-blue-600 hover:text-blue-500">
                        Bu kategoride gözat <span aria-hidden="true">→</span>
                      </a>
                    </p>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
