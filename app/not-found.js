export default function RootNotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white px-4">
      <h2 className="text-3xl font-bold text-gray-900 mb-4">Sayfa Bulunamadı</h2>
      <p className="text-gray-600 mb-8 text-center max-w-md">
        Aradığınız sayfa bulunamadı veya taşınmış olabilir.
      </p>
      <a
        href="/"
        className="px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700">
        Ana Sayfaya Dön
      </a>
    </div>
  );
}
