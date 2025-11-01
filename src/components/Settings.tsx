import React, { useEffect, useState } from 'react';
import { storage } from '../storage';
import { Settings as SettingsType } from '../types';

export default function SettingsPanel() {
  const [settings, setSettings] = useState<SettingsType | null>(null);

  useEffect(() => {
    (async () => {
      setSettings(await storage.getSettings());
    })();
  }, []);

  if (!settings) return null;

  async function update(partial: Partial<SettingsType>) {
    const s = await storage.setSettings(partial);
    setSettings(s);
  }

  return (
    <section className="p-4 rounded-lg bg-white/70 backdrop-blur-sm shadow-sm">
      <h3 className="text-sm font-medium">Settings</h3>

      <div className="mt-3 space-y-2 text-sm">
        {/* Theme Selector */}
        <div className="flex items-center justify-between">
          <label>Theme</label>
          <select
            value={settings.theme}
            onChange={(e) => update({ theme: e.target.value as any })}
            className="border rounded px-2 py-1"
          >
            <option value="auto">Auto</option>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>

        {/* Pomodoro Length */}
        <div className="flex items-center justify-between">
          <label>Pomodoro length (minutes)</label>
          <input
            type="number"
            min={5}
            max={120}
            value={settings.pomodoroLength}
            onChange={(e) =>
              update({ pomodoroLength: Number(e.target.value) || 25 })
            }
            className="w-20 border rounded px-2 py-1"
          />
        </div>

        <div className="text-xs text-slate-500">
          Settings are stored using Chrome Sync. No external servers are used by
          default.
        </div>
      </div>
    </section>
  );
}
