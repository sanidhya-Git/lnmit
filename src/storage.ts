import { TodoItem, Settings } from './types';

const DEFAULT_SETTINGS: Settings = {
  theme: 'auto',
  showWeather: false,
  showQuotes: true,
  pomodoroLength: 25
};

const STORAGE_KEYS = {
  TODOS: 'todos',
  SETTINGS: 'settings',
  BACKGROUND: 'background'
};

export const storage = {
  async getSettings(): Promise<Settings> {
    const r = await chrome.storage.sync.get(STORAGE_KEYS.SETTINGS);
    return { ...DEFAULT_SETTINGS, ...(r[STORAGE_KEYS.SETTINGS] || {}) };
  },
  async setSettings(settings: Partial<Settings>) {
    const existing = await this.getSettings();
    const merged = { ...existing, ...settings };
    await chrome.storage.sync.set({ [STORAGE_KEYS.SETTINGS]: merged });
    return merged;
  },
  async getTodos(): Promise<TodoItem[]> {
    const r = await chrome.storage.sync.get(STORAGE_KEYS.TODOS);
    return r[STORAGE_KEYS.TODOS] || [];
  },
  async saveTodos(todos: TodoItem[]) {
    await chrome.storage.sync.set({ [STORAGE_KEYS.TODOS]: todos });
  },
  // simple utility to clear data for dev/demo
  async clearAll() {
    await chrome.storage.sync.clear();
  }
};
