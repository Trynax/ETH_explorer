import Header from "./Header";
import Chart from "./ETHDetails";
import Latest from "./Latest";
import Hero from "./Hero";

export default function Home() {
  return (
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

  )
}
