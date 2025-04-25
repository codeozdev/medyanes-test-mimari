import Link from "next/link";

export default function ProductNotFound() {
  return (
    <div className="bg-white shadow rounded-lg p-8 text-center">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Ürün Bulunamadı</h2>
      <p className="text-gray-600 mb-6">Aradığınız ürün bulunamadı veya kaldırılmış olabilir.</p>
      <Link
        href="/products"
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700">
        Tüm Ürünlere Dön
      </Link>
    </div>
  );
}
