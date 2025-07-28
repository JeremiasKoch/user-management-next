'use client';

import { useCharactersQuery } from '@/api';
import { usePaginationStore } from '@/store/usePaginationStore';
import { TableToggle } from '@/components';
import { CharacterListResponse } from '@/api';
import { FilterType } from '@/types';

export type CharacterTableSectionProps = {
  tableId: string;
  columns: { key: string; label: string }[];
  title: string;
  filterTypes: FilterType[];
};

export const CharacterTableSection = ({
  tableId,
  columns,
  title,
  filterTypes,
}: CharacterTableSectionProps) => {
  const page = usePaginationStore((store) => store.pages[tableId] || 1);
  const setPage = usePaginationStore((store) => store.setPage);

  const { data, isLoading, isError, error, isFetching } =
    useCharactersQuery(page);

  if (isError) throw error;
  if (!data) return null;

  return (
    <TableToggle
      tableId={tableId}
      columns={columns}
      title={title}
      filterTypes={filterTypes}
      data={data as CharacterListResponse}
      page={page}
      totalPages={data.info.pages}
      onPageChange={(newPage) => setPage(tableId, newPage)}
      isLoading={isLoading && !isFetching}
    />
  );
};

export default CharacterTableSection;
