import { useLoaderData } from "react-router-dom"
import SingleTypeCard from "./SingleTypeCard";

const BookTypes = () => {
    const loadedData = useLoaderData();
    return (
        <section className="my-24 mx-auto w-[85vw]">
            <h2 className="font-bold text-4xl text-center mb-6">Our Book Genre</h2>
            <div className="grid grid-cols-4 items-center justify-center gap-5">
                {
                    loadedData?.map(singleData => (
                        <SingleTypeCard key={singleData._id} data={singleData} />
                    ))
                }
            </div>
        </section>
    )
}

export default BookTypes