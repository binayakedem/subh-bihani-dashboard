import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ThemeProvider } from './Contexts/ContextProvider.jsx'
import { UserContextProvider } from './userContext/userContext.jsx'
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <UserContextProvider>
      <App />
      </UserContextProvider>
    </ThemeProvider>
  </React.StrictMode>,
)
