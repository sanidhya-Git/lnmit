import React, { useEffect, useState } from 'react';
import { TodoItem } from '../types';
import { storage } from '../storage';
import { uid } from '../utils';

export default function TodoList() {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [text, setText] = useState('');

  useEffect(() => {
    (async () => {
      const t = await storage.getTodos();
      setTodos(t);
    })();
  }, []);

  async function add() {
    if (!text.trim()) return;
    const n: TodoItem = { id: uid('t'), text: text.trim(), done: false, createdAt: Date.now() };
    const next = [n, ...todos];
    setTodos(next);
    setText('');
    await storage.saveTodos(next);
  }

  async function toggle(id: string) {
    const next = todos.map((t) => (t.id === id ? { ...t, done: !t.done } : t));
    setTodos(next);
    await storage.saveTodos(next);
  }

  async function remove(id: string) {
    const next = todos.filter((t) => t.id !== id);
    setTodos(next);
    await storage.saveTodos(next);
  }

  return (
    <section className="p-4 rounded-lg bg-white/70 backdrop-blur-sm shadow-sm">
      <div className="flex items-center gap-2">
        <input value={text} onChange={(e) => setText(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && add()} placeholder="Add a task..." className="flex-1 p-2 rounded border" />
        <button onClick={add} className="px-3 py-1 rounded bg-sky-600 text-white">Add</button>
      </div>

      <ul className="mt-3 space-y-2">
        {todos.map((t) => (
          <li key={t.id} className="flex items-center justify-between">
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={t.done} onChange={() => toggle(t.id)} className="w-4 h-4" />
              <span className={t.done ? 'line-through text-slate-400' : ''}>{t.text}</span>
            </label>
            <button onClick={() => remove(t.id)} className="text-xs text-red-500">✕</button>
          </li>
        ))}
      </ul>
    </section>
  );
}
