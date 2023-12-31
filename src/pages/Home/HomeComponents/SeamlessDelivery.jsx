import deliveryImage from "../../../assets/delivering.jpg"

const SeamlessDelivery = () => {
    return (
        <section className="w-[85vw] mx-auto my-24 grid grid-cols-2 items-center gap-28 text-justify">
            <div className="rounded-xl overflow-hidden">
                <img src={deliveryImage} alt="" />
            </div>
            <div>
                <h2 className="text-4xl text-left mb-6" style={{ fontFamily: 'Space Grotesk' }}>Delivering Seamless Library Experience Digitally</h2>
                <p className="text-xl">Our mission is to deliver a seamless library experience digitally. Our platform allows users to browse through genres, author catalogs, and make a borrowing request for physical books. We keep a track of all borrowed books, reminding users of due dates, thus making it a hassle-free experience.</p>
            </div>
        </section>
    )
}

export default SeamlessDelivery