import React, { useEffect, useRef, useState } from 'react';
import { formatTimeMs } from '../utils';
import { storage } from '../storage';

export default function Timer() {
  const [running, setRunning] = useState(false);
  const [msLeft, setMsLeft] = useState(25 * 60 * 1000);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    (async () => {
      const s = await storage.getSettings();
      const mins = s.pomodoroLength || 25;
      setMsLeft(mins * 60 * 1000);
    })();
  }, []);

  useEffect(() => {
    if (running) {
      const start = Date.now();
      const end = start + msLeft;
      intervalRef.current = window.setInterval(() => {
        const rem = Math.max(0, end - Date.now());
        setMsLeft(rem);
        if (rem <= 0) {
          setRunning(false);
          if (intervalRef.current) clearInterval(intervalRef.current);
          new Notification('Focus session complete 🎉', { body: 'Take a break or start another session.' });
        }
      }, 250);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [running]);

  function startStop() {
    setRunning((r) => !r);
  }

  function reset() {
    (async () => {
      const s = await storage.getSettings();
      const mins = s.pomodoroLength || 25;
      setMsLeft(mins * 60 * 1000);
      setRunning(false);
    })();
  }

  return (
    <section className="p-4 rounded-lg bg-white/70 backdrop-blur-sm shadow-sm text-center">
      <h3 className="text-sm text-slate-700 font-medium">Focus Timer</h3>
      <div className="text-3xl font-mono mt-3">{formatTimeMs(msLeft)}</div>
      <div className="mt-3 flex justify-center gap-3">
        <button onClick={startStop} className="px-4 py-1 rounded bg-sky-600 text-white">{running ? 'Pause' : 'Start'}</button>
        <button onClick={reset} className="px-4 py-1 rounded border">Reset</button>
      </div>
    </section>
  );
}
