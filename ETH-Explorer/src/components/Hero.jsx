import onchain from "../assets/on_chain.png"

export default function Hero() {
  return (
    <section className="bg-black relative h-full">
        <img className="top-[10%] left-10" src={onchain} alt="" />
        <img className="top-[10%] right-10" src={onchain} alt="" />

    </section>
  )
}
