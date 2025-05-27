// Mark as Client Component
"use client";

import CartPopover from "@/features/cart/components/CartPopover";
import useCartStore from "@/lib/zustand/useCartStore";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Header() {
  // Client component'te zustand store'unu kullanmak için
  const [cartCount, setCartCount] = useState(0);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Client tarafında sepet sayısını al
  useEffect(() => {
    const { itemCount } = useCartStore.getState();
    setCartCount(itemCount);

    // Store değişikliklerini dinle
    const unsubscribe = useCartStore.subscribe((state) => setCartCount(state.itemCount));

    return () => unsubscribe();
  }, []);

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <div className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-xl font-bold text-gray-900">
            <Link href="/">My Fullstack App</Link>
          </h1>
        </div>
        <div className="flex items-center">
          <nav className="flex space-x-4 mr-8">
            <Link href="/" className="text-gray-600 hover:text-gray-900">
              Ana Sayfa
            </Link>
            <a href="/about" className="text-gray-600 hover:text-gray-900">
              Hakkımızda
            </a>
            <Link href="/dashboard" className="text-gray-600 hover:text-gray-900">
              Giriş
            </Link>
          </nav>

          {/* Sepet simgesi ve sayaç */}
          <div className="relative">
            <button
              onClick={toggleCart}
              className="relative text-gray-600 hover:text-gray-900 focus:outline-none cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 !text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Sepet Popover */}
            {isCartOpen && (
              <div className="absolute top-8 right-0 mt-2 w-96 z-10">
                <CartPopover onClose={() => setIsCartOpen(false)} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
