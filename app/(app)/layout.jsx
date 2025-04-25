// app/(app)/layout.jsx
import LogoutButton from "@/features/auth/components/LogoutButton.client";
import { auth } from "@/lib/auth";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function AppLayout({ children }) {
  const session = await auth();

  // Eğer oturum yoksa login sayfasına yönlendir
  if (!session) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white">
        <div className="p-4">
          <Link href="/" className="text-xl font-bold">
            My Fullstack App
          </Link>
        </div>
        <nav className="mt-6">
          <ul>
            <li>
              <a href="/dashboard" className="block px-4 py-2 hover:bg-gray-700">
                Dashboard
              </a>
            </li>
            <li>
              <a href="/products" className="block px-4 py-2 hover:bg-gray-700">
                Ürünler
              </a>
            </li>
            <li>
              <LogoutButton className="block px-4 py-2 hover:bg-gray-700 w-full text-left" />
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow">
          <div className="px-4 py-6 flex justify-between items-center">
            <h1 className="text-2xl font-semibold text-gray-900">Admin Panel</h1>
            <div className="flex items-center">
              <span className="mr-4">{session?.user?.name || "Kullanıcı"}</span>
              <div className="w-8 h-8 rounded-full bg-gray-300"></div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6 bg-gray-100">{children}</main>
      </div>
    </div>
  );
}
