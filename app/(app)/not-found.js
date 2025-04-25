import Link from "next/link";

export default function NotFound() {
  return (
    <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg mx-auto my-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Sayfa Bulunamadı</h2>
        <p>Aradığınız sayfa bulunamadı veya yetkiniz olmayabilir.</p>
        <div className="flex justify-center space-x-4">
          <Link
            href="/dashboard"
            className="px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700">
            Dashboard&apos;a Dön
          </Link>
          <Link
            href="/"
            className="px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-50">
            Ana Sayfaya Dön
          </Link>
        </div>
      </div>
    </div>
  );
}
