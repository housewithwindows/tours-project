import { BrowserRouter } from 'react-router'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './AuthContext.jsx'
import { TourContext } from './TourContext.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <AuthProvider>
  <TourContext>
      <App />
  </TourContext>
  </AuthProvider>
  </BrowserRouter>
    
  
)

