import React from 'react'
import ReactDOM from 'react-dom/client'
import { ApiKeyProvider } from './context/ApiKeyContext'
import App from './App'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ApiKeyProvider>
      <App />
    </ApiKeyProvider>
  </React.StrictMode>,
)
