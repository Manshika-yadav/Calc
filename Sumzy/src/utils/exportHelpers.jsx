import { saveAs } from 'file-saver'

export function exportHistoryAsTxt(history) {
  const blob = new Blob([history.join('\n')], { type: 'text/plain;charset=utf-8' })
  saveAs(blob, 'calculator-history.txt')
}

export function exportHistoryAsCsv(history) {
  const csv = history.map(h => `"${h.replace(/"/g, '""')}"`).join('\n')
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' })
  saveAs(blob, 'calculator-history.csv')
}
