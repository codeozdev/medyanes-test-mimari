import { BaseRepository } from "@/repository";

// Repository örnekleri
const productRepo = new BaseRepository("product");
const categoryRepo = new BaseRepository("category");

// Product Include
const productIncludes = { category: true };

// Temel işlemler
export const Product = {
  getAll: async (filters = {}) => {
    const where = buildProductFilters(filters);
    return await productRepo.getAll(where, { updatedAt: "desc" }, productIncludes);
  },

  getById: async (id) => {
    return await productRepo.getById(id, productIncludes);
  },

  create: async (data) => {
    const productData = formatProductData(data);
    return await productRepo.create(productData, productIncludes);
  },

  update: async (id, data) => {
    const productData = formatProductData(data);
    return await productRepo.update(id, productData, productIncludes);
  },

  delete: async (id) => {
    return await productRepo.delete(id);
  },
};

export const Category = {
  getAll: async () => {
    return await categoryRepo.getAll({}, { name: "asc" });
  },
};

// Helper fonksiyonlar
function buildProductFilters(filters) {
  const where = {};

  if (filters.category) {
    where.category = { name: filters.category };
  }

  if (filters.search) {
    where.OR = [
      { name: { contains: filters.search, mode: "insensitive" } },
      { description: { contains: filters.search, mode: "insensitive" } },
    ];
  }

  if (filters.stock === "in-stock") {
    where.stock = { gt: 0 };
  } else if (filters.stock === "low-stock") {
    where.stock = { gt: 0, lte: 10 };
  } else if (filters.stock === "out-of-stock") {
    where.stock = 0;
  }

  return where;
}

// Create ve Update için çalışan fonksiyon
function formatProductData(data) {
  return {
    name: data.name,
    description: data.description,
    price: parseFloat(data.price),
    stock: parseInt(data.stock || "0", 10),
    status: data.status,
    categoryId: data.categoryId,
  };
}

// Ortak Crud methodları burada tanımlanıyor
