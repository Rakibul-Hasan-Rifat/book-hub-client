import { Link } from "react-router-dom"
import errorPageImage from "../../assets/error-page.png"

const ErrorPage = () => {
  return (
    <section className="w-[85vw] h-[100vh] mx-auto flex flex-col gap-5 items-center justify-center">
        <img className="h-3/4" src={errorPageImage} alt="" />
        <Link to='/' className="border border-blue-600 text-blue-600 font-semibold rounded py-3 px-6 hover:bg-blue-600 hover:text-white">Go Home</Link>
    </section>
  )
}

export default ErrorPage