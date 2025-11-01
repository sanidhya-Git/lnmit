import React, { useEffect, useState } from 'react';
import { storage } from '../storage';
import useDebouncedValue from '../hooks/useDebouncedValue';

export default function FocusCard() {
  const [focus, setFocus] = useState('');
  const debounced = useDebouncedValue(focus, 600);

  useEffect(() => {
    (async () => {
      const s = await storage.getSettings();
      setFocus(s.dailyFocus || '');
    })();
  }, []);

  useEffect(() => {
    (async () => {
      await storage.setSettings({ dailyFocus: debounced });
    })();
  }, [debounced]);

  return (
    <section className="p-4 rounded-lg bg-white/70 backdrop-blur-sm shadow-sm">
      <h2 className="text-sm text-slate-700 font-medium">Today's Focus</h2>
      <textarea
        rows={2}
        value={focus}
        onChange={(e) => setFocus(e.target.value)}
        placeholder="Write a single goal, intention, or priority for today..."
        className="w-full mt-2 p-2 rounded border border-slate-200 focus:outline-none focus:ring"
      />
      <div className="mt-2 text-xs text-slate-500">This note will appear every new tab.</div>
    </section>
  );
}
