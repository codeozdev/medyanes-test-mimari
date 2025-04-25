const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  console.log(`Veritabanı başlangıç verisi ekleniyor...`);

  // Önce tüm mevcut verileri temizle
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();

  // Kategorileri oluştur
  const categories = [
    {
      name: "Telefon",
      description: "Akıllı telefonlar ve aksesuarlar",
    },
    {
      name: "Laptop",
      description: "Dizüstü bilgisayarlar ve aksesuarlar",
    },
    {
      name: "Giyim",
      description: "Erkek, kadın ve çocuk giyim ürünleri",
    },
  ];

  const createdCategories = {};

  for (const category of categories) {
    const createdCategory = await prisma.category.create({
      data: category,
    });
    createdCategories[category.name] = createdCategory;
  }

  // Ürünleri kategorilere bağlayarak oluştur
  const products = [
    {
      name: "iPhone 15",
      price: 42999,
      stock: 15,
      description: "Apple iPhone 15, 128GB, Siyah",
      status: "Aktif",
      categoryId: createdCategories["Telefon"].id,
    },
    {
      name: "Samsung Galaxy S24",
      price: 34999,
      stock: 8,
      description: "Samsung Galaxy S24, 256GB, Mor",
      status: "Aktif",
      categoryId: createdCategories["Telefon"].id,
    },
    {
      name: "MacBook Pro M3",
      price: 59999,
      stock: 5,
      description: "Apple MacBook Pro M3, 16GB RAM, 512GB SSD",
      status: "Aktif",
      categoryId: createdCategories["Laptop"].id,
    },
    {
      name: "Dell XPS 15",
      price: 49999,
      stock: 3,
      description: "Dell XPS 15, Intel i7, 32GB RAM, 1TB SSD",
      status: "Aktif",
      categoryId: createdCategories["Laptop"].id,
    },
    {
      name: "Erkek Gömlek",
      price: 799,
      stock: 45,
      description: "Slim fit erkek gömlek, Beyaz, %100 Pamuk",
      status: "Aktif",
      categoryId: createdCategories["Giyim"].id,
    },
    {
      name: "Kadın Ceket",
      price: 1299,
      stock: 22,
      description: "Sonbahar/Kış kadın ceket, Siyah",
      status: "Aktif",
      categoryId: createdCategories["Giyim"].id,
    },
  ];

  // Ürünleri ekle
  for (const product of products) {
    await prisma.product.create({
      data: product,
    });
  }

  // Örnek kullanıcı verisi
  const users = [
    {
      name: "Admin Kullanıcı",
      email: "admin@example.com",
      password: "$2a$10$GHxhQwA9qiH8bI3vdwK8AejLjhO.dfN6vbWz3LhTJjz6hNkqJkRsq", // "password123" şifrelenmiş hali
      role: "admin",
    },
    {
      name: "Test Kullanıcısı",
      email: "user@example.com",
      password: "$2a$10$GHxhQwA9qiH8bI3vdwK8AejLjhO.dfN6vbWz3LhTJjz6hNkqJkRsq", // "password123" şifrelenmiş hali
      role: "user",
    },
  ];

  // Kullanıcıları ekle
  for (const user of users) {
    await prisma.user.create({
      data: user,
    });
  }

  console.log(`Veritabanı başlangıç verisi başarıyla eklendi.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
