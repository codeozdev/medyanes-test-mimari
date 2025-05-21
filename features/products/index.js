// features/products/index.js
export { default as EditForm } from "./components/EditForm.client";
export { default as ProductDetailView } from "./components/ProductDetailView";
export { default as ProductFilters } from "./components/ProductFilters";
export { default as ProductList } from "./components/ProductList";

// Server Actions
export {
  createProduct,
  deleteProduct,
  fetchCategories,
  fetchProductById,
  fetchProducts,
  updateProduct,
} from "./servers/actions";

// Artık data-access doğrudan export edilmiyor, server actions üzerinden erişim sağlanıyor
