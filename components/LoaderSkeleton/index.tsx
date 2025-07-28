export const TableSkeleton = ({
  rows = 10,
  columns = 2,
}: {
  rows?: number;
  columns?: number;
}) => (
  <div className="mt-2 border border-gray-200 w-full animate-pulse">
    <div className="grid grid-cols-1 sm:grid-cols-1">
      {[...Array(rows)].map((_, i) => (
        <div
          key={i}
          className="flex gap-4 border-b border-gray-200 px-4 py-2 items-center"
        >
          {[...Array(columns)].map((_, j) => (
            <div key={j} className="h-4 bg-gray-300 rounded w-1/3"></div>
          ))}
        </div>
      ))}
    </div>
  </div>
);

export const ButtonSkeleton = () => (
  <div className="h-9 w-40 bg-gray-300 rounded animate-pulse mb-2"></div>
);
