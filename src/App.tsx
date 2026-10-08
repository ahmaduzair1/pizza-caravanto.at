import { Route, Routes } from 'react-router-dom'

import { Layout } from './components/layout/Layout'
import { HomePage } from './pages/HomePage'
import { LegalPage } from './pages/LegalPage'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="impressum" element={<LegalPage page="impressum" />} />
        <Route path="agb" element={<LegalPage page="agb" />} />
        <Route path="datenschutz" element={<LegalPage page="privacy" />} />
        <Route
          path="cookie-richtlinie"
          element={<LegalPage page="cookies" />}
        />
      </Route>
    </Routes>
  )
}
