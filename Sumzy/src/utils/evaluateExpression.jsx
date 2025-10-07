export function evaluateExpression(expr) {
  const safeExpr = expr.replace(/√/g,'Math.sqrt').replace(/π/g,'Math.PI').replace(/\^/g,'**')
  try {
    const fn = new Function('Math', `return (${safeExpr})`)
    return fn(Math)
  } catch (err) {
    throw err
  }
}

