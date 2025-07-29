'use client';

import { useState, useEffect, ReactNode } from 'react';
import { ArrowDown } from '../icons';
import {
  CharacterTableBody,
  TableSkeleton,
  PaginationControls,
} from '@/components';

export type TableToggleProps<T> = {
  title?: string;
  columns: { key: string; label: string }[];
  data: T[];
  pageSize?: number;
  isLoading?: boolean;
  manualPagination?: boolean;
  page?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;

  children?: ReactNode;
};

export const TableToggle = <T,>({
  title,
  columns,
  data,
  pageSize = 10,
  isLoading = false,
  manualPagination = false,
  page: externalPage,
  totalPages: externalTotalPages,
  onPageChange,
  children,
}: TableToggleProps<T>) => {
  const [isVisible, setIsVisible] = useState(false);
  const [internalPage, setInternalPage] = useState(1);

  const page = manualPagination ? externalPage || 1 : internalPage;
  const totalPages = manualPagination
    ? externalTotalPages || 1
    : Math.ceil(data.length / pageSize);

  useEffect(() => {
    if (!manualPagination) setInternalPage(1);
  }, [data, manualPagination]);

  const paginated = manualPagination
    ? data
    : data.slice((page - 1) * pageSize, page * pageSize);

  if (isLoading) return <TableSkeleton columns={columns.length} />;

  return (
    <div className="p-0.5 bg-gray-100">
      <button
        onClick={() => setIsVisible((prevIsVisible) => !prevIsVisible)}
        className="p-2 rounded bg-gray-300 w-full hover:bg-gray-300 flex items-center justify-between gap-2"
      >
        <p>
          {isVisible ? 'Hide' : 'Show'} {title || 'Table'}
        </p>
        <ArrowDown
          className={`size-4 text-gray-700 transition-transform ${
            isVisible ? 'rotate-180' : ''
          }`}
        />
      </button>

      {isVisible && (
        <>
          {children}
          {paginated.length === 0 ? (
            <p className="mt-4 text-center text-gray-500 italic">
              Data not found.
            </p>
          ) : (
            <>
              <CharacterTableBody data={paginated} columns={columns} />

              {totalPages > 1 && (
                <PaginationControls
                  page={page}
                  totalPages={totalPages}
                  tableId={title || 'default'}
                  onPageChange={
                    manualPagination ? onPageChange! : setInternalPage
                  }
                />
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default TableToggle;
