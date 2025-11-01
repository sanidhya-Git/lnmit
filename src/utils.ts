export function uid(prefix = '') {
  return prefix + Math.random().toString(36).slice(2, 9);
}

export function formatTimeMs(ms: number) {
  const total = Math.max(0, Math.floor(ms / 1000));
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}
