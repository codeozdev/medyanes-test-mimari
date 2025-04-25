"use client";

export default function ProductFilters({ search, category, stock, categories = [] }) {
  return (
    <form className="mb-6 bg-white p-4 rounded-lg shadow">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label htmlFor="search" className="block text-sm font-medium text-gray-700">
            Arama
          </label>
          <input
            type="text"
            name="search"
            id="search"
            defaultValue={search}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            placeholder="Ürün adı, açıklama..."
          />
        </div>
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">
            Kategori
          </label>
          <select
            id="category"
            name="category"
            defaultValue={category}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm">
            <option value="">Tümü</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="stock" className="block text-sm font-medium text-gray-700">
            Stok Durumu
          </label>
          <select
            id="stock"
            name="stock"
            defaultValue={stock}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm">
            <option value="">Tümü</option>
            <option value="in-stock">Stokta Var</option>
            <option value="low-stock">Stok Az</option>
            <option value="out-of-stock">Stokta Yok</option>
          </select>
        </div>
        <div className="flex items-end">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition-colors duration-200">
            Filtrele
          </button>
        </div>
      </div>
    </form>
  );
}
