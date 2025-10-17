/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { useTour } from "../context/TourContext.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { useState } from "react";
import { getTours } from "../../server/controllers/tours.controller.js";


const Posts = ({ userId }) => {
    const { tours, getTour, deleteTour } = useTour();
    const { user } = useAuth();
    const [updateToggle, setUpdateToggle] = useState(false);

    useEffect(() => {
        getTours(userId);
    }, []);

    return (
        <ul>

            {
                !tours ? 'No Tours Found' : tours.map(tour => {
                    return (
                        <li key={tour._id}>
                            <p>Tour name: {tour.title}</p>

                            {
                                updateToggle ? (
                                    <form>
                                        <div>
                                            <input type="text" id="title" name="title" placeholder={tour.title} required />
                                        </div>

                                        <div>
                                            <input type="text" id="duration" name="duration" placeholder={tour.duration} required />
                                        </div>
                                        
                                        

                                        <button>Submit</button>
                                        <button onClick={() => setUpdateToggle(false)}>Cancel</button>
                                    </form>
                                ) : (
                                    <>
                                        <h3>{tour.title}</h3>
                                        <p>Content: {tour.duration}</p>

                                        {
                                            user._id === userId && <button onClick={() => deleteTour(tour._id)}>Delete Tour</button>
                                        }

                                        <button onClick={() => setUpdateToggle(!updateToggle)}>Update</button>
                                    </>
                                )
                            }
                        </li>
                    )
                })
            }

        </ul>
    )
}

export default Posts;