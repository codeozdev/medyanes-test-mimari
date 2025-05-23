import Link from "next/link";
import ProductAdminControls from "@/features/products/components/ProductAdminControls";

export default function ProductList({ products = [], showAdminControls = false }) {
  if (!products || products.length === 0) {
    return (
        <div className="text-center py-10">
          <p className="text-gray-500">Hiç ürün bulunamadı.</p>
        </div>
    );
  }

  return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
            <div key={product.id} className="border rounded-lg p-4 shadow-sm">
              <Link href={`/products/${product.id}`} className="block hover:text-blue-600">
                <h3 className="text-lg font-medium">{product.name}</h3>
              </Link>
              {product.category && (
                  <p className="text-sm text-gray-500 mt-1">Kategori: {product.category.name}</p>
              )}
              <p className="text-gray-600 mt-2 line-clamp-2">{product.description}</p>
              <div className="mt-4 flex justify-between items-center">
                <span className="text-lg font-bold">{product.price} TL</span>
                <span
                    className={`px-2 py-1 rounded text-sm ${
                        product.stock > 0 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                    }`}>
              {product.stock > 0 ? `Stokta: ${product.stock}` : "Tükendi"}
            </span>
              </div>

              {showAdminControls && <ProductAdminControls productId={product.id} />}
            </div>
        ))}
      </div>
  );
}

