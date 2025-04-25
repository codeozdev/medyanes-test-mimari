// Bu dosya Prisma ile veritabanı işlemlerini gerçekleştirir
import prisma from "@/lib/prisma";

// Tüm ürünleri getir (filtreleme seçenekleri ile)
export async function getProducts(filters = {}) {
  const where = {};

  // Filtrelemeleri ekle
  if (filters.category) {
    where.category = {
      name: filters.category,
    };
  }

  if (filters.search) {
    where.OR = [
      { name: { contains: filters.search, mode: "insensitive" } },
      { description: { contains: filters.search, mode: "insensitive" } },
    ];
  }

  // Stok durumuna göre filtreleme
  if (filters.stock === "in-stock") {
    where.stock = { gt: 0 };
  } else if (filters.stock === "low-stock") {
    where.stock = { gt: 0, lte: 10 };
  } else if (filters.stock === "out-of-stock") {
    where.stock = 0;
  }

  return await prisma.product.findMany({
    where,
    include: {
      category: true,
    },
    orderBy: {
      updatedAt: "desc",
    },
  });
}

// ID'ye göre bir ürün getir
export async function getProductById(id) {
  return await prisma.product.findUnique({
    where: { id },
    include: {
      category: true,
    },
  });
}

// Tüm kategorileri getir
export async function getCategories() {
  try {
    return await prisma.category.findMany({
      orderBy: { name: "asc" },
    });
  } catch (error) {
    console.error("Kategori getirme hatası:", error);
    return []; // Hata durumunda boş dizi döndür
  }
}

// Yeni ürün oluştur
export async function createProductInDb(productData) {
  return await prisma.product.create({
    data: {
      name: productData.name,
      description: productData.description,
      price: parseFloat(productData.price),
      categoryId: productData.categoryId,
      stock: parseInt(productData.stock || "0"),
    },
    include: {
      category: true,
    },
  });
}

// Ürün güncelle
// features/products/servers/data-access.js
export async function updateProductInDb(productId, data) {
  return prisma.product.update({
    where: { id: productId },
    data: {
      name: data.name,
      description: data.description,
      price: parseFloat(data.price),
      stock: parseInt(data.stock, 10),
      status: data.status,
      categoryId: data.categoryId,
    },
  });
}

// Ürün sil
export async function deleteProductFromDb(id) {
  await prisma.product.delete({
    where: { id },
  });

  return true;
}
