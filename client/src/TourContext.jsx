/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { useState } from "react";
import { useContext } from "react";
import { createContext } from "react";


export const TourContext = createContext();

export const useTour = () => useContext(TourContext);

const API_URL = 'http://localhost:3000/api';

export const TourProvider = ({ children }) => {
    const [tour, setTours] = useState([]);
//getting all tours
const getTours = async (userId) => {
        try {
            const res = await fetch(`${API_URL}/tours?userId=${userId}`, {
                credentials: 'include'
            });//fetching

            const result = await res.json();

            if(!res.ok) {
                throw new Error(result.message);//returnin error if !res.ok
            }

            setTours(result.data.tours);
        } catch(err) {
            console.log(err);
        }
}
//deleting a tour
const deleteTour = async (tourId) => {
  try {
    const res = await fetch(`${API_URL}/tours/${tourId}`, {
      method: 'DELETE',
      credentials: 'include',
    });

    if (!res.ok) {
      const result = await res.json();
      throw new Error(result.message);
    }
    

    alert("tour has been deleted")
    
    
    setTours(tour.filter(tour => tour._id !== tourId));

  } catch (err) {
    console.error(err);
  }
};
//updating a tour
const updateTour = async (data,tourId) => {
    try {
    const res = await fetch(`${API_URL}/tours/${tourId}`, {
        method: 'PATCH',
        headers:{
                "Content-Type": "application/json"
        },
        body: JSON.stringify(data),
        credentials: 'include',
    });

    const result = await res.json();

        if(!res.ok) {
                throw new Error(result.message);
        }
        
    const index = tour.findIndex(tour => tour._id === tourId)
    const copyArr = [...tour]
    copyArr.splice(1,index,result)
    
  } catch (err) {
    console.error(err);
  }
}


const addTours = async () => {
        try {
            const res = await fetch(`${API_URL}/tours`,{
                method: "POST",
                headers:{
                    "Content-Type": "application/json"
                },
                credentials: 'include'
            });

            const result = await res.json();

            if(!res.ok) {
                throw new Error(result.message);
            }
            setTours(result.data.tours);
        } catch(err) {
            console.log(err);
        }
}

    return (
        <TourContext.Provider value={{getTours, addTours,deleteTour,updateTour}}>
            {children}
        </TourContext.Provider>
    )
}
