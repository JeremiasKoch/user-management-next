import { create } from 'zustand';

type LogEntry = {
  timestamp: string;
  action: string;
  context?: Record<string, unknown>;
};

type LogStore = {
  logs: LogEntry[];
  addLog: (action: string, context?: Record<string, unknown>) => void;
  clearLogs: () => void;
};

export const useLogStore = create<LogStore>((set) => ({
  logs: [],
  addLog: (action, context) =>
    set((state) => ({
      logs: [
        ...state.logs,
        {
          timestamp: new Date().toISOString(),
          action,
          context,
        },
      ],
    })),
  clearLogs: () => set({ logs: [] }),
}));
