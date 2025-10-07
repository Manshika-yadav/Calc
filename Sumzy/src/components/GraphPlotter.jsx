import React, { useState } from 'react'
import { Line } from 'react-chartjs-2'
import { Chart, LineElement, PointElement, LinearScale, CategoryScale } from 'chart.js'
Chart.register(LineElement, PointElement, LinearScale, CategoryScale)

export default function GraphPlotter(){
  const [expr,setExpr]=useState('sin(x)'), [data,setData]=useState(null)

  const plot = () => {
    const xs=[], ys=[]
    for(let x=-10;x<=10;x+=0.5){
      xs.push(x)
      try{
        const e = expr.replace(/\^/g,'**')
        const fn = new Function('x','with(Math){ return '+e+' }')
        const y = fn(x)
        ys.push(typeof y==='number' && isFinite(y) ? y : null)
      }catch{ ys.push(null) }
    }
    setData({ labels: xs, datasets:[{ label: expr, data: ys, tension:0.3 }] })
  }

  return (
    <div>
      <div className="flex gap-2 mb-2">
        <input value={expr} onChange={e=>setExpr(e.target.value)} className="p-2 rounded w-full"/>
        <button onClick={plot} className="px-3 py-2 rounded bg-gray-300">Plot</button>
      </div>
      {data && <div className="h-64"><Line data={data}/></div>}
    </div>
  )
}
