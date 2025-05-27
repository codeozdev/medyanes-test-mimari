import { Skeleton } from "@/components/ui/skeleton";

export function ProductGridSkeleton({ count = 6 }) {
  return (
    <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:mt-20 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3">
      {Array(count)
        .fill(0)
        .map((_, i) => (
          <div
            key={i}
            className="bg-white overflow-hidden shadow rounded-lg w-full sm:w-auto"
            style={{
              height: "182px",
              maxWidth: "100%",
              width: "100%",
            }}>
            <div className="p-6 h-full flex flex-col">
              <div className="flex justify-between items-start">
                <div>
                  <Skeleton className="h-[24px] w-full mb-1" />
                  <Skeleton className="h-[18px] w-3/4 mt-1" />
                </div>
                <Skeleton className="h-[22px] w-20 rounded-full" />
              </div>
              <div className="mt-3 flex-grow">
                <Skeleton className="h-[18px] w-full mb-1" />
                <Skeleton className="h-[18px] w-full mb-1" />
                <Skeleton className="h-[18px] w-3/4" />
              </div>
              <div className="mt-4 flex justify-between items-center">
                <Skeleton className="h-[22px] w-20" />
                <Skeleton className="h-[36px] w-24 rounded-md" />
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}
