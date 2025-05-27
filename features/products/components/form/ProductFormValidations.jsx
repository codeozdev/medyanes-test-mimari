export const productValidations = {
  name: {
    required: "Ürün adı zorunludur",
    minLength: {
      value: 3,
      message: "Ürün adı en az 3 karakter olmalıdır",
    },
    maxLength: {
      value: 50,
      message: "Ürün adı en fazla 50 karakter olabilir",
    },
    pattern: {
      value: /^[a-zA-ZğüşöçıİĞÜŞÖÇ0-9\s\-_.]+$/i,
      message: "Ürün adı sadece harf, rakam, boşluk ve bazı özel karakterler içerebilir",
    },
  },

  categoryId: {
    required: "Kategori seçimi zorunludur",
    validate: (value) => value !== "" || "Lütfen bir kategori seçin",
  },

  price: {
    required: "Fiyat bilgisi zorunludur",
    min: { value: 0.01, message: "Fiyat 0'dan büyük olmalıdır" },
    max: { value: 999999.99, message: "Fiyat çok yüksek" },
    validate: {
      isNumber: (value) => {
        if (value === "" || value === null || value === undefined) return true;
        return (!isNaN(parseFloat(value)) && isFinite(value)) || "Lütfen geçerli bir fiyat giriniz";
      },
      hasTwoDecimals: (value) => {
        if (value === "" || value === null || value === undefined) return true;
        const price = parseFloat(value);
        return (
          !price ||
          /^\d+(\.\d{1,2})?$/.test(value) ||
          "En fazla 2 ondalık basamak kullanabilirsiniz"
        );
      },
    },
  },

  stock: {
    required: "Stok bilgisi zorunludur",
    validate: {
      notEmpty: (value) => value.toString().trim() !== "" || "Stok boş olamaz",
      isInteger: (value) => {
        if (!/^\d+$/.test(value.toString())) {
          return "Stok harf içeremez, tam sayı olmalıdır";
        }
        return true;
      },
      inRange: (value) => {
        const numValue = parseInt(value, 10);
        if (numValue < 0) return "Stok negatif olamaz";
        if (numValue > 9999) return "Stok miktarı çok yüksek";
        return true;
      },
    },
  },

  status: {
    required: "Durum seçimi zorunludur",
    validate: (value) => ["Aktif", "Pasif"].includes(value) || "Geçersiz durum",
  },

  description: {
    maxLength: {
      value: 500,
      message: "Açıklama en fazla 500 karakter olabilir",
    },
    validate: {
      noHTML: (value) => !value || !/(<([^>]+)>)/i.test(value) || "HTML etiketleri kullanılamaz",
    },
  },
};
