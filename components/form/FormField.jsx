import React from "react";

/**
 * Genel amaçlı form alan bileşeni
 * @param {string} label - Alan etiketi
 * @param {string} name - Alan adı
 * @param {function} register - react-hook-form register fonksiyonu
 * @param {object} errors - react-hook-form errors nesnesi
 * @param {string} type - Alan tipi (text, number, select, textarea, vb.)
 * @param {object} options - react-hook-form validasyon seçenekleri
 * @param {React.ReactNode} children - Alt elemanlar (select için options vb.)
 */
const FormField = ({
  label,
  name,
  register,
  errors,
  type = "text",
  options = {},
  children,
  ...props
}) => {
  const isSelect = type === "select";
  const isTextarea = type === "textarea";

  // Ortak CSS sınıfları
  const fieldClass = `mt-1 block w-full rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${
    errors[name] ? "border-red-500" : "border-gray-300"
  }`;

  return (
    <div className="form-field">
      <label className="block text-sm font-medium text-gray-700">
        {label}
        {options.required ? "*" : ""}
      </label>
      {isSelect ? (
        <select {...register(name, options)} className={fieldClass} {...props}>
          {children}
        </select>
      ) : isTextarea ? (
        <textarea {...register(name, options)} className={fieldClass} {...props} />
      ) : (
        <input type={type} {...register(name, options)} className={fieldClass} {...props} />
      )}
      {errors[name] && <p className="mt-1 text-sm !text-red-600">{errors[name].message}</p>}
    </div>
  );
};

export default FormField;
