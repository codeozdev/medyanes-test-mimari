// app/(app)/products/page.jsx
import ProductList from "@/features/products/components/ProductList";
import { fetchProducts } from "@/features/products/servers/actions";
import { auth } from "@/lib/auth";
import Link from "next/link";

export default async function ProductsPage() {
  // Oturum bilgisini ve kullanıcı rolünü al
  const session = await auth();
  const isAdmin = session?.user?.role === "admin";

  // Ürünleri getir
  const result = await fetchProducts();
  const products = result.success ? result.data : [];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Ürünler</h1>

        {isAdmin && (
          <Link
            href="/products/new"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Yeni Ürün Ekle
          </Link>
        )}
      </div>

      <ProductList products={products} showAdminControls={isAdmin} />
    </div>
  );
}
