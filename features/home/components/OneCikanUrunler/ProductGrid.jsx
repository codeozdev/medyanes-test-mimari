import Link from "next/link";
import AddToCartButton from "./AddToCartButton";

export function ProductGrid({ products = [] }) {
  return (
    <>
      {/* Product Grid */}
      <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:mt-20 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white overflow-hidden shadow rounded-lg w-full sm:w-auto"
            style={{
              height: "182px",
              maxWidth: "100%",
              width: "100%",
            }}>
            <div className="p-6 h-full flex flex-col">
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
              <p className="mt-3 text-sm text-gray-500 line-clamp-3 flex-grow">
                {product.description}
              </p>
              <div className="mt-4 flex justify-between items-center">
                <p className="text-lg font-medium text-gray-900">
                  {product.price.toLocaleString("tr-TR")} ₺
                </p>
                <div className="flex space-x-2">
                  <Link
                    href={`/products/${product.id}`}
                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200">
                    Detaylar
                  </Link>
                  <AddToCartButton product={product} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
