import React from 'react'

export default function NavTabs({ active, setActive }) {
  const tabs = ['Calculator', 'Converter', 'Finance', 'Graph', 'History']
  return (
    <nav className="flex gap-2 mb-4">
      {tabs.map(t => (
        <button
          key={t}
          onClick={() => setActive(t)}
          className={`px-3 py-1 rounded-md font-medium transition-all
            ${active === t ? 'bg-gray-300 dark:bg-neutral-700' : 'bg-transparent'}`}
        >
          {t}
        </button>
      ))}
    </nav>
  )
}
