'use client';

import { useMemo } from 'react';
import { Character, CharacterListResponse } from '@/api';
import { ArrowDown } from '../icons';
import { FilterType } from '@/types';
import CharacterFilters from '../CharactersFilters';
import { useRickAndMortyFilterStore } from '@/store/rickAndMortyFilters';
import { useDebounce } from '@/utils/debounce';
import { useLogStore } from '@/store/useLogStore';
import { usePaginationStore } from '@/store/usePaginationStore';
import { TableSkeleton } from '../LoaderSkeleton';

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

  const allData = useMemo(() => data?.results || [], [data]);

  const filtersMap = useRickAndMortyFilterStore((state) => state.filters);
  const filters = filtersMap[tableId] || { name: '', status: '', gender: '' };

  const nameFilter = useDebounce(filters.name.toLowerCase(), 400);
  const statusFilter = filters.status.toLowerCase();
  const genderFilter = filters.gender.toLowerCase();

  const hasFilters = !!nameFilter || !!statusFilter || !!genderFilter;

  const filteredData = useMemo(() => {
    if (!hasFilters) return allData;

    return allData.filter((character) => {
      const matchesName = nameFilter
        ? character.name.toLowerCase().includes(nameFilter)
        : true;
      const matchesStatus = statusFilter
        ? character.status.toLowerCase() === statusFilter
        : true;
      const matchesGender = genderFilter
        ? character.gender.toLowerCase() === genderFilter
        : true;

      return matchesName && matchesStatus && matchesGender;
    });
  }, [allData, nameFilter, statusFilter, genderFilter, hasFilters]);

  const totalVisiblePages = totalPages;
  const paginatedData = hasFilters ? filteredData : allData;
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
              <table className="min-w-full mt-2">
                <thead>
                  <tr>
                    {columns.map((col) => (
                      <th
                        key={col.key}
                        className="border border-gray-400 px-4 py-2 text-left text-sm font-medium text-gray-700"
                      >
                        {col.label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {paginatedData.map((character) => (
                    <tr
                      key={character.id}
                      className="hover:bg-gray-200 transition-colors duration-200"
                    >
                      {columns.map((col) => (
                        <td
                          key={col.key}
                          className="border border-gray-400 px-4 py-2 text-sm text-gray-700"
                        >
                          {String(character[col.key as keyof Character])}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>

              {!hasFilters && !isLoading && (
                <div className="flex gap-2 mt-2 items-center">
                  <button
                    onClick={() => {
                      onPageChange(page - 1);
                      addLog('Previous page clicked', {
                        tableId,
                        page: page - 1,
                      });
                    }}
                    disabled={page === 1}
                    className="px-2 py-1 bg-gray-300 rounded disabled:opacity-50"
                  >
                    Previous
                  </button>
                  <span>
                    Page {page} of {totalVisiblePages}
                  </span>
                  <button
                    onClick={() => {
                      onPageChange(page + 1);
                      addLog('Next page clicked', { tableId, page: page + 1 });
                    }}
                    disabled={page === totalVisiblePages}
                    className="px-2 py-1 bg-gray-300 rounded disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default TableToggle;
