import React from 'react'

export default function ScientificMode({ onSelect }) {
  const scis = ['sin(', 'cos(', 'tan(', 'log(', '√(', '^', 'π']
  return (
    <div className="grid grid-cols-4 gap-3 mt-3">
      {scis.map(s => (
        <button key={s} onClick={() => onSelect(s)}
          className="p-2 rounded-lg bg-gray-200 dark:bg-slate-300">{s}</button>
      ))}
    </div>
  )
}
