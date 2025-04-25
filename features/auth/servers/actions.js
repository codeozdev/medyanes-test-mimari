"use server";

import { hash } from "bcrypt";
import { revalidatePath } from "next/cache";
import { createUser, getUserByEmail } from "./data-access";

export async function registerUser({ name, email, password }) {
  try {
    // Email kontrolü
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return { success: false, error: "Bu email adresi zaten kayıtlı." };
    }

    // Şifre hashleme
    const hashedPassword = await hash(password, 10);

    // Kullanıcı oluşturma
    const user = await createUser({
      name,
      email,
      password: hashedPassword,
    });

    revalidatePath("/login");
    return { success: true };
  } catch (error) {
    console.error("User registration error:", error);
    return { success: false, error: "Kayıt sırasında bir hata oluştu." };
  }
}
