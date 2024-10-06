import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from "./components/Home"
import TransactionDetails from "./components/TransactionDetails"
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
          <Route path="/transaction/:hash" element={<TransactionDetails />} />
        </Routes>
      </Router>
    </CurrentPage.Provider>
  );
}

export default App;
