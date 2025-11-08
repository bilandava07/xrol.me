import PhotoCard from "../components/PhotoCard";




function Home() {

    const photos = [
        { id: 1, title: "Neuschwanstein", date: "09-09-2025" },
        { id: 2, title: "Oktoberfest", date: "09-09-2025" },
        { id: 3, title: "Munich", date: "18-07-2025" },
        { id: 4, title: "Hannover", date: "23-09-2023" },
    ];

    return (
        <>
            <div className="home">
                <div className="photos-grid">

                    {photos.map((photo) => (
                        <PhotoCard photo={photo} key={photo.id} />
                    ))}


                </div>



            </div>


        </>


    );


}

export default Home