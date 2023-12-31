const SingleBorrowedBookCard = ({ book, handleReturn }) => {

    const { _id: borrowedBookId, borrow_date, return_date } = book;
    const { _id, img_url, title, category } = book.book;

    return (
        <div className="flex flex-col items-center justify-between p-6 rounded-lg shadow-lg border">
            <div className="rounded-lg shadow-lg overflow-hidden border">
                <img className="w-full h-72 object-contain" src={img_url} alt="" />
            </div>
            <h4 className="text-2xl font-bold my-4">{title}</h4>
            <div>
                category: <strong>{category}</strong>
            </div>
            <div className="w-full flex justify-between my-3">
                <div className="flex flex-col items-center">
                    <span className="p-1 rounded shadow-inner text-[#2b59ff] text-xs font-semibold border border-[#2b59ff]">Borrow</span>
                    <span className="mt-2">{borrow_date}</span>
                </div>
                <div className="flex flex-col items-center">
                    <span className="p-1 rounded shadow-inner text-[#2b59ff] text-xs font-semibold border border-[#2b59ff]">Return</span>
                    <span className="mt-2">{return_date}</span>
                </div>
            </div>
            <button
                onClick={() => handleReturn(_id, borrowedBookId)}
                className="w-1/2 mt-5 bg-[#2B59FF] text-white font-semibold rounded-lg py-3 text-center"
            >
                Return
            </button>
        </div>
    )
}

export default SingleBorrowedBookCard