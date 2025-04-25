/**
 * Prisma client için global instance.
 * Uygulama genelinde kullanılacak olan bu instance, her sorguda
 * yeni bir bağlantı başlatmak yerine aynı bağlantıyı kullanır.
 *
 * Gerçek bir uygulamada bu dosya aktif olur ve Prisma'yı
 * configure ederek kullanıma hazır hale getirir.
 */

import { PrismaClient } from "@prisma/client";

// PrismaClient'in tekrar tekrar oluşturulmasını önlemek için global nesne olarak kullanıyoruz
const globalForPrisma = global;

export const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;

// NOT: Bu dosya şu an için kullanılmıyor, ancak gerçek bir veritabanı
// bağlantısı yapılacağı zaman aktif hale getirilmeli ve
// yorum satırları kaldırılmalıdır.
