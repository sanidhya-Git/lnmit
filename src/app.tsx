import React from 'react';
import Header from './components/Header';
import FocusCard from './components/FocusedCards';

import backgrounds from './data/backgrounds.json';
import TodoList from './components/todolist';
import Timer from './components/timer';
import Quotes from './components/quotes';
import Widgets from './components/Widgets';
import Settings from './components/settings';

function Background() {
  // choose a random background on load for demo; in production we could persist an id
  const bg = backgrounds[Math.floor(Math.random() * backgrounds.length)];
  return (
    <div style={{ backgroundImage: `url(${bg.src})` }} className="fixed inset-0 bg-cover bg-center opacity-30 -z-10" />
  );
}

export default function App() {
  return (
    <div className="min-h-screen p-6">
      <Background />
      <div className="max-w-5xl mx-auto space-y-6">
        <Header />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-4">
            <FocusCard />
            <TodoList />
            <Settings />
          </div>
          <div className="space-y-4">
            <Timer />
            <Quotes />
            <Widgets />
          </div>
        </div>
      </div>
    </div>
  );
}
