// features/products/servers/actions.js
"use server";

import { getCurrentUser } from "@/lib/auth"; // Auth yardımcılarınızı import edin
import { revalidatePath } from "next/cache";
import {
  createProductInDb,
  deleteProductFromDb,
  getProductById,
  getProducts,
  updateProductInDb,
} from "./data-access";

// Admin yetkisi kontrol fonksiyonu
async function requireAdmin() {
  const user = await getCurrentUser();
  if (!user || user.role !== "admin") {
    throw new Error("Bu işlemi gerçekleştirmek için admin yetkisine sahip olmalısınız.");
  }
  return user;
}

// Ürünleri getiren fonksiyon
export async function fetchProducts(filters = {}) {
  try {
    const products = await getProducts(filters);
    return { success: true, data: products };
  } catch (error) {
    console.error("Error fetching products:", error);
    return { success: false, error: error.message || "Ürünler yüklenirken bir hata oluştu." };
  }
}

// Tek bir ürün getiren fonksiyon
export async function fetchProductById(productId) {
  try {
    const product = await getProductById(productId);
    if (!product) {
      return { success: false, error: "Ürün bulunamadı." };
    }
    return { success: true, data: product };
  } catch (error) {
    console.error("Error fetching product:", error);
    return { success: false, error: error.message || "Ürün yüklenirken bir hata oluştu." };
  }
}

// features/products/servers/actions.js
export async function createProduct(data) {
  // Admin yetkisi kontrolü
  await requireAdmin();

  try {
    // JavaScript objesi olarak gelen veriyi kullan
    const productData = {
      name: data.name,
      description: data.description,
      price: parseFloat(data.price),
      stock: parseInt(data.stock, 10),
      status: data.status || "Aktif",
      categoryId: data.categoryId,
    };

    const product = await createProductInDb(productData);
    revalidatePath("/products");
    return { success: true, data: product };
  } catch (error) {
    console.error("Ürün oluşturma hatası:", error);
    return { success: false, error: error.message };
  }
}

// features/products/servers/actions.js
export async function updateProduct(productId, data) {
  // Admin yetkisi kontrolü
  await requireAdmin();

  try {
    // data, EditForm'dan gelen düz bir JavaScript objesi
    // Doğrudan bu veriyi kullanın, formData.get() yapmayın

    const product = await updateProductInDb(productId, data);
    revalidatePath("/products");
    revalidatePath(`/products/${productId}`);
    return { success: true, data: product };
  } catch (error) {
    console.error("Ürün güncelleme hatası:", error);
    return { success: false, error: error.message };
  }
}

export async function deleteProduct(productId) {
  // Admin yetkisi kontrolü
  await requireAdmin();

  try {
    await deleteProductFromDb(productId);
    revalidatePath("/products");
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}
