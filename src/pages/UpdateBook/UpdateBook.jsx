import { useContext, useEffect, useState } from "react";
import { useLoaderData, useParams } from "react-router-dom"
import { UserAuthContext } from "../../context/UserAuthProvider";
import toast, { Toaster } from "react-hot-toast";

const UpdateBook = () => {

    const params = useParams()
    const loadedCategories = useLoaderData();
    const { user } = useContext(UserAuthContext);
    const [updatingBook, setUpdatingBook] = useState(null);
    console.log(loadedCategories, params.id, user.email, updatingBook)

    useEffect(() => {
        fetch(`http://localhost:5000/books/${params?.id}/details`)
            .then(res => res.json())
            .then(book => setUpdatingBook(book))
            .catch(err => {
                console.log(err)
            })
    }, [params.id])

    const handleBookUpdate = (e) => {
        e.preventDefault();
        const imgUrl = e.target.imgUrl.value;
        const bookName = e.target.name.value;
        const author = e.target.author.value;
        const category = e.target.category.value.charAt(0).toUpperCase() + e.target.category.value.slice(1);
        const rating = e.target.rating.value;
        console.log('updating btn clicked', imgUrl, bookName, author, category, rating)

        fetch(`http://localhost:5000/books/${params?.id}/update?email=${user.email}`, {
            credentials: 'include',
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                img_url: imgUrl,
                author_name: author,
                title: bookName,
                category,
                rating
            })
        })
            .then(res => res.json())
            .then(result => {
                result.acknowledged && toast.success('Updation is successful👌!!')
            })
            .catch(err => toast.error(err))
    }

    return (
        <>
            <Toaster />
            <section onSubmit={handleBookUpdate} className="w-[85vw] mx-auto my-24">
                <form className="w-3/4 mx-auto flex flex-col items-center gap-4">
                    <input
                        required
                        type="text"
                        name="imgUrl"
                        placeholder="Image URL"
                        defaultValue={updatingBook?.img_url}
                        className="input input-bordered input-info w-full"
                    />
                    <input
                        required
                        type="text"
                        name="name"
                        placeholder="Book Name"
                        defaultValue={updatingBook?.title}
                        className="input input-bordered input-info w-full"
                    />
                    <input
                        required
                        type="text"
                        name="author"
                        placeholder="Author Name"
                        defaultValue={updatingBook?.author_name}
                        className="input input-bordered input-info w-full"
                    />
                    <select name="category" className="w-full p-3 border border-blue-400 rounded-lg">
                        <option value={updatingBook?.category.toLowerCase()}>{updatingBook?.category}</option>
                        {
                            loadedCategories?.map(category => (
                                <option key={category._id} value={category._id.toLowerCase()}>{category._id}</option>
                            ))
                        }
                    </select>
                    <input
                        type="text"
                        name="rating"
                        placeholder="Rating"
                        defaultValue={updatingBook?.rating}
                        className="input input-bordered input-info w-full"
                    />
                    <button
                        className="w-full py-4 rounded-lg bg-blue-600 text-white font-semibold"
                    >
                        Submit updation
                    </button>
                </form>
            </section>
        </>
    )
}

export default UpdateBook