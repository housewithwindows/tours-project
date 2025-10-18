import { useAuth } from "./AuthContext";
import Tours from "./Tours";

const Profile = () => {
  const { user } = useAuth();

  // If user is null or undefined, render a loading or message
  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-400">
        Loading profile...
      </div>
    );
  }

return (
    <div className="p-6 w-screen h-screen text-white bg-gray-900 rounded shadow text-base">
      <main className="max-w-4xl mx-auto p-6 text-white">
        <h1 className="text-4xl font-bold mb-8">Tourify Profile</h1>

        <section className="mb-10 bg-gray-800 p-6 rounded shadow">
          <h2 className="text-2xl font-semibold mb-4">User Info</h2>
          <p className="mb-2">
            <span className="font-semibold">Email:</span> {user.email || "N/A"}
          </p>
          <p className="mb-2">
            <span className="font-semibold">Full Name:</span> {user.fullname || "N/A"}
          </p>
          <p>
            <span className="font-semibold">Verified:</span>{" "}
            {user.isVerified ? "Yes" : "No"}
          </p>
        </section>
      </main>
    </div>
);}

export default Profile;



