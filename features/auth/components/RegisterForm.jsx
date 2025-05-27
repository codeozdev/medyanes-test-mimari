"use client";

import FormField from "@/components/form/FormField";
import { registerUser } from "@/features/auth/servers/actions";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { registerValidations } from "./RegisterFormValidations";

export default function RegisterForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const result = await registerUser(data);

      if (!result.success) {
        throw new Error(result.error || "Kayıt başarısız oldu.");
      } else {
        router.push("/login?registered=true");
      }
    } catch (error) {
      alert(error.message || "Bir hata oluştu. Lütfen tekrar deneyin.");
      return false;
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full max-w-md">
      <FormField
        label="İsim"
        name="name"
        register={register}
        errors={errors}
        options={registerValidations.name}
      />

      <FormField
        label="Email"
        name="email"
        type="email"
        register={register}
        errors={errors}
        options={registerValidations.email}
      />

      <FormField
        label="Şifre"
        name="password"
        type="password"
        register={register}
        errors={errors}
        options={registerValidations.password}
      />

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50">
        {isSubmitting ? "Kaydediliyor..." : "Kayıt Ol"}
      </button>
    </form>
  );
}
