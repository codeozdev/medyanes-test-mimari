import Link from "next/link";

export default function ProductDetailView({ success, product, error, productId, isAdmin }) {
  if (!success) {
    return (
      <div className="bg-white shadow rounded-lg p-8 text-center">
        <p className="text-red-500">{error || "Ürün yüklenirken bir hata oluştu."}</p>
        <Link
          href="/products"
          className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700">
          Ürünlere Dön
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">{product.name}</h1>
        <div className="space-x-3">
          <Link href="/products" className="text-sm font-medium text-gray-600 hover:text-gray-900">
            &larr; Tüm Ürünlere Dön
          </Link>

          {isAdmin && (
            <Link
              href={`/products/${productId}/edit`}
              className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600">
              Düzenle
            </Link>
          )}
        </div>
      </div>

      <div className="bg-white shadow overflow-hidden rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-lg font-medium text-gray-900">Ürün Bilgileri</h3>
              <div className="mt-5 border-t border-gray-200">
                <dl className="divide-y divide-gray-200">
                  <div className="py-4 flex justify-between">
                    <dt className="text-gray-500">Ürün Adı</dt>
                    <dd className="text-gray-900">{product.name}</dd>
                  </div>
                  <div className="py-4 flex justify-between">
                    <dt className="text-gray-500">Fiyat</dt>
                    <dd className="text-gray-900">{product.price} TL</dd>
                  </div>
                  <div className="py-4 flex justify-between">
                    <dt className="text-gray-500">Stok</dt>
                    <dd className="text-gray-900">{product.stock}</dd>
                  </div>
                  <div className="py-4 flex justify-between">
                    <dt className="text-gray-500">Durum</dt>
                    <dd className="text-gray-900">
                      <span
                        className={`px-2 py-1 rounded text-sm ${
                          product.status === "Aktif"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}>
                        {product.status}
                      </span>
                    </dd>
                  </div>
                </dl>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900">Açıklama</h3>
              <div className="mt-5 text-gray-600">
                {product.description || "Bu ürün için açıklama bulunmamaktadır."}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
