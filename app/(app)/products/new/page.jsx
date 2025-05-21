import { EditForm, fetchCategories } from "@/features/products";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function NewProductPage() {
  // Oturumu kontrol et
  const session = await auth();

  // Admin değilse yönlendir
  if (!session?.user?.role === "admin") {
    redirect("/dashboard");
  }

  // Kategorileri getir
  let categories = [];
  try {
    const result = await fetchCategories();

    if (result.success) {
      categories = result.data;
    } else {
      console.error("Kategoriler yüklenemedi:", result.error);
    }
  } catch (error) {
    console.error("Kategori yükleme hatası:", error);
    // Hata durumunda boş dizi kullan
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Yeni Ürün Ekle</h1>

      {categories.length === 0 ? (
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 p-4 rounded mb-6">
          <p>Kategori bulunamadı. Önce kategori eklemeniz gerekiyor.</p>
          <a
            href="/categories/new"
            className="mt-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700">
            Kategori Ekle
          </a>
        </div>
      ) : (
        <EditForm categories={categories} initialData={{}} isEdit={false} />
      )}
    </div>
  );
}
