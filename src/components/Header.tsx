import React from 'react';

export default function Header() {
  return (
    <header className="flex items-center justify-between p-4">
      <div className="flex items-center space-x-3">
        <img src="/assets/logo-48.png" alt="MindfulTab" className="w-10 h-10 rounded-md" />
        <div>
          <h1 className="text-lg font-semibold">MindfulTab</h1>
          <p className="text-xs text-slate-600">A calm new tab for focused work</p>
        </div>
      </div>
      <div className="text-sm text-slate-600">Tip: Press <kbd className="px-2 py-1 bg-slate-100 rounded border">T</kbd> to toggle timer</div>
    </header>
  );
}
