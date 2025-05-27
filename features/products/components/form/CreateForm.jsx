"use client";

import FormField from "@/components/form/FormField";
import { createProduct } from "@/features/products";
import { productValidations } from "@/features/products/components/form/ProductFormValidations";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export default function CreateForm({ categories = [] }) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting, isDirty, isValid },
  } = useForm({
    mode: "all",
    defaultValues: {
      name: "",
      categoryId: "",
      price: "",
      stock: "",
      status: "Aktif",
      description: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value);
      });

      const result = await createProduct(formData);
      if (!result.success) throw new Error(result.error || "İşlem sırasında bir hata oluştu.");

      reset();
      router.push("/products");
    } catch (err) {
      alert(err.message || "Bir hata oluştu.");
    }
  };

  // Form içindeki değerleri izleme
  const watchedValues = watch();
  console.log("Form değerleri:", watchedValues);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white shadow rounded-lg p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Ürün Adı */}
        <FormField
          label="Ürün Adı"
          name="name"
          register={register}
          errors={errors}
          options={productValidations.name}
        />

        {/* Kategori */}
        <FormField
          label="Kategori"
          name="categoryId"
          type="select"
          register={register}
          errors={errors}
          options={productValidations.categoryId}>
          <option value="">Seçim yapın</option>
          {Array.isArray(categories) && categories.length > 0 ? (
            categories.map((category) => (
              <option key={category?.id || "unknown"} value={category?.id || ""}>
                {category?.name || "İsimsiz Kategori"}
              </option>
            ))
          ) : (
            <option value="" disabled>
              Kategori bulunamadı
            </option>
          )}
        </FormField>

        {/* Fiyat */}
        <FormField
          label="Fiyat (₺)"
          name="price"
          type="number"
          step="0.01"
          register={register}
          errors={errors}
          options={productValidations.price}
        />

        {/* Stok */}
        <FormField
          label="Stok"
          name="stock"
          type="text"
          inputMode="numeric"
          register={register}
          errors={errors}
          options={productValidations.stock}
        />

        {/* Durum */}
        <FormField
          label="Durum"
          name="status"
          type="select"
          register={register}
          errors={errors}
          options={productValidations.status}>
          <option value="Aktif">Aktif</option>
          <option value="Pasif">Pasif</option>
        </FormField>
      </div>

      {/* Açıklama */}
      <FormField
        label="Açıklama"
        name="description"
        type="textarea"
        rows={3}
        register={register}
        errors={errors}
        options={productValidations.description}
      />
      <p className="mt-1 text-xs text-gray-500">
        {watch("description")?.length || 0} / 500 karakter
      </p>

      {/* Butonlar */}
      <div className="flex justify-end space-x-3">
        <button
          type="submit"
          disabled={!isDirty || !isValid || isSubmitting}
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50">
          {isSubmitting ? "Kaydediliyor..." : "Kaydet"}
        </button>
      </div>
    </form>
  );
}
