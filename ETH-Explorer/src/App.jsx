import Header from "./components/Header";
import Hero from "./components/Hero";
import Chart from "./components/ETHDetails";

function App() {


  return (
          <>
           <main className="px-6 pt-3 flex flex-col gap-3">
             <Header /> 
             <section className="h-[40%]">
                <Hero/>
             </section>
             <section>
                <Chart />
             </section>
           </main>
          </>

    
  )
}

export default App
