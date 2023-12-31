import { useContext, useEffect, useState } from "react"
import { UserAuthContext } from "../../context/UserAuthProvider";
import SingleBorrowedBookCard from "./SingleBorrowedBookCard";
import toast, { Toaster } from "react-hot-toast";
import swal from "sweetalert";

const BorrowedBooks = () => {

    let bookCount;

    const { user } = useContext(UserAuthContext)
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:5000/books/borrowedBooks?email=${user.email}`)
            .then(res => res.json())
            .then(result => setData(result))
            .catch(err => console.log(err))
    }, [user.email])

    const handleReturn = (id, borrowedBookId) => {
        fetch(`http://localhost:5000/books/${id}/details`)
            .then(res => res.json())
            .then(result => {
                bookCount = result.quantity
            })
            .catch(err => console.log(err))
        swal({
            title: "Are you sure?",
            text: "Once returned, you will not be able to recover this book!",
            icon: "warning",
            buttons: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    fetch(`http://localhost:5000/books/${id}/update?email=${user.email}`, {
                        credentials: 'include',
                        method: 'PUT',
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            quantity: ++bookCount
                        })
                    })
                        .then(res => res.json())
                        .then(result => {
                            result.acknowledged && (
                                fetch(`http://localhost:5000/unBorrow/${borrowedBookId}`, { method: 'DELETE' })
                                    .then(res => res.json())
                                    .then(result => {
                                        console.log(result)
                                        if (result.acknowledged) {
                                            console.log(data.filter(singleBook => singleBook._id !== borrowedBookId))
                                            setData(data.filter(singleBook => singleBook._id !== borrowedBookId))
                                            toast.success('You have returned the book successfully!!')
                                        }
                                    })
                                    .catch(err => toast.error(err))
                            )
                        })
                        .catch(err => toast.error(err))
                    swal("Return is successful!", {
                        icon: "success",
                    });
                } else {
                    swal("Book is not returned!");
                }
            });
    }

    return (
        <>
            <Toaster />
            <section className="w-[85vw] mx-auto my-24">
                <div className={`grid gap-5 ${data.length > 0 ? 'grid-cols-3' : 'grid-cols-1'} items- justify-between`}>
                    {
                        data.length > 0 ? (data?.map(borrowedBook => (
                            <SingleBorrowedBookCard
                                key={borrowedBook._id}
                                book={borrowedBook}
                                handleReturn={handleReturn}
                            />
                        ))) : (
                            <div className="text-center">
                                <h1 className="text-3xl font-bold">Sorry! There is no book borrowed by you.</h1>
                            </div>
                        )
                    }
                </div>
            </section>
        </>
    )
}

export default BorrowedBooks