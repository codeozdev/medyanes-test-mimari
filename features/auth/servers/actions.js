"use server";

import { createNewData, getDataByMany } from "@/servers/serviceOperations";
import { compare, hash } from "bcrypt";
import { revalidatePath } from "next/cache";

// Sabitler
const USER_TABLE = "user";

export async function registerUser(data) {
  try {
    // Email kontrolü
    const existingUser = await getDataByMany(USER_TABLE, {
      email: data.email,
    });

    if (existingUser && existingUser.length > 0) {
      return { success: false, error: "Bu email adresi zaten kayıtlı." };
    }

    // Şifre hashleme
    const hashedPassword = await hash(data.password, 10);

    // Kullanıcı oluşturma
    const userData = {
      name: data.name,
      email: data.email,
      password: hashedPassword,
      role: "USER", // Varsayılan rol
    };

    const newUser = await createNewData(USER_TABLE, userData);

    // Hata kontrolü
    if (newUser.error) {
      throw new Error(newUser.error);
    }

    revalidatePath("/login");
    return { success: true, data: { id: newUser.id, name: newUser.name, email: newUser.email } };
  } catch (error) {
    console.error("Kullanıcı kaydı sırasında hata:", error);
    return { success: false, error: "Kayıt sırasında bir hata oluştu." };
  }
}

/**
 * NextAuth credentials provider tarafından kullanılacak login fonksiyonu
 * Bu fonksiyon, bir kullanıcıyı email ve şifre ile doğrular
 */
export async function loginUser(credentials) {
  try {
    // Email ile kullanıcıyı bul
    const users = await getDataByMany(USER_TABLE, {
      email: credentials.email,
    });

    if (!users || users.length === 0 || users.error) {
      return null; // Kullanıcı bulunamadı
    }

    const user = users[0];

    // Şifre kontrolü
    const isPasswordValid = await compare(credentials.password, user.password);

    if (!isPasswordValid) {
      return null; // Şifre geçersiz
    }

    // Kullanıcı kimlik bilgileri doğru, kullanıcı nesnesini döndür
    // NOT: Şifreyi client'a gönderme!
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };
  } catch (error) {
    console.error("Kullanıcı girişi sırasında hata:", error);
    return null;
  }
}
