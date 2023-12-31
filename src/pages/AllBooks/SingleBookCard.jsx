import ReactStars from 'react-rating-stars-component';
import { Link } from 'react-router-dom';

const SingleBookCard = ({ book }) => {

    const { _id, title, author_name, img_url, rating, category } = book;

    return (
        <div className="p-4 rounded-lg shadow-xl border">
            <img src={img_url} className="w-full h-72 rounded-xl object-contain" alt="" />
            <h4 className="text-xl font-semibold mt-6">{title}</h4>
            <p className="my-2 text-justify">Author: <strong>{author_name}</strong></p>
            <div className="flex justify-between items-center mb-3">
                <span>Type: {category}</span>
                <ReactStars
                    count={5}
                    value={parseInt(rating)}
                    isHalf={true}
                    size={24}
                    readOnly
                />
            </div>
            <div className="flex items-center justify-center">
                <Link to={`/books/${_id}/update`} className="w-1/2 bg-[#2B59FF] text-white font-semibold rounded-lg py-3 text-center">
                    <>Update</>
                </Link>
            </div>
        </div>
    )
}

export default SingleBookCard