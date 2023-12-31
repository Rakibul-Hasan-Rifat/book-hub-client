import toast, { Toaster } from "react-hot-toast";
import { UserAuthContext } from "../../context/UserAuthProvider";
import { useContext } from "react";

const AddBook = () => {

    const { user } = useContext(UserAuthContext)

    const handleAddBook = (e) => {
        e.preventDefault();
        const { book, author, category, imgUrl, quantity, rating, description } = e.target;
        console.log(book.value, author.value, category.value, imgUrl.value, quantity.value, rating.value, description.value)

        const newBook = {
            title: book.value,
            author_name: author.value,
            category: category.value,
            img_url: imgUrl.value,
            quantity: quantity.value,
            rating: rating.value,
            short_description: description.value
        }

        fetch(`http://localhost:5000/addBook?email=${user.email}`, {
            credentials: 'include',
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newBook)
        })
            .then(res => res.json())
            .then(result => {
                if (result.acknowledged) {
                    toast.success('The book has been added to the server successfully!!')
                }
            })
            .catch(err => toast.error(err))
    }
    return (
        <>
            <Toaster />
            <section className="w-[85vw] mx-auto my-24">
                <form onSubmit={handleAddBook} className="w-3/4 mx-auto flex flex-col items-center gap-4">
                    <input
                        required
                        type="text"
                        name="book"
                        placeholder="Book Name"
                        className="input input-bordered input-info w-full"
                    />
                    <input
                        required
                        type="text"
                        name="author"
                        placeholder="Author"
                        className="input input-bordered input-info w-full"
                    />
                    <input
                        required
                        type="text"
                        name="category"
                        placeholder="Category"
                        className="input input-bordered input-info w-full"
                    />
                    <input
                        required
                        type="text"
                        name="imgUrl"
                        placeholder="Image URL"
                        className="input input-bordered input-info w-full"
                    />
                    <input
                        required
                        type="text"
                        name="quantity"
                        placeholder="Quantity"
                        className="input input-bordered input-info w-full"
                    />
                    <input
                        required
                        type="text"
                        name="rating"
                        placeholder="Rating"
                        className="input input-bordered input-info w-full"
                    />
                    <input
                        required
                        type="text"
                        name="description"
                        placeholder="Short Description"
                        className="input input-bordered input-info w-full"
                    />
                    <button className="w-full py-4 rounded-lg bg-blue-600 text-white font-semibold">Add Book</button>
                </form>
            </section>
        </>
    )
}

export default AddBook