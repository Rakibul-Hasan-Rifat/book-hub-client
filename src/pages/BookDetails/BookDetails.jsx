import { useLoaderData, useParams } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import { useContext, useState } from "react";
import { UserAuthContext } from "../../context/UserAuthProvider";
import toast, { Toaster } from "react-hot-toast";

const BookDetails = () => {

    const params = useParams();
    console.log('params', params);
    const loadedBookDetails = useLoaderData();
    let [bookCount, setBookCount] = useState(loadedBookDetails.quantity)
    const { user } = useContext(UserAuthContext)

    console.log(loadedBookDetails)
    const { title, img_url, author_name, category, rating, short_description } = loadedBookDetails

    const handleDateSubmit = (e) => {
        e.preventDefault();

        const date = new Date()

        const borrowingDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
        const returningDate = e.target.return_date.value;
        const borrowingUser = { name: user.displayName, email: user.email };
        const borrowedBook = loadedBookDetails;

        e.target.reset()

        fetch('https://book-hub-server-9lco.onrender.com/borrows', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                user: borrowingUser,
                book: borrowedBook,
                borrow_date: borrowingDate,
                return_date: returningDate
            })
        })
            .then(res => res.json())
            .then(result => {
                document.getElementById('close_btn').click();
                if (result.acknowledged) {
                    console.log('before reducing', bookCount)
                    setBookCount(--bookCount)
                    console.log('after reducing', bookCount)
                    fetch(`https://book-hub-server-9lco.onrender.com/books/${params?.id}/update?email=${user.email}`, {
                        // credentials: 'include',
                        method: 'PATCH',
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            quantity: bookCount
                        })
                    })
                        .then(res => res.json())
                        .then(result => {
                            result.acknowledged && (
                                toast.success('You have borrowed the book successfully!!')
                            )
                        })
                        .catch(err => {
                            console.log('my custom error')
                            toast.error(err)
                        })
                }
                result.message && toast(result.message)
            })
            .catch(err => {
                console.log(err);
                toast.error(err);
                document.getElementById('close_btn').click();
            })
    }

    return (
        <>
            <Toaster />
            <section className="w-[60vw] mx-auto my-24 flex flex-col items-center py-5 px-10 border">
                <img src={img_url} alt="" />
                <div className="my-6">
                    <h3 className="w-3/4 mx-auto text-3xl text-center font-semibold">{title}</h3>
                    <p className="w-3/4 mx-auto my-4 text-justify text-xl">{short_description}</p>
                    <h5 className="flex items-center justify-between text-xl text-center">
                        <span>Book Author: <span className="bg-blue-100 rounded px-3 py-1 shadow-inner font-bold text-blue-600">{author_name}</span></span>
                        <span>Book Category: <span className="bg-blue-100 rounded px-3 py-1 shadow-inner font-bold text-blue-600">{category}</span></span>
                    </h5>
                    <div className="flex items-center justify-between text-lg my-3">
                        <span>
                            <span className="bg-blue-200 font-semibold text-blue-600 rounded px-2 border-b border-b-blue-500">{bookCount}</span> books available in our stocks
                        </span>
                        <ReactStars
                            count={5}
                            value={parseInt(rating)}
                            isHalf={true}
                            size={36}
                            readOnly={true}
                        />
                    </div>
                </div>
                <div className="w-full flex items-center justify-between gap-5">
                    <button
                        disabled={bookCount < 1 ? true : false}
                        onClick={() => document.getElementById('my_modal_3').showModal()}
                        className={`w-1/2 ${bookCount < 1 ? 'bg-[#7492ff]' : 'bg-[#2B59FF]'} bg-[#2B59FF] text-white text-2xl font-semibold rounded-lg py-3 px-6 text-center`}
                    >
                        Borrow
                    </button>
                    <dialog id="my_modal_3" className="modal">
                        <div className="modal-box">
                            <form method="dialog">
                                <button id="close_btn" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                            </form>
                            <form onSubmit={handleDateSubmit} className="mt-5 flex gap-2 items-center">
                                <input
                                    required
                                    type="text"
                                    name="return_date"
                                    placeholder="Return date: (dd-mm-yyyy) format"
                                    className="w-3/4 input input-bordered input-info"
                                />
                                <button
                                    className="w-1/4 py-3 rounded-lg bg-blue-600 text-white font-semibold"
                                >
                                    Submit
                                </button>
                            </form>
                        </div>
                    </dialog>
                    <button className="w-1/2 bg-[#2B59FF] text-white text-2xl font-semibold rounded-lg py-3 px-6 text-center">Read</button>
                </div>
            </section>
        </>
    )
}

export default BookDetails