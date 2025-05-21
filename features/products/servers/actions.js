// features/products/servers/actions.js
"use server";

import { checkRole } from "@/lib/action-helpers";
import { revalidatePath } from "next/cache";
import { Category, Product } from "./data-access";

// Veri getirme işlemleri
export async function fetchProducts(filters = {}) {
  try {
    const products = await Product.getAll(filters);
    return { success: true, data: products };
  } catch (error) {
    console.error("Ürün getirme hatası:", error);
    return { success: false, error: error.message };
  }
}

export async function fetchProductById(productId) {
  try {
    const product = await Product.getById(productId);
    if (!product) {
      return { success: false, error: "Ürün bulunamadı." };
    }
    return { success: true, data: product };
  } catch (error) {
    console.error("Ürün detayı getirme hatası:", error);
    return { success: false, error: error.message };
  }
}

export async function fetchCategories() {
  try {
    const categories = await Category.getAll();
    return { success: true, data: categories };
  } catch (error) {
    console.error("Kategori getirme hatası:", error);
    return { success: false, error: error.message };
  }
}

// Admin yetkisi gerektiren işlemler
export async function createProduct(data) {
  // Yetki kontrolü
  const roleCheck = await checkRole("admin");
  if (!roleCheck.success) {
    return roleCheck;
  }

  try {
    const product = await Product.create(data);
    revalidatePath("/products");
    return { success: true, data: product };
  } catch (error) {
    console.error("Ürün oluşturma hatası:", error);
    return { success: false, error: error.message };
  }
}

export async function updateProduct(productId, data) {
  // Yetki kontrolü
  const roleCheck = await checkRole("admin");
  if (!roleCheck.success) {
    return roleCheck;
  }

  try {
    const product = await Product.update(productId, data);
    revalidatePath("/products");
    revalidatePath(`/products/${productId}`);
    return { success: true, data: product };
  } catch (error) {
    console.error("Ürün güncelleme hatası:", error);
    return { success: false, error: error.message };
  }
}

export async function deleteProduct(productId) {
  // Yetki kontrolü
  const roleCheck = await checkRole("admin");
  if (!roleCheck.success) {
    return roleCheck;
  }

  try {
    await Product.delete(productId);
    revalidatePath("/products");
    return { success: true };
  } catch (error) {
    console.error("Ürün silme hatası:", error);
    return { success: false, error: error.message };
  }
}

/* 

`revalidatePath` Next.js'in App Router özelliğinin çok önemli bir fonksiyonudur. Şu amaçla kullanılır:

1. **Önbellek (Cache) Yönetimi**: Next.js sayfaları ve verilerinizi varsayılan olarak önbelleğe alır (cache'ler). Bu performans açısından faydalıdır.

2. **Veri Güncellemeleri**: Veritabanında bir değişiklik yaptığınızda (ürün ekleme, güncelleme, silme gibi), Next.js'in bu değişikliği bilmesi gerekir.

3. **Sayfaları Yenileme**: `revalidatePath("/products")` çağrısı, "/products" yolundaki sayfaların önbelleğini geçersiz kılar ve yeni verilerle yeniden oluşturulmasını sağlar.

Örneğin:
- Bir ürün eklendiğinde, ürünler listesi sayfasının güncellenmesi gerekir
- Bir ürün güncellendiğinde, hem ürünler listesi hem de o ürünün detay sayfasının güncellenmesi gerekir
- Bir ürün silindiğinde, ürünler listesinin güncellenmesi gerekir

`revalidatePath` olmadan, kullanıcılar veritabanındaki güncellemeleri görmek için sayfayı manuel olarak yenilemek zorunda kalırlardı. Bu fonksiyon, Next.js'in server-side rendering ve sayfa önbelleğe alma yeteneklerini kullanırken veri değişikliklerini doğru şekilde yönetmenizi sağlar.



*/
