export type TodoItem = {
  id: string;
  text: string;
  done: boolean;
  createdAt: number;
};

export type Settings = {
  theme: 'light' | 'dark' | 'auto';
  showWeather: boolean;
  showQuotes: boolean;
  backgroundId?: string;
  dailyFocus?: string;
  pomodoroLength?: number;
};
