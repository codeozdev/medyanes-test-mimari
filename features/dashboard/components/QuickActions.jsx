export default function QuickActions() {
  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6">
        <h3 className="text-lg font-medium text-gray-900">Hızlı İşlemler</h3>
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="flex items-start p-4 rounded-lg bg-gray-50 hover:bg-gray-100">
            <div className="ml-4">
              <h4 className="text-base font-medium text-gray-900">Yeni Ürün Ekle</h4>
              <p className="mt-1 text-sm text-gray-500">Envantere yeni bir ürün ekleyin</p>
              <a
                href="/products/new"
                className="mt-2 inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-500">
                Ürün Ekle →
              </a>
            </div>
          </div>
          <div className="flex items-start p-4 rounded-lg bg-gray-50 hover:bg-gray-100">
            <div className="ml-4">
              <h4 className="text-base font-medium text-gray-900">Tüm Ürünler</h4>
              <p className="mt-1 text-sm text-gray-500">Ürünlerinizi görüntüleyin ve yönetin</p>
              <a
                href="/products"
                className="mt-2 inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-500">
                Ürünlere Git →
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
