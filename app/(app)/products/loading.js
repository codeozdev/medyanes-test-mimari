export default function ProductsLoading() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center mb-6">
        <div className="h-8 w-32 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-10 w-36 bg-gray-200 rounded animate-pulse"></div>
      </div>

      {/* Filter Skeleton */}
      <div className="h-40 bg-gray-100 rounded-lg animate-pulse mb-6"></div>

      {/* Products Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="bg-gray-100 p-4 rounded-lg animate-pulse">
            <div className="h-6 w-3/4 bg-gray-200 rounded mb-4"></div>
            <div className="h-4 w-1/4 bg-gray-200 rounded mb-4"></div>
            <div className="h-16 bg-gray-200 rounded mb-4"></div>
            <div className="flex justify-between items-center">
              <div className="h-6 w-1/4 bg-gray-200 rounded"></div>
              <div className="h-8 w-24 bg-gray-200 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
