export default function ProductDetailsView({ product }) {
  if (!product) {
    return (
      <div className="bg-white shadow rounded-lg p-8 text-center">
        <p className="text-gray-500">Ürün bulunamadı.</p>
      </div>
    );
  }

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6 flex justify-between">
        <div>
          <h3 className="text-lg leading-6 font-medium text-gray-900">{product.name}</h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">{product.category.name}</p>
        </div>
        <div>
          <span
            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
              product.status === "Aktif"
                ? "bg-green-100 text-green-800"
                : "bg-gray-100 text-gray-800"
            }`}>
            {product.status}
          </span>
        </div>
      </div>
      <div className="border-t border-gray-200">
        <dl>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Açıklama</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {product.description || "Açıklama bulunmuyor"}
            </dd>
          </div>
          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Kategori</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {product.category.name}
            </dd>
          </div>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Fiyat</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {product.price.toLocaleString("tr-TR")} ₺
            </dd>
          </div>
          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Stok Durumu</dt>
            <dd
              className={`mt-1 text-sm sm:mt-0 sm:col-span-2 ${
                product.stock > 10
                  ? "text-green-600"
                  : product.stock > 0
                  ? "text-yellow-600"
                  : "text-red-600"
              }`}>
              {product.stock} adet
              {product.stock <= 0 && " (Stokta Yok)"}
              {product.stock > 0 && product.stock <= 10 && " (Stok Az)"}
            </dd>
          </div>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Oluşturulma Tarihi</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {new Date(product.createdAt).toLocaleDateString("tr-TR")}
            </dd>
          </div>
          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Son Güncelleme</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {new Date(product.updatedAt).toLocaleDateString("tr-TR")}
            </dd>
          </div>
        </dl>
      </div>
      <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
        <a
          href={`/products/${product.id}/edit`}
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Düzenle
        </a>
      </div>
    </div>
  );
}
