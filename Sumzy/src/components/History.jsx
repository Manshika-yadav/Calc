import React from 'react'
import { exportHistoryAsTxt, exportHistoryAsCsv } from '../utils/exportHelpers'

export default function History({ items, onSelect }) {
  return (
    <div className="p-3 rounded-xl bg-white border border-gray-200 shadow-sm h-64 overflow-y-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-3">
        <strong className="text-gray-800 text-sm">History</strong>

        <div className="flex gap-3">
          <button
            onClick={() => exportHistoryAsTxt(items)}
            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            Export .txt
          </button>
          <button
            onClick={() => exportHistoryAsCsv(items)}
            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            Export .csv
          </button>
        </div>
      </div>

      {/* List */}
      <ul className="space-y-1">
        {items.length === 0 && (
          <li className="text-gray-400 text-sm text-center py-6">
            No history yet
          </li>
        )}

        {items.slice().reverse().map((h, idx) => (
          <li
            key={idx}
            onClick={() => onSelect(h)}
            className="px-2 py-1.5 rounded-md text-sm text-gray-700 cursor-pointer
                       hover:bg-blue-50 hover:text-blue-700 transition"
          >
            {h}
          </li>
        ))}
      </ul>
    </div>
  )
}
