"use client";

import { useEffect } from "react";

export default function Error({ error, reset }) {
  useEffect(() => {
    // Hata loglanabilir
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white px-4">
      <h2 className="text-2xl font-bold text-red-600 mb-4">Bir Hata Oluştu</h2>
      <p className="text-gray-600 mb-8 text-center max-w-md">
        Üzgünüz, bir sorun oluştu. Tekrar denemek için aşağıdaki butona tıklayabilirsiniz.
      </p>
      <button
        onClick={() => reset()}
        className="px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700">
        Tekrar Dene
      </button>
    </div>
  );
}
