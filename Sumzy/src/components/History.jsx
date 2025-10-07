import React from 'react'
import { exportHistoryAsTxt, exportHistoryAsCsv } from '../utils/exportHelpers'

export default function History({ items, onSelect }) {
  return (
    <div className="p-2 rounded-lg bg-gray-100 dark:bg-neutral-700 h-64 overflow-y-auto">
      <div className="flex justify-between items-center mb-2">
        <strong>History</strong>
        <div className="flex gap-2">
          <button onClick={() => exportHistoryAsTxt(items)} className="text-sm underline">Export .txt</button>
          <button onClick={() => exportHistoryAsCsv(items)} className="text-sm underline">Export .csv</button>
        </div>
      </div>

      <ul>
        {items.length === 0 && <li className="text-gray-500">No history yet</li>}
        {items.slice().reverse().map((h, idx) => (
          <li key={idx} className="py-1 cursor-pointer hover:underline" onClick={() => onSelect(h)}>
            {h}
          </li>
        ))}
      </ul>
    </div>
  )
}

