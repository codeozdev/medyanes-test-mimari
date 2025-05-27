import prisma from "@/lib/prisma";

// GET ALL
export async function getAllData(tableName, options = {}) {
  try {
    const { where = {}, orderBy = {}, include = {} } = options;
    return await prisma[tableName].findMany({
      where,
      orderBy,
      include,
    });
  } catch (error) {
    return { error: error.message };
  }
}

//MANY POST
export async function createNewDataMany(tableName, newData) {
  try {
    return await prisma[tableName].createMany({data: newData});
  } catch (error) {
    return { error: error.message };
  }
}

// POST
export async function createNewData(tableName, newData) {
  try {
    return await prisma[tableName].create({data: newData});
  } catch (error) {
    return { error: error.message };
  }
}

// GET BY UNIQUE ONE VALUE
export async function getDataByUnique(tableName, where, include = {}) {
  try {
    return await prisma[tableName].findUnique({
      where: where,
      include,
    });
  } catch (error) {
    return { error: error.message };
  }
}

// GET BY UNIQUE MANY VALUES
export async function getDataByMany(tableName, where, options = {}) {
  try {
    const { orderBy = {}, include = {} } = options;
    return await prisma[tableName].findMany({
      where: where,
      orderBy,
      include,
    });
  } catch (error) {
    return { error: error.message };
  }
}

// UPDATE
export async function updateDataByAny(tableName, where, newData, include = {}) {
  try {
    return await prisma[tableName].update({
      where: where,
      data: newData,
      include,
    });
  } catch (error) {
    return { error: error.message };
  }
}

//DELETE
export async function deleteDataByAny(tableName, where) {
  try {
    return await prisma[tableName].delete({where: where});
  } catch (error) {
    return { error: error.message };
  }
}

//DELETE MANY
export async function deleteDataByMany(tableName, where) {
  try {
    return await prisma[tableName].deleteMany({where: where});
  } catch (error) {
    return { error: error.message };
  }
}

//DELETE ALL
export async function deleteDataAll(tableName) {
  try {
    return await prisma[tableName].deleteMany({});
  } catch (error) {
    return { error: error.message };
  }
}

// Toplu export su an kullanilmiyor fakat action.js icinde bu cagirilabilir
const prismaOperations = {
  getAllData,
  createNewData,
  createNewDataMany,
  getDataByUnique,
  getDataByMany,
  updateDataByAny,
  deleteDataByAny,
  deleteDataByMany,
  deleteDataAll,
};

export default prismaOperations;