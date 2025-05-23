"use server";

import {
    createNewData,
    deleteDataByAny,
    getAllData,
    getDataByMany,
    getDataByUnique,
    updateDataByAny,
} from "@/servers/serviceOperations";
import {revalidatePath} from "next/cache";

// Sabitler
const PRODUCT_TABLE = "product";
const CATEGORY_TABLE = "category";


export async function fetchProducts(filters = {}) {
    try {
        let where = {};

        // Filtreleri oluştur
        if (filters.category) {
            where.category = {name: filters.category};
        }

        if (filters.search) {
            where.OR = [
                {name: {contains: filters.search, mode: "insensitive"}},
                {description: {contains: filters.search, mode: "insensitive"}},
            ];
        }

        if (filters.stock === "in-stock") {
            where.stock = {gt: 0};
        } else if (filters.stock === "low-stock") {
            where.stock = {gt: 0, lte: 10};
        } else if (filters.stock === "out-of-stock") {
            where.stock = 0;
        }

        const products =
            Object.keys(where).length > 0
                ? await getDataByMany(PRODUCT_TABLE, where, {
                    orderBy: {updatedAt: "desc"},
                    include: {category: true},
                })
                : await getAllData(PRODUCT_TABLE, {
                    orderBy: {updatedAt: "desc"},
                    include: {category: true},
                });

        return {success: true, data: products};
    } catch (error) {
        console.error("Ürünler getirilirken hata:", error);
        return {success: false, error: error.message};
    }
}


export async function fetchProductById(id) {
    try {
        const product = await getDataByUnique(PRODUCT_TABLE, {id}, {category: true});
        return {success: true, data: product};
    } catch (error) {
        console.error("Ürün getirilirken hata:", error);
        return {success: false, error: error.message};
    }
}

export async function createProduct(formData) {
    try {
        // FormData'dan verileri alıp object'e dönüştürme
        const data = {
            name: formData.get("name"),
            description: formData.get("description"),
            price: parseFloat(formData.get("price")),
            stock: parseInt(formData.get("stock") || "0", 10),
            status: formData.get("status"),
            categoryId: formData.get("categoryId"),
        };

        // Ürün oluştur
        const newProduct = await createNewData(PRODUCT_TABLE, data, {category: true});

        // Hata kontrolü
        if (newProduct.error) {
            throw new Error(newProduct.error);
        }

        // Cache'i yenile
        revalidatePath("/products");
        revalidatePath("/"); // Ana sayfayı da yenile

        return {success: true, data: newProduct};
    } catch (error) {
        console.error("Ürün oluşturulurken hata:", error);
        return {success: false, error: error.message};
    }
}


export async function updateProduct(id, formData) {
    try {
        // FormData'dan verileri alıp object'e dönüştürme
        const data = {
            name: formData.get("name"),
            description: formData.get("description"),
            price: parseFloat(formData.get("price")),
            stock: parseInt(formData.get("stock") || "0", 10),
            status: formData.get("status"),
            categoryId: formData.get("categoryId"),
        };

        // Ürün güncelle
        const updatedProduct = await updateDataByAny(PRODUCT_TABLE, {id}, data, {category: true});

        // Hata kontrolü
        if (updatedProduct.error) {
            throw new Error(updatedProduct.error);
        }

        // Cache'i yenile
        revalidatePath("/products");
        revalidatePath("/"); // Ana sayfayı da yenile
        revalidatePath(`/products/${id}`);

        return {success: true, data: updatedProduct};
    } catch (error) {
        console.error("Ürün güncellenirken hata:", error);
        return {success: false, error: error.message};
    }
}


export async function deleteProduct(id) {
    try {
        const result = await deleteDataByAny(PRODUCT_TABLE, {id});

        // Hata kontrolü
        if (result.error) {
            throw new Error(result.error);
        }

        // Cache'i yenile
        revalidatePath("/products");
        revalidatePath("/"); // Ana sayfayı da yenile

        return {success: true};
    } catch (error) {
        console.error("Ürün silinirken hata:", error);
        return {success: false, error: error.message};
    }
}


export async function fetchCategories() {
    try {
        const categories = await getAllData(CATEGORY_TABLE, {orderBy: {name: "asc"}});
        return {success: true, data: categories};
    } catch (error) {
        console.error("Kategoriler getirilirken hata:", error);
        return {success: false, error: error.message};
    }
}
