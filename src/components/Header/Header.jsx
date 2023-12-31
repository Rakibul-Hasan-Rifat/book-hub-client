import Banner from "../Banner/Banner"
import Navbar from "../Navbar/Navbar"

const Header = () => {
  return (
    <section className=" bg-[#12141D] text-white">
      <div className="w-[85vw] mx-auto pb-3">
        <Navbar />
        <Banner />
      </div>
    </section>
  )
}

export default Header