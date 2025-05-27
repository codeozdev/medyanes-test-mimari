"use client";

import useCartStore from "@/lib/zustand/useCartStore";

export default function AddToCartButton({ product }) {
  const addToCart = useCartStore((state) => state.addToCart);
  const itemCount = useCartStore((state) => state.itemCount);

  const handleAddToCart = () => {
    addToCart(product);
  };

  const isDisabled = itemCount >= 5;

  return (
    <button
      onClick={handleAddToCart}
      disabled={isDisabled}
      className={`inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md cursor-pointer
        ${
          isDisabled
            ? "bg-gray-200 text-gray-500 cursor-not-allowed"
            : "bg-green-100 text-green-700 hover:bg-green-200"
        }`}>
      {isDisabled ? "Sepet Dolu" : "Sepete Ekle"}
    </button>
  );
}
