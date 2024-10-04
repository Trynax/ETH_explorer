import Home from "./components/Home"
import { useState,createContext } from "react"
import Testing from "./Testing"
import WalletDetails from "./components/WalletDetails"

export const CurrentPage = createContext()

function App() {

  const [isHome,setIsHome] = useState(false)

  return (
          <>
          <CurrentPage.Provider value={[isHome,setIsHome]}>
              {isHome ? <Home/> : <WalletDetails/>}
          </CurrentPage.Provider>
          {/* <Testing/> */}
           
          </>

    
  )
}

export default App
