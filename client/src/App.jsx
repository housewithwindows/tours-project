import { Routes, Route } from "react-router-dom";
import Nav from "./Nav";
import Home from "./Home";
import LogIn from "./LogIn";
import SignUp from "./Signup";
import Profile from "./Profile";
import Tours from "./Tours";
import LogoutButton from "./LogOut";


const App = () => {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/tours" element={<Tours />} />
        <Route path="/logout" element={<LogoutButton/>}/>
      </Routes>
    </>
  );
};

export default App;

