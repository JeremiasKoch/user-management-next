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

const initialState: Pick<LogStore, 'logs'> = {
  logs: [],
};

export const useLogStore = create<LogStore>((set) => ({
  ...initialState,
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
  clearLogs: () => set({ ...initialState }),
}));
