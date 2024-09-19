import Header from "./components/Header";
import Hero from "./components/Hero";
import Chart from "./components/ETHDetails";
import Latest from "./components/Latest";

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
             <section>
              <Latest/>
             </section>
           </main>
          </>

    
  )
}

export default App
