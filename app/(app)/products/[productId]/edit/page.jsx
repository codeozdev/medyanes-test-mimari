import { EditForm, fetchCategories, fetchProductById } from "@/features/products";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

// Bu sayfayı client component yapmak yerine server component olarak bırakalım
export default async function EditProductPage(props) {
  // Oturum kontrolü ekleyelim
  const session = await auth();
  const isAdmin = session?.user?.role === "admin";

  // Admin değilse yönlendir
  if (!isAdmin) {
    redirect("/products");
  }

  // params'ı Promise olarak ele alıp await ile bekleyelim
  const params = await Promise.resolve(props.params);
  const productId = params.productId;

  // Ürün verilerini ve kategorileri getir
  const productResult = await fetchProductById(productId);
  const categoriesResult = await fetchCategories();

  // Ürün bulunamadıysa hata göster
  if (!productResult.success) {
    return (
      <div className="bg-white shadow rounded-lg p-8 text-center">
        <p className="text-red-500">{productResult.error || "Ürün yüklenirken bir hata oluştu."}</p>
        <a
          href="/products"
          className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700">
          Ürünlere Dön
        </a>
      </div>
    );
  }

  const product = productResult.data;
  const categories = categoriesResult.success ? categoriesResult.data : [];

  // Form için initial data
  const initialData = {
    name: product.name,
    description: product.description,
    price: product.price,
    categoryId: product.categoryId,
    stock: product.stock,
    status: product.status,
  };

  return (
    <div>
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Ürün Düzenle</h2>
          <div className="space-x-4">
            <a
              href={`/products/${productId}`}
              className="text-sm font-medium text-gray-600 hover:text-gray-900">
              &larr; Ürün Detayına Dön
            </a>
            <a href="/products" className="text-sm font-medium text-gray-600 hover:text-gray-900">
              &larr; Tüm Ürünlere Dön
            </a>
          </div>
        </div>
      </div>

      <EditForm
        categories={categories}
        initialData={initialData}
        productId={productId}
        isEdit={true}
      />
    </div>
  );
}
