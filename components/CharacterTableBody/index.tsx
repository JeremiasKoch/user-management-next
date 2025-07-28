import { Character } from '@/api';

type CharacterTableBodyProps = {
  data: Character[];
  columns: { key: string; label: string }[];
};

export const CharacterTableBody = ({
  data,
  columns,
}: CharacterTableBodyProps) => {
  return (
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
        {data.map((character) => (
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
  );
};

export default CharacterTableBody;
