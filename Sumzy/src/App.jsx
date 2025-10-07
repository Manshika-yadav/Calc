import React, { useEffect, useState, useCallback } from 'react'
import NavTabs from './components/NavTabs'
import ThemeToggle from './components/ThemeToggle'
import Calculator from './components/Calculator'
import ScientificMode from './components/ScientificMode'
import History from './components/History'
import UnitConverter from './components/UnitConverter'
import FinanceTools from './components/FinanceTools'
import GraphPlotter from './components/GraphPlotter'
import { evaluateExpression } from './utils/evaluateExpression'

export default function App() {
  const initialButtons = [
    '7','8','9','/',
    '4','5','6','*',
    '1','2','3','-',
    '0','.','+','x',
    'C','=','√','π'
  ]

  const [active, setActive] = useState('Calculator')
  const [display, setDisplay] = useState('')
  const [result, setResult] = useState('')
  const [history, setHistory] = useState(() => JSON.parse(localStorage.getItem('calc_history') || '[]'))
  const [darkMode, setDarkMode] = useState(false)
  const [showScientific, setShowScientific] = useState(false)

  useEffect(() => localStorage.setItem('calc_history', JSON.stringify(history)), [history])

  const pushHistory = useCallback((entry) => setHistory(h => [...h, entry].slice(-200)), [])

  const handleEvaluate = useCallback(() => {
    if (!display) return
    try {
      const cleaned = display.replace(/×/g, '*').replace(/÷/g, '/')
      const res = evaluateExpression(cleaned)
      setResult(String(res))
      pushHistory(`${display} = ${res}`)
      setDisplay(String(res))
    } catch {
      setResult('Error')
    }
  }, [display, pushHistory])

  const handleButton = useCallback((btn) => {
    if (btn === '=') { handleEvaluate(); return }
    if (btn === 'C') { setDisplay(''); setResult(''); return }
    if (btn === 'x') { setDisplay(d => d.slice(0, -1)); return }
    if (btn === '√') {
      try {
        const res = evaluateExpression(`Math.sqrt(${display || 0})`)
        setResult(String(res))
        setDisplay(String(res))
        pushHistory(`√(${display}) = ${res}`)
      } catch { setResult('Error') }
      return
    }
    if (btn === 'π') { setDisplay(d => d + 'π'); return }

    // prevent consecutive operators
    if (/[+\-*/.]$/.test(display) && /[+\-*/.]$/.test(btn)) return

    setDisplay(d => d + btn)
  }, [display, handleEvaluate, pushHistory])

  const copyResult = async () => {
    if (!result) return
    try { await navigator.clipboard.writeText(String(result)); alert('Copied') } 
    catch { alert('Copy failed') }
  }

  const selectHistory = (entry) => {
    const left = entry.split('=')[0].trim()
    setDisplay(left)
  }

  return (
    <div className={`min-h-screen p-6 transition-all ${darkMode ? 'bg-neutral-900 text-white':'bg-gray-100 text-gray-900'}`}>
      <div className="max-w-3xl mx-auto">
        <header className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-semibold">Sumzy</h1>
          <div className="flex items-center gap-3">
            <NavTabs active={active} setActive={setActive} />
            <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
          </div>
        </header>

        <main className={`p-6 rounded-2xl ${darkMode ? 'bg-neutral-800':'bg-white'} shadow-md`}>
          {active === 'Calculator' && (
            <div>
              <div className="flex items-center justify-between mb-3">
               
                <button onClick={() => setShowScientific(s => !s)} className="text-sm underline">
                  {showScientific ? 'Basic' : 'Scientific'}
                </button>
              </div>

              <Calculator
                display={display}
                result={result}
                onButton={handleButton}
                buttons={initialButtons}
                onCopy={copyResult}
              />

              {showScientific && <ScientificMode onSelect={(s) => {
                if (s === '^') setDisplay(d => d + '^')
                else if (s === '√(') setDisplay(d => d + '√(')
                else if (s === 'π') setDisplay(d => d + 'π')
                else setDisplay(d => d + s)
              }} />}
            </div>
          )}

          {active === 'Converter' && <UnitConverter />}
          {active === 'Finance' && <FinanceTools />}
          {active === 'Graph' && <GraphPlotter />}
          {active === 'History' && <History items={history} onSelect={selectHistory} />}
        </main>

        <footer className="text-sm text-center mt-4 text-gray-500">
          Built with React, Tailwind, Framer Motion. Voice input intentionally excluded.
        </footer>
      </div>
    </div>
  )
}

