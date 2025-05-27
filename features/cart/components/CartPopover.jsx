"use client";

import useCartStore from "@/lib/zustand/useCartStore";
import { useEffect, useRef } from "react";

export default function CartPopover({ onClose }) {
  const items = useCartStore((state) => state.items);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const clearCart = useCartStore((state) => state.clearCart);

  const popoverRef = useRef(null);

  // Dışarı tıklandığında kapat
  useEffect(() => {
    function handleClickOutside(event) {
      if (popoverRef.current && !popoverRef.current.contains(event.target)) {
        onClose();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div
      ref={popoverRef}
      className="bg-white rounded-md shadow-lg border border-gray-200 overflow-hidden">
      <div className="p-4 border-b">
        <div className="flex justify-between items-center">
          <h3 className="font-medium">Sepetim</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 cursor-pointer">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>

      {items.length === 0 ? (
        <div className="p-6 text-center">
          <p className="text-gray-500">Sepetiniz boş</p>
        </div>
      ) : (
        <>
          <div className="max-h-60 overflow-y-auto">
            {items.map((item) => (
              <div key={item.id} className="p-3 border-b flex justify-between items-center">
                <div className="flex-1">
                  <p className="font-medium">{item.name}</p>
                  <div className="flex items-center text-sm text-gray-500">
                    <span>{item.price.toLocaleString("tr-TR")} ₺</span>
                    <span className="mx-2">•</span>
                    <span>{item.quantity} adet</span>
                  </div>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="ml-2 p-1 text-red-500 hover:bg-red-50 rounded">
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </div>
            ))}
          </div>

          <div className="p-4 border-t flex justify-between items-center">
            <div>
              <p className="text-gray-600 text-sm">
                Toplam:
                <span className="font-bold ml-1">
                  {items
                    .reduce((total, item) => total + item.price * item.quantity, 0)
                    .toLocaleString("tr-TR")}{" "}
                  ₺
                </span>
              </p>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={clearCart}
                className="px-3 py-1 text-sm border border-gray-300 rounded text-gray-600 hover:bg-gray-100">
                Temizle
              </button>
              <button
                onClick={() => alert("Ödeme sayfasına yönlendiriliyorsunuz...")}
                className="px-3 py-1 text-sm bg-blue-600 rounded text-white hover:bg-blue-700">
                Ödeme Yap
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
