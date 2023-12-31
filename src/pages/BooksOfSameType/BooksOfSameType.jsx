import { useLoaderData } from "react-router-dom"
import BookCard from "./BookCard"

const BooksOfSameType = () => {

    const loadedBooks = useLoaderData()
    console.log(loadedBooks)

    return (
        <section className="w-[85vw] mx-auto my-24 ">
            <div className="grid grid-cols-3 justify-between gap-5">
                {
                    loadedBooks?.map(book => <BookCard key={book._id} book={book} />)
                }
            </div>
        </section>
    )
}

export default BooksOfSameType