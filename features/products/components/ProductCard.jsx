import Link from "next/link";
import DeleteButton from "./DeleteButton.client";

// features/products/components/ProductCard.jsx
export default function ProductCard({ product, showEditControls = false }) {
  return (
    <div className="border rounded p-4">
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p className="font-bold">{product.price} TL</p>

      {showEditControls && (
        <div className="mt-4 flex space-x-2">
          <Link
            href={`/products/${product.id}/edit`}
            className="px-2 py-1 text-sm bg-yellow-500 text-white rounded">
            Düzenle
          </Link>
          <DeleteButton productId={product.id} />
        </div>
      )}
    </div>
  );
}
