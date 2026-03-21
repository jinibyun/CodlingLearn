import { useState } from 'react'

const MAX_LENGTH = 50

function XCharCounter() {
  const [text, setText] = useState('')

  const length = text.length
  const isEmpty = length === 0
  const isWarning = length >= 41

  const buttonStyle = {
    backgroundColor: isEmpty ? '#9ca3af' : '#1d9bf0',
    color: '#ffffff',
    border: 'none',
    borderRadius: '9999px',
    padding: '10px 18px',
    fontWeight: 700,
    cursor: isEmpty ? 'not-allowed' : 'pointer',
    opacity: isEmpty ? 0.9 : 1,
  }

  return (
    <div style={{ maxWidth: '560px', margin: '40px auto', padding: '16px' }}>
      <h2 style={{ marginBottom: '12px' }}>X Post Composer</h2>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value.slice(0, MAX_LENGTH))}
        maxLength={MAX_LENGTH}
        placeholder="무슨 일이 일어나고 있나요?"
        rows={5}
        style={{
          width: '100%',
          resize: 'none',
          border: '1px solid #cfd9de',
          borderRadius: '12px',
          padding: '12px',
          fontSize: '16px',
          lineHeight: 1.4,
          boxSizing: 'border-box',
        }}
      />

      <div
        style={{
          marginTop: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <span style={{ color: isWarning ? '#dc2626' : '#536471', fontWeight: 600 }}>
          {length}/{MAX_LENGTH}
        </span>

        <button type="button" disabled={isEmpty} style={buttonStyle}>
          등록
        </button>
      </div>
    </div>
  )
}

export default XCharCounter
