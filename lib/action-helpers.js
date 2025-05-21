import { getCurrentUser } from "./auth";

/**
 * Rol kontrolü yapar ve sonucu döndürür
 * @param {string} requiredRole - Gerekli rol (örn: "admin")
 * @returns {Object} Kullanıcı bilgisi veya hata
 */
export async function checkRole(requiredRole) {
  const user = await getCurrentUser();

  if (!user) {
    return {
      success: false,
      error: "Bu işlemi gerçekleştirmek için giriş yapmalısınız.",
      user: null,
    };
  }

  if (user.role !== requiredRole) {
    return {
      success: false,
      error: `Bu işlemi gerçekleştirmek için '${requiredRole}' yetkisine sahip olmalısınız.`,
      user,
    };
  }

  return {
    success: true,
    user,
  };
}
