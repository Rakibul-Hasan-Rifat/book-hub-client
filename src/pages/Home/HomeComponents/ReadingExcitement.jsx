import readingExcitementImage from "../../../assets/excitement_of_next_level.jpg"

const ReadingExcitement = () => {
    return (
        <section className="bg-[#12141D] text-white py-24">
            <div
                className="w-[85vw] mx-auto grid grid-cols-2 items-center gap-28 text-justify"
            >
                <div>
                    <h2 className="text-4xl text-left mb-6" style={{ fontFamily: 'Space Grotesk' }}>Taking the Excitement of Reading to the Next Level</h2>
                    <p className="text-xl">At BookHub, we aim to take the excitement of reading to the next level. Our platform offers unlimited access to a wide array of books from numerous genres. The seamless borrowing, return processes, absence of overdue charges, and constantly updated collection make us stand out.</p>
                </div>
                <div className="rounded-xl overflow-hidden">
                    <img src={readingExcitementImage} alt="" />
                </div>
            </div>
        </section>
    )
}

export default ReadingExcitement