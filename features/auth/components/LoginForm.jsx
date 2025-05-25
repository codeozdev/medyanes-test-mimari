"use client";

import FormField from "@/components/form/FormField";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { loginValidations } from "./LoginFormValidations";

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError: setFormError,
    clearErrors,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // URL'den gelen hataları veya mesajları kontrol et
  useEffect(() => {
    // Form genel hatası için
    clearErrors("root");

    const errorFromUrl = searchParams.get("error");
    if (errorFromUrl) {
      if (errorFromUrl === "CredentialsSignin") {
        setFormError("root", {
          type: "manual",
          message: "Giriş bilgileri geçersiz. Lütfen email ve şifrenizi kontrol edin.",
        });
      } else {
        setFormError("root", {
          type: "manual",
          message: "Giriş sırasında bir hata oluştu.",
        });
      }
    }

    // Başarılı kayıt mesajı
    const registered = searchParams.get("registered");
    if (registered === "true") {
      // Form başarı mesajı için genel hata yerine ayrı bir state kullanmak daha iyi olabilir
      // Ancak örnek amaçlı buraya ekledim
      setFormError("success", {
        type: "manual",
        message: "Kayıt işlemi başarılı! Şimdi giriş yapabilirsiniz.",
      });
    }
  }, [searchParams, setFormError, clearErrors]);

  const onSubmit = async (data) => {
    try {
      clearErrors();

      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (result.error) {
        setFormError("root", {
          type: "manual",
          message: "Giriş başarısız oldu. Lütfen email ve şifrenizi kontrol edin.",
        });
        return false;
      } else {
        // Başarılı giriş, redirect ve refresh
        router.push(callbackUrl);
        router.refresh();
      }
    } catch (error) {
      console.error("Giriş hatası:", error);
      setFormError("root", {
        type: "manual",
        message: "Bir hata oluştu. Lütfen tekrar deneyin.",
      });
      return false;
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full max-w-md">
      {/* Başarı mesajı */}
      {errors.success && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded">
          {errors.success.message}
        </div>
      )}

      <FormField
        label="Email"
        name="email"
        type="email"
        register={register}
        errors={errors}
        options={loginValidations.email}
      />

      <FormField
        label="Şifre"
        name="password"
        type="password"
        register={register}
        errors={errors}
        options={loginValidations.password}
      />

      {/* Genel form hatası */}
      {errors.root && <div className="text-red-500 text-sm">{errors.root.message}</div>}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50">
        {isSubmitting ? "Giriş yapılıyor..." : "Giriş Yap"}
      </button>
    </form>
  );
}
