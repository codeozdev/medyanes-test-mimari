"use client";

import {useState} from "react";
import { deleteProduct } from "../servers/actions";

export default function DeleteButton({ productId }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState("");

  async function handleDelete() {
    if (!confirm("Bu ürünü silmek istediğinizden emin misiniz?")) {
      return;
    }

    setIsDeleting(true);
    setError("");

    try {
      const result = await deleteProduct(productId);

      if (!result.success) {
        setError(result.error || "Ürün silinirken bir hata oluştu.");
      }
    } catch (e) {
      setError("Bir hata oluştu. Lütfen tekrar deneyin.");
    } finally {
      setIsDeleting(false);
    }
  }

  return (
      <>
        <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50">
          {isDeleting ? "Siliniyor..." : "Sil"}
        </button>

        {error && <div className="text-red-500 text-xs mt-1">{error}</div>}
      </>
  );
}


