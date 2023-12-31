import { Link } from "react-router-dom"
import logo from "../../assets/logo/white-logo.png"

const Footer = () => {
  return (
    <footer className="bg-[#12141D] px-20 py-28">
      <div className="w-[85vw] mx-auto text-white">
        <div className="flex items-center justify-evenly">
          <Link to="/" className="w-1/4">
            <img className="" src={logo} alt="" />
          </Link>
          <div className="flex flex-col items-center justify-between gap-3">
            <Link>Support</Link>
            <Link>Terms & Conditions</Link>
            <Link>Privacy Policy</Link>
          </div>
        </div>
        <div className="mt-16 text-center">
          <p>&copy; Copyright 2023, All Rights Reserved</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer