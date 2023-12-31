import { DNA } from "react-loader-spinner";
import { UserAuthContext } from "../../context/UserAuthProvider.jsx";
import SingleBookCard from "./SingleBookCard.jsx";
import { useContext, useEffect, useState } from "react";

const AllBooks = () => {

  const [books, setBooks] = useState([])
  const { user } = useContext(UserAuthContext)

  useEffect(() => {
    fetch(`http://localhost:5000/books?email=${user.email}`, { credentials: 'include' })
      .then(res => res.json())
      .then(result => setBooks(result))
      .catch(err => console.log(err))
  }, [user])

  const handleFilter = () => {
    fetch('https://book-hub-server-9lco.onrender.com/books/availableBooks')
      .then(res => res.json())
      .then(data => setBooks(data))
      .catch(err => console.log(err))
  }

  return (
    <section className="w-[85vw] mx-auto my-24">
      <div className="felx items-center justify-center w-1/2 mx-auto my-7">
        <button
          onClick={handleFilter}
          className="w-full font-semibold rounded-lg py-3 text-center border border-blue-600 text-blue-600 hover:bg-[#2B59FF] hover:text-white"
        >
          Filter: {books.length}
        </button>
      </div>
      <div className={`grid ${books.length < 1 ? 'gird-cols-1' : 'grid-cols-3'} gap-6`}>
        {
          books.length < 1 ? (
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
          ) : (
            books?.map(singleBook => <SingleBookCard key={singleBook._id} book={singleBook} />)
          )
        }
      </div>
    </section>
  )
}

export default AllBooks