import React from 'react';

export default function Widgets() {
  // lightweight placeholders for weather/recent files/links
  return (
    <section className="p-4 rounded-lg bg-white/70 backdrop-blur-sm shadow-sm grid grid-cols-1 gap-3">
      <div>
        <h4 className="text-sm font-medium">Quick Links</h4>
        <div className="mt-2 flex gap-2 flex-wrap">
          <a className="px-3 py-1 rounded border text-sm" href="https://mail.google.com" target="_blank">Gmail</a>
          <a className="px-3 py-1 rounded border text-sm" href="https://calendar.google.com" target="_blank">Calendar</a>
          <a className="px-3 py-1 rounded border text-sm" href="https://drive.google.com" target="_blank">Drive</a>
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium">Weather</h4>
        <div className="mt-2 text-sm text-slate-600">Weather widget disabled in demo. Add an API key in settings to enable this.</div>
      </div>
    </section>
  );
}
