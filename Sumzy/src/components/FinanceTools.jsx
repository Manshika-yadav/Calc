import React, { useState } from 'react'

export default function FinanceTools(){
  const [amount,setAmount]=useState(''), [gstRate,setGstRate]=useState(18)
  const [price,setPrice]=useState(''), [disc,setDisc]=useState('')
  const [principal,setPrincipal]=useState(''), [annualRate,setAnnualRate]=useState(''), [tenureMonths,setTenureMonths]=useState('')

  const calcGst = () => {
    const a = parseFloat(amount)||0, r=parseFloat(gstRate)||0
    const tax = (a*r)/100
    return { tax, total: a+tax }
  }

  const calcDiscount = () => { const p=parseFloat(price)||0, d=parseFloat(disc)||0; return p-(p*d/100) }
  const calcEmi = () => {
    const P=parseFloat(principal)||0, r=(parseFloat(annualRate)||0)/1200, n=parseInt(tenureMonths)||0
    if(n===0) return { emi:0, total:0, interest:0 }
    const emi=(P*r*Math.pow(1+r,n))/(Math.pow(1+r,n)-1)
    const total=emi*n, interest=total-P
    return { emi:emi.toFixed(2), total:total.toFixed(2), interest:interest.toFixed(2) }
  }

  const gst=calcGst(), discount=calcDiscount(), emi=calcEmi()

  return (
    <div className="space-y-4">
      <div className="p-3 rounded bg-gray-50">
        <h4 className="font-semibold">GST Calculator</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
          <input value={amount} onChange={e=>setAmount(e.target.value)} placeholder="Amount" className="p-2 rounded px-2 bg-slate-200"/>
          <input value={gstRate} onChange={e=>setGstRate(e.target.value)} placeholder="GST %" className="p-2 rounded bg-slate-200"/>
         <div className="col-span-1 sm:col-span-2 break-all">
           Tax: <strong>{gst.tax.toFixed(2)}</strong> | Total: <strong>{gst.total.toFixed(2)}</strong></div>
        </div>
      </div>

      <div className="p-3 rounded bg-gray-50">
        <h4 className="font-semibold">Discount Calculator</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
          <input value={price} onChange={e=>setPrice(e.target.value)} placeholder="Original Price" className="p-2 rounded bg-slate-200"/>
          <input value={disc} onChange={e=>setDisc(e.target.value)} placeholder="Discount %" className="p-2 rounded bg-slate-200"/>
          <div className="col-span-1 sm:col-span-2 break-all">
            Discounted Price: <strong>{discount}</strong></div>
        </div>
      </div>

      <div className="p-3 rounded bg-gray-50">
        <h4 className="font-semibold">EMI Calculator</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
          <input value={principal} onChange={e=>setPrincipal(e.target.value)} placeholder="Principal" className="p-2 rounded bg-slate-200"/>
          <input value={annualRate} onChange={e=>setAnnualRate(e.target.value)} placeholder="Annual Rate (%)" className="p-2 rounded bg-slate-200"/>
          <input value={tenureMonths} onChange={e=>setTenureMonths(e.target.value)} placeholder="Tenure (months)" className="p-2 rounded bg-slate-200"/>
          <div className="col-span-1 sm:col-span-2 break-all">
            EMI: <strong>{emi.emi}</strong> | Total: <strong>{emi.total}</strong> | Interest: <strong>{emi.interest}</strong></div>
        </div>
      </div>
    </div>
  )
}
