export default function Footer() {
  return (
    <div className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <p className="text-center">
          &copy; {new Date().getFullYear()} My Fullstack App. Tüm hakları saklıdır.
        </p>
      </div>
    </div>
  );
}
