'use client';

import { useRouter } from 'next/navigation';
import { columnIdProp } from '../TableToggle';

type CharacterTableBodyProps<T extends columnIdProp> = {
  data: T[];
  columns: { key: string; label: string }[];
};

export const CharacterTableBody = <T extends columnIdProp>({
  data,
  columns,
}: CharacterTableBodyProps<T>) => {
  const router = useRouter();

  const handleRowClick = (id: string) => {
    sessionStorage.setItem('scrollY', window.scrollY.toString());

    router.push(`/rickAndMorty/characters/${id}`);
  };

  return (
    <table className="min-w-full mt-2">
      <thead>
        <tr>
          {columns.map((col) => (
            <th
              key={`table-head-${col.key}`}
              className="border border-gray-400 px-4 py-2 text-left text-sm font-medium text-gray-700"
            >
              {col.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item, i) => (
          <tr
            key={i}
            className="hover:bg-gray-200 cursor-pointer transition-colors duration-200"
            onClick={() => handleRowClick(String(item.id))}
          >
            {columns.map((col) => (
              <td
                key={`table-body-${col.key}`}
                className="border border-gray-400 px-4 py-2 text-sm text-gray-700"
              >
                {String(item[col.key as keyof T])}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CharacterTableBody;
