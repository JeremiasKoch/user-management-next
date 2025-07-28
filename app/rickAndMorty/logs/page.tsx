'use client';

import { useLogStore } from '@/store/useLogStore';

const LogPage = () => {
  const logs = useLogStore((state) => state.logs);
  const clearLogs = useLogStore((state) => state.clearLogs);
  const formatDate = (iso: string) => {
    const date = new Date(iso);
    return `${date.toLocaleDateString('es-AR')} ${date.toLocaleTimeString(
      'es-AR'
    )}`;
  };
  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Logbook</h1>
      <button
        onClick={clearLogs}
        className="mb-4 px-4 py-2 bg-red-200 rounded hover:bg-red-300"
      >
        Clear logs
      </button>

      {logs.length === 0 && <p className="text-gray-500">No logs yet.</p>}

      <ul className="space-y-2">
        {logs
          .slice()
          .reverse()
          .map((log, idx) => (
            <li key={idx} className="border p-2 rounded bg-gray-200 text-sm">
              <div>
                <strong>{formatDate(log.timestamp)}</strong>
              </div>
              <div>{log.action}</div>
              {log.context && (
                <pre className="mt-1 bg-white p-1 rounded text-xs overflow-auto max-w-full">
                  {JSON.stringify(log.context, null, 2)}
                </pre>
              )}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default LogPage;
