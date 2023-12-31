import { useContext } from "react";
import { UserAuthContext } from "../../context/UserAuthProvider";
import toast, { Toaster } from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { BsGithub } from "react-icons/bs";
import { Link, useLoaderData, useLocation, useNavigate } from "react-router-dom";

const Login = () => {

  console.log(useLoaderData())

  const location = useLocation();
  const navigate = useNavigate();
  const { login, loginWithGoogle, loginWithGithub } = useContext(UserAuthContext);
  console.log(location, navigate)

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log(email, password)

    login(email, password)
      .then(() => {
        toast.success('You are logged in successfully!!!');
        navigate(location.state || '/');
      })
      .catch(err => {
        toast.error(err.message)
      })
  }

  const handleGoogleLogin = () => {
    loginWithGoogle()
      .then(() => {
        toast.success('You are logged in successfully!!!');
        navigate(location.state || '/');
      })
      .catch(err => {
        toast.error(err.message)
      })
  }

  const handleGithubLogin = () => {
    loginWithGithub()
      .then(() => {
        toast.success('You are logged in successfully!!!');
        navigate(location.state || '/');
      })
      .catch(err => {
        toast.error(err.message)
      })
  }

  return (
    <>
      <Toaster />
      <section onSubmit={handleLogin} className="w-[85vw] mx-auto my-24">
        <form className="w-3/4 mx-auto flex flex-col items-center gap-4">
          <input
            required
            type="email"
            name="email"
            placeholder="Email"
            className="input input-bordered input-info w-full"
          />
          <input
            required
            type="password"
            name="password"
            placeholder="Password"
            className="input input-bordered input-info w-full"
          />
          <button className="w-full py-4 rounded-lg bg-blue-600 text-white font-semibold">Login</button>
        </form>
        <div className="flex gap-2 justify-center items-center mt-5">
          <p>Don&apos;t have an account? Please</p>
          <Link to="/register" className="text-blue-600 font-semibold">Register</Link>
        </div>
        <p className="text-center mt-6">OR</p>
        <div className="flex gap-2 justify-center items-center mt-3">
          <button onClick={handleGoogleLogin} className="p-3 rounded-full border">
            <FcGoogle size={30} />
          </button>
          <button onClick={handleGithubLogin} className="p-3 rounded-full border">
            <BsGithub size={30} />
          </button>
        </div>
      </section>
    </>
  )
}

export default Login