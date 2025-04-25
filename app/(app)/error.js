"use client";

import { useEffect } from "react";

export default function Error({ error, reset }) {
  useEffect(() => {
    // Hata loglanabilir
    console.error(error);
  }, [error]);

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg mx-auto my-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Bir Hata Oluştu</h2>
        <p className="text-gray-600 mb-6">{error?.message || "Beklenmeyen bir hata oluştu."}</p>
        <div className="flex justify-center space-x-4">
          <button
            onClick={() => reset()}
            className="px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700">
            Tekrar Dene
          </button>
          <a
            href="/"
            className="px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-50">
            Ana Sayfaya Dön
          </a>
        </div>
      </div>
    </div>
  );
}
