import { prisma } from "@/lib/prisma";

export async function createUser(userData) {
  return prisma.user.create({
    data: userData,
  });
}

export async function getUserByEmail(email) {
  return prisma.user.findUnique({
    where: { email },
  });
}

export async function getUserById(id) {
  return prisma.user.findUnique({
    where: { id },
  });
}
