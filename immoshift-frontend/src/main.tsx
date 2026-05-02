import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import { SiteConfigProvider } from './contexts/SiteConfigContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SiteConfigProvider>
      <Router>
        <App />
      </Router>
    </SiteConfigProvider>
  </StrictMode>,
)
