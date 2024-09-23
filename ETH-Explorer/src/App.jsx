import Home from "./components/Home"
import { useState } from "react"

function App() {

  const [isHome,setIsHome] = useState(false)

  return (
          <>
            <Home/>
          </>

    
  )
}

export default App
