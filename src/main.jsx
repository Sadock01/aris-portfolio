import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ResumePreviewPage } from './pages/ResumePreviewPage.jsx'
import { LanguageProvider } from './i18n/LanguageContext.jsx'

const isResumePreview = new URLSearchParams(window.location.search).has('resume')

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LanguageProvider>
      {isResumePreview ? <ResumePreviewPage /> : <App />}
    </LanguageProvider>
  </StrictMode>,
)
