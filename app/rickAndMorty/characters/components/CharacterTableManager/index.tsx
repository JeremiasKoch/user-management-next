'use client';

import { useEffect, useState } from 'react';
import {
  Character,
  useCharactersQuery,
  useFilteredCharactersQuery,
} from '@/api';
import { TableToggle } from '@/components';
import { useDebounce } from '@/utils/debounce';
import { useCharactersStore, useLogStore } from '@/store';
import { GenericFilter } from '@/components/GenericFilter';

type CharactersTableManagerProps = {
  title?: string;
  columns: { key: string; label: string }[];
  pageSize?: number;
};

export const CharactersTableManager = ({
  title = 'Characters',
  columns,
  pageSize = 10,
}: CharactersTableManagerProps) => {
  const [page, setPage] = useState(1);
  const [nameFilter, setNameFilter] = useState('');
  const addLog = useLogStore((state) => state.addLog);

  const debouncedName = useDebounce(nameFilter, 1000);
  const setCharacters = useCharactersStore((state) => state.setCharacters);
  const clearCharacters = useCharactersStore((state) => state.clearCharacters);

  const isFiltering = !!debouncedName;

  const {
    data: pagedData,
    isLoading: isLoadingPaged,
    isError: isErrorPaged,
    error: errorPaged,
  } = useCharactersQuery(page);

  const {
    data: filteredData,
    isLoading: isLoadingFiltered,
    isError: isErrorFiltered,
    error: errorFiltered,
  } = useFilteredCharactersQuery(debouncedName);

  const rawData = isFiltering ? filteredData || [] : pagedData?.results || [];

  useEffect(() => {
    if (rawData) {
      setCharacters(rawData);
    } else {
      clearCharacters();
    }
  }, [rawData]);

  const hasNoResults =
    isFiltering &&
    isErrorFiltered &&
    (filteredData === undefined || Array.isArray(filteredData));
  if (isFiltering && isErrorFiltered && !hasNoResults) throw errorFiltered;
  if (!isFiltering && isErrorPaged) throw errorPaged;

  const totalPages = isFiltering
    ? Math.ceil(rawData.length / pageSize)
    : pagedData?.info.pages || 1;

  useEffect(() => {
    if (debouncedName) {
      addLog('Filtered Characters (API)', { filter: debouncedName });
    }
  }, [debouncedName]);

  useEffect(() => {
    addLog('Page Changed (API)', { page });
  }, [page]);

  return (
    <TableToggle<Character>
      title={title}
      columns={columns}
      data={rawData}
      pageSize={pageSize}
      isLoading={isFiltering ? isLoadingFiltered : isLoadingPaged}
      manualPagination={!isFiltering}
      page={page}
      totalPages={totalPages}
      onPageChange={setPage}
    >
      {' '}
      <div className="mt-4">
        <GenericFilter
          label="name"
          value={nameFilter}
          onChange={setNameFilter}
        />
      </div>
    </TableToggle>
  );
};

export default CharactersTableManager;
