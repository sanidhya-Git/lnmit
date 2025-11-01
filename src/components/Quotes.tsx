import React, { useEffect, useState } from 'react';
import quotes from '../data/qoutes.json';
import { storage } from '../storage';

export default function Quotes() {
  const [q, setQ] = useState('');
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    (async () => {
      const s = await storage.getSettings();
      setEnabled(!!s.showQuotes);
      rotate();
    })();
  }, []);

  function rotate() {
    const idx = Math.floor(Math.random() * quotes.length);
    setQ(quotes[idx]);
  }

  return (
    <section className="p-4 rounded-lg bg-white/70 backdrop-blur-sm shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium">Daily Inspiration</h3>
        <label className="text-xs">
          <input type="checkbox" checked={enabled} onChange={async (e) => { setEnabled(e.target.checked); await storage.setSettings({ showQuotes: e.target.checked }); }} />
          <span className="ml-1 text-slate-600">show</span>
        </label>
      </div>
      <div className="mt-3 text-slate-700">{q}</div>
      <div className="mt-3 text-right">
        <button onClick={rotate} className="text-xs px-2 py-1 rounded border">New</button>
      </div>
    </section>
  );
}
