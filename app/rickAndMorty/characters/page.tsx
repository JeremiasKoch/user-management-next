'use client';

import CharactersTableManager from './components/CharacterTableManager';
import StoredCharactersTableManager from './components/StoredCharactersTableManager';

const columns = [
  { key: 'name', label: 'Name' },
  { key: 'status', label: 'Status' },
  { key: 'gender', label: 'Gender' },
];

export default function CharactersPage() {
  return (
    <div className="flex flex-col gap-6">
      <CharactersTableManager title="Characters" columns={columns} />
      <StoredCharactersTableManager
        title="Stored Characters"
        columns={columns}
      />
    </div>
  );
}
