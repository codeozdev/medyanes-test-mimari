import { DashboardStats, QuickActions, RecentActivities } from "@/features/dashboard";

export default async function DashboardPage() {
  // Dashboard istatistikleri (Gerçek uygulamada bir API'den veya veritabanından çekilir)
  const stats = [
    { name: "Toplam Satış", value: "₺42,532", change: "+8%", changeType: "positive" },
    { name: "Bekleyen Siparişler", value: "24", change: "-3", changeType: "negative" },
    { name: "Toplam Ürün", value: "126", change: "+6", changeType: "positive" },
    { name: "Aktif Müşteriler", value: "2,543", change: "+12%", changeType: "positive" },
  ];

  // Son aktiviteler (Gerçek uygulamada bir API'den veya veritabanından çekilir)
  const activities = [
    { id: 1, action: "Yeni sipariş alındı", user: "Ahmet Yılmaz", timestamp: "10 dakika önce" },
    { id: 2, action: "Ürün stok güncellendi", user: "Mehmet Kaya", timestamp: "30 dakika önce" },
    { id: 3, action: "Sipariş kargoya verildi", user: "Ayşe Demir", timestamp: "1 saat önce" },
    { id: 4, action: "Yeni ürün eklendi", user: "Fatma Şahin", timestamp: "2 saat önce" },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Dashboard</h2>

      {/* Stats Grid */}
      <DashboardStats stats={stats} />

      {/* Recent Activity */}
      <RecentActivities activities={activities} />

      {/* Quick Actions */}
      <QuickActions />
    </div>
  );
}
