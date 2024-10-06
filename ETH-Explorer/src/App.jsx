import Home from "./components/Home"
import { useState,createContext } from "react"
import Testing from "./Testing"
import WalletDetails from "./components/WalletDetails"
import TransactionDetails from "./components/TransactionsDetail"

export const CurrentPage = createContext()

function App() {

  const [isHome,setIsHome] = useState(true)

  return (
          <>
          <CurrentPage.Provider value={[isHome,setIsHome]}>
              <Home/>
          </CurrentPage.Provider>
          </>

    
  )
}

export default App
