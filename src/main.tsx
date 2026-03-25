import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App'
import { StoresPage } from './pages/StoresPage'
import { MenPage } from './pages/MenPage'
import { ProductPage } from './pages/ProductPage'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/stores" element={<StoresPage />} />
        <Route path="/men" element={<MenPage />} />
        <Route path="/product/:id" element={<ProductPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)