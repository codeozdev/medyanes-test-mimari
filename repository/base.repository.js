import prisma from "@/lib/prisma";

export class BaseRepository {
  constructor(tableName) {
    this.tableName = tableName;
  }

  // Tüm kayıtları getir
  async getAll(filters = {}, orderBy = { updatedAt: "desc" }, include = {}) {
    try {
      return await prisma[this.tableName].findMany({
        where: filters,
        orderBy,
        include,
      });
    } catch (error) {
      throw new Error(`Veriler getirilirken hata oluştu: ${error.message}`);
    }
  }

  // ID'ye göre tek kayıt getir
  async getById(id, include = {}) {
    try {
      return await prisma[this.tableName].findUnique({
        where: { id },
        include,
      });
    } catch (error) {
      throw new Error(`Kayıt getirilirken hata oluştu: ${error.message}`);
    }
  }

  // Yeni kayıt oluştur
  async create(data, include = {}) {
    try {
      return await prisma[this.tableName].create({
        data,
        include,
      });
    } catch (error) {
      throw new Error(`Kayıt oluşturulurken hata oluştu: ${error.message}`);
    }
  }

  // Kayıt güncelle
  async update(id, data, include = {}) {
    try {
      return await prisma[this.tableName].update({
        where: { id },
        data,
        include,
      });
    } catch (error) {
      throw new Error(`Kayıt güncellenirken hata oluştu: ${error.message}`);
    }
  }

  // Kayıt sil
  async delete(id) {
    try {
      return await prisma[this.tableName].delete({
        where: { id },
      });
    } catch (error) {
      throw new Error(`Kayıt silinirken hata oluştu: ${error.message}`);
    }
  }

  // Toplu kayıt oluştur
  async createMany(data) {
    try {
      return await prisma[this.tableName].createMany({
        data,
      });
    } catch (error) {
      throw new Error(`Toplu kayıt oluşturulurken hata oluştu: ${error.message}`);
    }
  }

  // Toplu kayıt sil
  async deleteMany(where) {
    try {
      return await prisma[this.tableName].deleteMany({
        where,
      });
    } catch (error) {
      throw new Error(`Toplu kayıt silinirken hata oluştu: ${error.message}`);
    }
  }

  // Özel sorgu
  async findFirst(where, include = {}) {
    try {
      return await prisma[this.tableName].findFirst({
        where,
        include,
      });
    } catch (error) {
      throw new Error(`Kayıt aranırken hata oluştu: ${error.message}`);
    }
  }

  // Özel sorgu (çoklu)
  async findMany(where, include = {}) {
    try {
      return await prisma[this.tableName].findMany({
        where,
        include,
      });
    } catch (error) {
      throw new Error(`Kayıtlar aranırken hata oluştu: ${error.message}`);
    }
  }
}
