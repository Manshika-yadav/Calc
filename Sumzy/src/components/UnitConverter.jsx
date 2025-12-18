import React, { useState, useEffect } from 'react'

const converters = {
  length: { units: ['m','cm','mm','km','in','ft'], toMeters: { m:1, cm:0.01, mm:0.001, km:1000, in:0.0254, ft:0.3048 } },
  weight: { units: ['kg','g','mg','lb'], toKg: { kg:1, g:0.001, mg:0.000001, lb:0.453592 } },
  temp: { units: ['C','F','K'] }
}

export default function UnitConverter(){
  const [mode, setMode] = useState('length')
  const [fromUnit, setFromUnit] = useState(converters[mode].units[0])
  const [toUnit, setToUnit] = useState(converters[mode].units[1])
  const [value, setValue] = useState('')

  useEffect(() => {
    setFromUnit(converters[mode].units[0])
    setToUnit(converters[mode].units[1])
    setValue('')
  }, [mode])

  const convert = () => {
    if (!value) return ''
    const v = parseFloat(value)
    if (isNaN(v)) return 'NaN'
    if (mode === 'length'){
      const meters = v * converters.length.toMeters[fromUnit]
      return meters / converters.length.toMeters[toUnit]
    }
    if (mode === 'weight'){
      const kgs = v * converters.weight.toKg[fromUnit]
      return kgs / converters.weight.toKg[toUnit]
    }
    if (mode === 'temp'){
      if (fromUnit==='C') return toUnit==='F' ? (v*9/5)+32 : v+273.15
      if (fromUnit==='F') return toUnit==='C' ? (v-32)*5/9 : (v-32)*5/9+273.15
      if (fromUnit==='K') return toUnit==='C' ? v-273.15 : (v-273.15)*9/5+32
    }
    return ''
  }

  return (
    <div>
      <div className="flex gap-2 mb-3">
        {['length','weight','temp'].map(m => (
          <button key={m} onClick={()=>setMode(m)} className={`px-3 py-1 rounded ${mode===m?'bg-gray-300':''}`}>{m.charAt(0).toUpperCase()+m.slice(1)}</button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-3 items-center">
        <input value={value} onChange={e=>setValue(e.target.value)} placeholder="value" className="p-2 rounded bg-gray-200" />
        <div></div>
        <select value={fromUnit} onChange={e=>setFromUnit(e.target.value)} className="p-2 rounded bg-slate-200">
          {converters[mode].units.map(u=><option key={u} value={u}>{u}</option>)}
        </select>
        <select value={toUnit} onChange={e=>setToUnit(e.target.value)} className="p-2 rounded bg-slate-200">
          {converters[mode].units.map(u=><option key={u} value={u}>{u}</option>)}
        </select>
        <div className="col-span-2 py-2 px-2 rounded bg-slate-200 ">Result: <strong>{convert()}</strong></div>
      </div>
    </div>
  )
}
