import { EditForm, createProduct, getCategories } from "@/features/products";
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
    categories = await getCategories();

    // Eğer categories undefined veya null gelirse boş dizi kullan
    if (!categories) {
      categories = [];
      console.error("Kategoriler yüklenemedi");
    }
  } catch (error) {
    console.error("Kategori yükleme hatası:", error);
    // Hata durumunda boş dizi kullan
    categories = [];
  }

  // Server action (form submit)
  async function handleSubmit(formData) {
    "use server";

    const session = await auth();
    if (session?.user?.role !== "admin") {
      throw new Error("Bu işlemi gerçekleştirmek için admin yetkisine sahip olmalısınız.");
    }

    try {
      const result = await createProduct(formData);

      if (!result.success) {
        throw new Error(result.error || "Ürün oluşturulurken bir hata oluştu.");
      }

      redirect("/products");
    } catch (error) {
      throw error;
    }
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
        <EditForm categories={categories} initialData={{}} onSubmit={handleSubmit} isEdit={false} />
      )}
    </div>
  );
}
