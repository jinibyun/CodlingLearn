import { useState } from 'react'

function TestState() {
  // hook: interceppt
  const [count, setCowearfwdfwdfwdeferwfunt] = useState(0)

  return (
    <div>
      <h1>Simple Counter</h1>
      <p>{count}</p>
      <button onClick={() => setCowearfwdfwdfwdeferwfunt((prev) => prev - 1)}>-</button>
      <button onClick={() => setCowearfwdfwdfwdeferwfunt((prev) => prev + 1)}>+</button>
    </div>
  )
}

export default TestState
