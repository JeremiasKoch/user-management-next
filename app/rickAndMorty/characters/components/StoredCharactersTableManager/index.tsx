'use client';

import { useState, useMemo, useEffect } from 'react';
import { TableToggle } from '@/components';
import { useCharactersStore, useLogStore } from '@/store';
import { Character } from '@/api';
import { GenericFilter } from '@/components/GenericFilter';
import {
  CHARACTER_FILTER_ENUM,
  FILTERABLE_FIELDS_SET,
} from './constants/CHARACTER_FILTER_ENUM';

type StoredCharactersTableManagerProps = {
  title?: string;
  columns: { key: string; label: string }[];
  pageSize?: number;
};

export const StoredCharactersTableManager = ({
  title = 'Stored Characters',
  columns,
  pageSize = 10,
}: StoredCharactersTableManagerProps) => {
  const allCharacters = useCharactersStore((state) => state.characters);
  const addLog = useLogStore((state) => state.addLog);
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [page, setPage] = useState(1);

  const handleFilterChange = (key: string, value: string) => {
    setPage(1);
    setFilters((prev) => ({ ...prev, [key]: value }));
    addLog('Filtered Stored Characters', { field: key, value });
  };

  const filteredCharacters = useMemo(() => {
    return allCharacters.filter((item) =>
      columns.every(({ key }) => {
        const filterValue = filters[key];
        if (!filterValue) return true;
        const itemValue = String(
          item[key as keyof Character] ?? ''
        ).toLowerCase();
        return itemValue === filterValue.toLowerCase();
      })
    );
  }, [allCharacters, filters, columns]);

  const totalPages = Math.ceil(filteredCharacters.length / pageSize);
  const paginated = filteredCharacters.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  useEffect(() => {
    setPage(1);
    setFilters({});
  }, [allCharacters]);

  useEffect(() => {
    addLog('Page Changed (Stored)', { page });
  }, [page]);

  return (
    <TableToggle<Character>
      title={title}
      columns={columns}
      data={paginated}
      pageSize={pageSize}
      manualPagination
      page={page}
      totalPages={totalPages}
      onPageChange={setPage}
    >
      <div className="mt-4 flex flex-wrap gap-4">
        {columns
          .filter(({ key }) => FILTERABLE_FIELDS_SET.has(key.toLowerCase()))
          .map(({ key, label }) => (
            <GenericFilter
              key={key}
              label={label}
              value={filters[key] || ''}
              onChange={(val) => handleFilterChange(key, val)}
              options={CHARACTER_FILTER_ENUM[key.toLowerCase()]}
            />
          ))}
      </div>
    </TableToggle>
  );
};

export default StoredCharactersTableManager;
