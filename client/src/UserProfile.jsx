import { useAuth } from "../context/AuthContext"
import { useTours } from "../context/TourContext";
import Tours from "./Tours";

const Profile = () => {
    const { user } = useAuth();
    const { addTour } = useTours();

   

    return (
        <main>
            <h1>Profile</h1>

            <section>
                <h2>User info</h2>
                <p>My email: {user.email}</p>
                <p>My fullname: {user.fullname}</p>
                <p>Verified: {user.isVerified ? "Yes" : "No"}</p>    
            </section>

            <section>
                <h2>Tours</h2>
                <Tours userId={user._id}></Tours>
            </section>
            
        </main>
    )
}

export default Profile;