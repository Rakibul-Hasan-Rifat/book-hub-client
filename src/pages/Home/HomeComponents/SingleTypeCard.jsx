import { useNavigate } from "react-router-dom"

const SingleTypeCard = ({ data }) => {

    const navigate = useNavigate();
    
    return (
        <div
            onClick={() => navigate(`/books/${data._id.toLowerCase()}`)}
            className="flex flex-col items-center gap-6 p-4 rounded-lg shadow-xl border cursor-pointer"
        >
            <img src={data?.imgUrl} className="w-full h-72 rounded-xl object-contain overflow-hidden" alt="" />
            <h3 className="font-bold text-xl">{data._id}</h3>
        </div>
    )
}

export default SingleTypeCard