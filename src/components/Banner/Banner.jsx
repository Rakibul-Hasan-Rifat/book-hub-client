import banner from "../../assets/banner.jpg";

const Banner = () => {
    return (
        <div
            className="mt-20 py-20 relative rounded-xl bg-cover"
            style={{
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, .7), rgba(0, 0, 0, .7)), url(${banner})`
            }}
        >
            <h1
                className="text-8xl text-center font-bold"
                style={{fontFamily: 'Space Grotesk',}}
            >Enter, Explore, Discover your Next Read</h1>
            <p className="mt-12 w-3/4 mx-auto text-2xl text-center">Welcome to BookHub, your personal library gateway. Dive into our vast collection, find your favourite genre and embark on your literary journey.</p>
        </div>
    )
}

export default Banner