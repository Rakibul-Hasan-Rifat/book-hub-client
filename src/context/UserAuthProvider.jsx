import auth from '../firebase/firebaseConfig';
import { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth"
import { githubProvider, googleProvider } from "../firebase/firebaseProviders";
import toast from 'react-hot-toast';

export const UserAuthContext = createContext();

const UserAuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const signup = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const login = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    }

    const loginWithGoogle = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider)
    }

    const loginWithGithub = () => {
        setLoading(true);
        return signInWithPopup(auth, githubProvider)
    }

    const logout = () => {
        setLoading(true);
        return signOut(auth);
    }

    useEffect(() => {

        const unSubscribe = onAuthStateChanged(auth, (loggedInUser) => {
            setUser(loggedInUser);
            setLoading(false);
            if (loggedInUser) {
                fetch('https://book-hub-server-9lco.onrender.com/jwt', {
                    credentials: 'include',
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ email: loggedInUser.email })
                })
                    .then(res => res.json())
                    .then(result => console.log(result))
                    .catch(err => console.log(err))
            } else if(!loggedInUser) {
                fetch('https://book-hub-server-9lco.onrender.com/logout', {credentials: 'include', method: 'POST'})
                    .then(res => res.json())
                    .then(result => toast.success(result.message))
                    .catch(err => console.log(err))
            }
        })

        return () => {
            unSubscribe();
        }

    }, [])

    const userContextValues = {
        user,
        loading,
        login,
        signup,
        logout,
        loginWithGoogle,
        loginWithGithub,
    }

    return (
        <UserAuthContext.Provider value={userContextValues}>
            {children}
        </UserAuthContext.Provider>
    )
}

export default UserAuthProvider