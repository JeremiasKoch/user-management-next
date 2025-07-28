'use client';

import { CharacterListResponse } from '@/api';
import { ArrowDown } from '../icons';
import { FilterType } from '@/types';

import { useLogStore } from '@/store/useLogStore';
import { usePaginationStore } from '@/store/usePaginationStore';
import { useFilteredCharacters } from '@/hooks';
import {
  CharacterTableBody,
  TableSkeleton,
  CharacterFilters,
  PaginationControls,
} from '@/components';

type TableToggleProps = {
  tableId: string;
  columns: { key: string; label: string }[];
  title?: string;
  filterTypes?: FilterType[];
  data: CharacterListResponse;
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  isLoading?: boolean;
};

export const TableToggle = ({
  tableId,
  columns,
  title,
  filterTypes,
  data,
  page,
  totalPages,
  onPageChange,
  isLoading = false,
}: TableToggleProps) => {
  const isTableVisible = usePaginationStore(
    (s) => s.visibility[tableId] ?? false
  );
  const toggleVisibility = usePaginationStore((s) => s.toggleVisibility);

  const addLog = useLogStore((state) => state.addLog);

  const { paginatedData, hasFilters } = useFilteredCharacters(tableId, data);

  const totalVisiblePages = totalPages;
  if (isLoading) return <TableSkeleton columns={columns.length} />;

  return (
    <div className="p-0.5 bg-gray-100">
      <button
        onClick={() => {
          addLog(`${isTableVisible ? 'Closed' : 'Opened'} table`, { tableId });
          toggleVisibility(tableId);
        }}
        className="p-2 rounded bg-gray-300 w-full hover:bg-gray-300 flex items-center justify-between gap-2"
      >
        <p>
          {isTableVisible ? 'Hide' : 'Show'} {title || 'Table'}
        </p>
        <ArrowDown
          className={`size-4 text-gray-700 transition-transform ${
            isTableVisible ? 'rotate-180' : ''
          }`}
        />
      </button>

      {isTableVisible && (
        <>
          {filterTypes && (
            <div className="mt-4">
              <CharacterFilters filterTypes={filterTypes} tableId={tableId} />
            </div>
          )}

          {paginatedData.length === 0 ? (
            <p className="mt-4 text-center text-gray-500 italic">
              No characters found with these filters.
            </p>
          ) : (
            <>
              <CharacterTableBody data={paginatedData} columns={columns} />

              {!hasFilters && !isLoading && (
                <PaginationControls
                  page={page}
                  totalPages={totalVisiblePages}
                  tableId={tableId}
                  onPageChange={onPageChange}
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
