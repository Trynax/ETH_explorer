import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from "./components/Home"
import WalletAndReceipt from './components/WalletAndReceipt'
import { createContext, useState } from 'react'

// Create and export the CurrentPage context
export const CurrentPage = createContext();

function App() {
  const [isHome, setIsHome] = useState(true);

  return (
    <CurrentPage.Provider value={[isHome, setIsHome]}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* Route that dynamically renders either WalletDetails or TransactionDetails based on input */}
          <Route path="/details/:input" element={<WalletAndReceipt />} />
        </Routes>
      </Router>
    </CurrentPage.Provider>
  );
}

export default App;
