import { useContext } from "react"
import { DNA } from "react-loader-spinner";
import { Navigate, useLocation } from "react-router-dom";
import { UserAuthContext } from "../context/UserAuthProvider"

const PrivateRoutes = ({ children }) => {
    const { user, loading } = useContext(UserAuthContext);

    const location = useLocation()

    if (loading) return (
        <div className="w-full h-[50vh] flex items-center justify-center">
            <DNA
                visible={true}
                height="200"
                width="200"
                ariaLabel="dna-loading"
                wrapperStyle={{}}
                wrapperClass="dna-wrapper"
            />
        </div>
    )

    if (user) return children;

    return <Navigate state={location.pathname} to='/login' />
}

export default PrivateRoutes