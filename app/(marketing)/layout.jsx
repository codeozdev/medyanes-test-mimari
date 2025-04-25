export default function MarketingLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-gray-900">
              <a href="/">My Fullstack App</a>
            </h1>
          </div>
          <nav className="flex space-x-4">
            <a href="/" className="text-gray-600 hover:text-gray-900">
              Ana Sayfa
            </a>
            <a href="/about" className="text-gray-600 hover:text-gray-900">
              Hakkımızda
            </a>
            <a href="/dashboard" className="text-gray-600 hover:text-gray-900">
              Giriş
            </a>
          </nav>
        </div>
      </header>

      <main className="flex-grow">{children}</main>

      <footer className="bg-gray-800 text-white">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <p className="text-center">
            &copy; {new Date().getFullYear()} My Fullstack App. Tüm hakları saklıdır.
          </p>
        </div>
      </footer>
    </div>
  );
}
