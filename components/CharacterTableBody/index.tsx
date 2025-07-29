type CharacterTableBodyProps<T> = {
  data: T[];
  columns: { key: string; label: string }[];
};

export const CharacterTableBody = <T,>({
  data,
  columns,
}: CharacterTableBodyProps<T>) => {
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
            className="hover:bg-gray-200 transition-colors duration-200"
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
