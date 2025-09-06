import { GoogleOAuthProvider } from '@react-oauth/google'
import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
const clientId = '233627829118-n69rsuj3fh0er65c1aq1qv69csd4a3so.apps.googleusercontent.com'
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <StrictMode>
    <GoogleOAuthProvider
      clientId={clientId}>
    <App />
    </GoogleOAuthProvider>
  </StrictMode>
)
  