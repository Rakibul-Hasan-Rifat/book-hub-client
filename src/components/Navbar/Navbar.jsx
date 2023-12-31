import toast from "react-hot-toast";
import { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import userLogo from "../../assets/user.png"
import logo from "../../assets/logo/white-logo.png"
import { UserAuthContext } from "../../context/UserAuthProvider";

const Navbar = () => {

  const [show, setShow] = useState(false);
  const { user, logout } = useContext(UserAuthContext);
  console.log(show)
  console.log(user)

  const handleLogOut = () => {
    logout()
      .then(() => {
        toast.success('You are successfully logged out!!!')
      })
      .catch(err => {
        toast.error(err.message)
      })
  }

  const navLinks = (
    <>
      <li><NavLink to="/">Home</NavLink></li>
      <li><NavLink to="/books">All-Books</NavLink></li>
      <li><NavLink to="/addBook">Add-Book</NavLink></li>
      <li><NavLink to="/borrowedBooks">Borrowed-Books</NavLink></li>
    </>
  )

  return (
    <div className="navbar bg-transparent">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            {navLinks}
          </ul>
        </div>
        <Link to="/" className="w-1/2" style={{ fontSize: '34px' }}>
          <img src={logo} alt="" className="w-full" />
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal gap-3 px-1">
          {navLinks}
        </ul>
      </div>
      <div className="navbar-end">
        {
          user ? (
            <>
              <div className="relative">
                <img
                  onClick={() => setShow(!show)}
                  className="w-[50px] rounded-full cursor-pointer" src={user ? user.photoURL : userLogo } alt=""
                />
                <div
                  className={`w-[250px] border ${show ? 'flex' : 'hidden'} flex-col gap-5 items-center px-3 py-6 absolute right-0 top-full bg-white text-black rounded-lg z-10`}
                >
                  <h4 className="font-semibold pb-4 border-b border-blue-300">{user.displayName}</h4>
                  <button
                    onClick={handleLogOut}
                    className="px-6 py-3 border border-blue-600 rounded font-semibold text-blue-600 hover:bg-blue-500 hover:text-white"
                  >Log out</button>
                </div>
              </div>
            </>
          ) : (
            <Link to="/login" className="rounded px-4 py-2 text-xl bg-[#2B59FF] text-white">Sign in now</Link>
          )
        }
      </div>
    </div>
  )
}

export default Navbar