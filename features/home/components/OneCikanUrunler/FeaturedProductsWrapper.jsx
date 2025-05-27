import { fetchProducts } from "@/features/products/servers/actions";
import { ProductGrid } from "./ProductGrid";

export async function FeaturedProductsWrapper({ count }) {
  await new Promise((resolve) => setTimeout(resolve, 3000)); // Test için yapay gecikme ekliyoruz (3 saniye)

  // Ürünleri getir (sadece aktif olanları ve stokta bulunanları)
  const { success, data: products } = await fetchProducts({ stock: "in-stock" });

  // Belirtilen sayıda ürünü göster
  const featuredProducts = success ? products.slice(0, count) : [];
  return <ProductGrid products={featuredProducts} />;
}
