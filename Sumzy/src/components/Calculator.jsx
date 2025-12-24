import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

export default function Calculator({ display, result, onButton, buttons, onCopy }) {
  const inputRef = useRef(null)

  useEffect(() => { if (inputRef.current) inputRef.current.focus() }, [])

  useEffect(() => {
    const handleKey = (e) => {
      const k = e.key
      if ((/^[0-9]$/.test(k)) || ['+', '-', '*', '/', '.', '(', ')'].includes(k)) onButton(k)
      else if (k === 'Enter') { e.preventDefault(); onButton('=') }
      else if (k === 'Backspace') onButton('x')
      else if (k === 'Escape') onButton('C')
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onButton])

  return (
    <div>
      <input ref={inputRef} value={display} readOnly
        className="
              w-full
              rounded-xl
              border border-gray-300
              px-4 py-3
              text-lg
              font-medium
              bg-gray-50
              outline-none
              focus:border-gray-400
              focus:ring-2
              focus:ring-gray-200
              transition-all
     " />
      <div className="text-right mt-2 text-gray-300 dark:text-gray-200">{result}</div>

      <div className="grid grid-cols-4 gap-3 mt-4">
        {buttons.map(btn => (
          <motion.button whileTap={{ scale: 0.96 }} key={btn} onClick={() => onButton(btn)}
            className={`p-3 rounded-xl text-lg font-medium shadow-sm transition-all
              ${btn === '=' ? 'col-span-2 bg-gray-400 text-white' : ''}
              ${btn === 'C' ? 'col-span-2 bg-slate-400 text-white' : ''}
              ${!['=', 'C'].includes(btn) ? 'bg-gray-200 dark:bg-slate-300' : ''}`}>
            {btn}
          </motion.button>
        ))}
      </div>

      <div className="flex justify-end mt-2">
        <button onClick={onCopy} className="text-sm underline">Copy result</button>
      </div>
    </div>
  )
}

