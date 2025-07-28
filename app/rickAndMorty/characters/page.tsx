import { CharacterTableSection } from './components/CharacterTableSection';

const columns = [
  { key: 'name', label: 'Name' },
  { key: 'status', label: 'State' },
  { key: 'gender', label: 'Gender' },
];

export default function CharactersPage() {
  return (
    <div className="flex flex-col gap-6">
      <CharacterTableSection
        tableId="by-name"
        columns={columns}
        title="Characters by Name"
        filterTypes={['name']}
      />
      <CharacterTableSection
        tableId="by-status-gender"
        columns={columns}
        title="Characters by Status and Gender"
        filterTypes={['status', 'gender']}
      />
    </div>
  );
}
