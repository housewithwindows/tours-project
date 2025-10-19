import { useState, useEffect } from "react";
import { useAuth } from "./AuthContext";

const Tours = () => {
  const { user } = useAuth();

  
  const [tours, setTours] = useState([]);
  // კარტში დამატებული ტურები
  const [cart, setCart] = useState([]);
  // ფორმის ველები ტურის დამატებისა და რედაქტირებისთვის
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [duration, setDuration] = useState("");
  const [description, setDescription] = useState("");
  // editing ID
  const [editingId, setEditingId] = useState(null);
  // state for buymessage
  const [buyMessage, setBuyMessage] = useState("");

  // we save our tours and cart
  useEffect(() => {
    const savedTours = localStorage.getItem("tours");
    if (savedTours) {
      setTours(JSON.parse(savedTours));
    }
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // when tours change we save it
  useEffect(() => {
    localStorage.setItem("tours", JSON.stringify(tours));
  }, [tours]);

  // saving changing cart
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // when we send form we either add tours or update them
  const handleAddOrUpdateTour = (e) => {
    e.preventDefault();

    if (!title || !duration || !description || !price) {
      alert("please fill in all the inputs");
      return;
    }

    if (editingId) {
      // updating tour and its data
      const updatedTours = tours.map((tour) =>
        tour.id === editingId ? { ...tour, title, duration, description, price } : tour
      );
      setTours(updatedTours);//setting tours as updated ones
      setEditingId(null);//setting editing as null if we are done editing
    } else {
      // if we update our tour everything should return updated
      const newTour = {
        id: Date.now(),//unique ID
        title,
        duration,
        description,
        price,
      };
      setTours([...tours, newTour]);
    }

    // clearing inputs
    setTitle("");
    setDuration("");
    setDescription("");
    setPrice("");
  };

  // deleting tours in cart
  const handleDeleteTour = (id) => {
    setTours(tours.filter((tour) => tour.id !== id));

    if (editingId === id) {
      setEditingId(null);
      setTitle("");
      setDuration("");
      setDescription("");
      setPrice("");
    }

    setCart(cart.filter((item) => item.id !== id));
  };

  // giving info for editing
  const handleEditTour = (tour) => {
    setTitle(tour.title);
    setDuration(tour.duration);
    setDescription(tour.description);
    setPrice(tour.price);
    setEditingId(tour.id);
  };

  // adding tours in cart
  const handleAddToCart = (tour) => {
    if (cart.find((item) => item.id === tour.id)) {
      alert("tour is already in the cart");
      return;
    }
    setCart([...cart, tour]);
  };

  // კალათიდან ტურის წაშლა
  const handleRemoveFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  // custom message for buying
  const handleBuy = () => {
    if (cart.length === 0) {
      alert("cart is empty");
      return;
    }

    setCart([]);
    setBuyMessage("thanks for buying");
    setTimeout(() => setBuyMessage(""), 3000);
  };

  return (
    <div className="p-6 w-screen h-screen text-white bg-gray-900 rounded shadow text-base overflow-auto">
      <h2 className="text-2xl font-bold mb-4">My Tours</h2>

      {/* თუ ტურები არ არის ამას გამოიტანს*/}
      {tours.length === 0 ? (
        <p className="mb-6 text-gray-400">No Tours Found</p>
      ) : (
        <ul className="mb-6 space-y-4">
          {tours.map((tour) => (
            <li key={tour.id} className="bg-gray-800 p-4 rounded shadow">
              <h3 className="text-lg font-semibold">Title: {tour.title}</h3>
              <p>
                <strong>Duration:</strong> {tour.duration}
              </p>
              <p>
                <strong>Description:</strong> {tour.description}
              </p>
              <p>
                <strong>Price:</strong> {tour.price}$
              </p>
              <p>
                <strong>Author:</strong> {user ? user.fullname : "Anonymous"}
              </p>
              <div className="mt-2 space-x-2">
                <button
                  onClick={() => handleEditTour(tour)}
                  className="bg-yellow-500 hover:bg-yellow-600 px-3 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteTour(tour.id)}
                  className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded"
                >
                  Delete
                </button>
                <button
                  onClick={() => handleAddToCart(tour)}
                  className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded"
                >
                  Add to Cart
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <h3 className="text-xl font-semibold mb-2">Cart ({cart.length})</h3>

      {/* მადლობის შეტყობინება ყიდვის შემდეგ */}
      {buyMessage && (
        <p className="mb-4 text-green-400 font-semibold">{buyMessage}</p>
      )}

      {/* თუ კალათა ცარიელია მაშინ გამოიტანს*/}
      {cart.length === 0 ? (
        <p className="mb-6 text-gray-400">Your cart is empty.</p>
      ) : (
        <ul className="mb-6 space-y-2">
          {cart.map((item) => (
            <li
              key={item.id}
              className="bg-gray-700 p-3 rounded flex justify-between items-center"
            >
              <div>
                <p className="font-semibold">{item.title}</p>
                <p>Price: {item.price}$</p>
              </div>
              <button
                onClick={() => handleRemoveFromCart(item.id)}
                className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* ყიდვის ღილაკი */}
      <button
        onClick={handleBuy}
        className="w-full bg-green-600 hover:bg-green-700 py-2 rounded font-semibold mb-6"
      >
        Buy
      </button>

      {/* ტურის დამატების ან რედაქტირების ფორმა */}
      <form onSubmit={handleAddOrUpdateTour} className="space-y-4">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 rounded bg-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          placeholder="Duration"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          className="w-full p-2 rounded bg-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          className="w-full p-2 rounded bg-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full p-2 rounded bg-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className={`w-full ${
            editingId ? "bg-green-600 hover:bg-green-700" : "bg-blue-600 hover:bg-blue-700"
          } py-2 rounded font-semibold`}
        >
          {editingId ? "Update Tour" : "Add Tour"}
        </button>
      </form>
    </div>
  );
};

export default Tours;





