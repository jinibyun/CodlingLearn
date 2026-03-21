import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import RandomUserCard from './test/randomUserCard.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RandomUserCard />
  </StrictMode>,
)
