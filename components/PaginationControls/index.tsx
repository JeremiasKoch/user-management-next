'use client';

import { useLogStore } from '@/store/useLogStore';

type PaginationControlsProps = {
  page: number;
  totalPages: number;
  tableId: string;
  onPageChange: (page: number) => void;
};

export const PaginationControls = ({
  page,
  totalPages,
  tableId,
  onPageChange,
}: PaginationControlsProps) => {
  const addLog = useLogStore((state) => state.addLog);

  const handlePrevious = () => {
    const newPage = page - 1;
    onPageChange(newPage);
    addLog('Previous page clicked', { tableId, page: newPage });
  };

  const handleNext = () => {
    const newPage = page + 1;
    onPageChange(newPage);
    addLog('Next page clicked', { tableId, page: newPage });
  };

  return (
    <div className="flex gap-2 mt-2 items-center">
      <button
        onClick={handlePrevious}
        disabled={page === 1}
        className="px-2 py-1 bg-gray-300 rounded disabled:opacity-50"
      >
        Previous
      </button>
      <span>
        Page {page} of {totalPages}
      </span>
      <button
        onClick={handleNext}
        disabled={page === totalPages}
        className="px-2 py-1 bg-gray-300 rounded disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};

export default PaginationControls;
