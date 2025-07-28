'use client';

import { FilterType, GenderFilter, StatusFilter } from '@/types';
import { useRickAndMortyFilterStore } from '@/store/rickAndMortyFilters';
import { useLogStore } from '@/store/useLogStore';

type CharacterFiltersProps = {
  filterTypes: FilterType[];
  tableId: string;
};

export const CharacterFilters = ({
  filterTypes,
  tableId,
}: CharacterFiltersProps) => {
  const filtersMap = useRickAndMortyFilterStore((state) => state.filters);
  const filters = filtersMap[tableId] || { name: '', status: '', gender: '' };
  const setFilter = useRickAndMortyFilterStore((state) => state.setFilter);
  const addLog = useLogStore((state) => state.addLog);

  return (
    <div className="flex flex-wrap gap-4 mb-4">
      {filterTypes.includes('name') && (
        <input
          type="text"
          value={filters.name}
          onChange={(e) => {
            setFilter(tableId, 'name', e.target.value);
            addLog('Name filter changed', {
              tableId,
              value: e.target.value,
            });
          }}
          placeholder="Filter by name"
          className="px-3 py-1 border rounded"
        />
      )}

      {filterTypes.includes('status') && (
        <select
          value={filters.status}
          onChange={(e) => {
            setFilter(tableId, 'status', e.target.value as StatusFilter);
            addLog('Status filter changed', {
              tableId,
              value: e.target.value,
            });
          }}
          className="px-3 py-1 border rounded"
        >
          <option value="">All statuses</option>
          <option value="alive">Alive</option>
          <option value="dead">Dead</option>
          <option value="unknown">Unknown</option>
        </select>
      )}

      {filterTypes.includes('gender') && (
        <select
          value={filters.gender}
          onChange={(e) => {
            setFilter(tableId, 'gender', e.target.value as GenderFilter);
            addLog('Gender filter changed', {
              tableId,
              value: e.target.value,
            });
          }}
          className="px-3 py-1 border rounded"
        >
          <option value="">All genders</option>
          <option value="female">Female</option>
          <option value="male">Male</option>
          <option value="genderless">Genderless</option>
          <option value="unknown">Unknown</option>
        </select>
      )}
    </div>
  );
};

export default CharacterFilters;
