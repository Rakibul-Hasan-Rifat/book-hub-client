import bookUniverseImage from "../../../assets/book_universe.jpg"

const BookUniverse = () => {
  return (
    <section className="w-[85vw] mx-auto my-24 grid grid-cols-2 items-center gap-28 text-justify">
        <div className="rounded-xl overflow-hidden">
            <img src={bookUniverseImage} alt="" />
        </div>
        <div>
            <h2 className="text-4xl text-left mb-6" style={{fontFamily: 'Space Grotesk'}}>Creating a Boundless Universe with Books </h2>
            <p className="text-xl">We endeavor to create a boundless universe with books. Our library is stocked with books of various genres, catering to different reader preferences and ages. Dive into the world of fantasy or reality with our vast collection. It&apos;s not just a library, but your personal gateway to different worlds. </p>
        </div>
    </section>
  )
}

export default BookUniverse