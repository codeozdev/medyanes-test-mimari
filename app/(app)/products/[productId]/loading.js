export default function ProductDetailLoading() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center mb-6">
        <div className="h-8 w-48 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-6 w-36 bg-gray-200 rounded animate-pulse"></div>
      </div>

      {/* Product Detail Skeleton */}
      <div className="bg-white shadow overflow-hidden sm:rounded-lg animate-pulse">
        <div className="p-6">
          <div className="h-8 w-1/3 bg-gray-200 rounded mb-4"></div>
          <div className="h-4 w-1/4 bg-gray-200 rounded mb-6"></div>

          <div className="space-y-6">
            <div className="h-20 bg-gray-100 rounded"></div>
            <div className="h-12 bg-gray-100 rounded"></div>
            <div className="h-12 bg-gray-100 rounded"></div>
            <div className="h-12 bg-gray-100 rounded"></div>
          </div>

          <div className="mt-8 h-10 w-24 bg-gray-200 rounded ml-auto"></div>
        </div>
      </div>
    </div>
  );
}
