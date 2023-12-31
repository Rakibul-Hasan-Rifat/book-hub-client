import { useContext } from "react";
import { updateProfile } from "firebase/auth";
import toast, { Toaster } from "react-hot-toast";
import auth from "../../firebase/firebaseConfig";
import { UserAuthContext } from "../../context/UserAuthProvider";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { BsGithub } from "react-icons/bs";

const Register = () => {

    const navigate = useNavigate();
    const { user, signup, loginWithGoogle, loginWithGithub } = useContext(UserAuthContext)
    console.log(user)

    const handleRegister = (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const imgUrl = e.target.imgUrl.value;
        console.log(name, email, password, imgUrl, signup)

        signup(email, password)
            .then(() => {
                updateProfile(auth.currentUser, {
                    displayName: name,
                    photoURL: imgUrl || ''
                })
                    .then(() => toast.success('You are successfully registered!!!'))
                    .catch(err => toast.error(err.message))
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
            <section className="w-[85vw] mx-auto my-24">
                <form onSubmit={handleRegister} className="w-3/4 mx-auto flex flex-col items-center gap-4">
                    <input
                        required
                        type="text"
                        name="name"
                        placeholder="Name"
                        className="input input-bordered input-info w-full"
                    />
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
                    <input
                        required
                        type="text"
                        name="imgUrl"
                        placeholder="Image URL"
                        className="input input-bordered input-info w-full"
                    />
                    <button
                        className="w-full py-4 rounded-lg bg-blue-600 text-white font-semibold"
                    >
                        Register
                    </button>
                </form>
                <div className="flex gap-2 justify-center items-center mt-5">
                    <p>Already have an account? Please</p>
                    <Link to="/login" className="text-blue-600 font-semibold">Login</Link>
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

export default Register