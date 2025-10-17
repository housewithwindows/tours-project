import { useTours } from "../context/TourContext";


const TourData = () => {
    const { tour } = useTours();
      
   

    return (
        <main>
            

            <section>
                <h2>Tour info</h2>
                <p>Tirle: {tour.title}</p>
                <p>duration: {tour.duration}</p>
                <p>desc: {tour.description}</p>    
            </section>

            
            
        </main>
    )
}

export default TourData;