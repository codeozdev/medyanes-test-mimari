import { ProductDetailView, fetchProductById } from "@/features/products";
import { auth } from "@/servers/auth";

export default async function ProductDetailPage(props) {
  // params nesnesini await ile bekleyin
  const params = await Promise.resolve(props.params);
  const productId = params.productId;

  // Oturum bilgisini ve kullanıcı rolünü al
  const session = await auth();
  const isAdmin = session?.user?.role === "admin";

  // Ürün verilerini getir
  const { success, data: product, error } = await fetchProductById(productId);

  return (
    <ProductDetailView
      success={success}
      product={product}
      error={error}
      productId={productId}
      isAdmin={isAdmin}
    />
  );
}
