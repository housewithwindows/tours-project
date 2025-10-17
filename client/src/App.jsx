import LogIn from './pages/Login'
import Home from './Home'
import Profile from './pages/Profile'
import SignUp from './Signup'
import TourData from './toursdata'

function App() {
  

  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<LogIn/>} />
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/data' element={<TourData/>}/>
      </Routes>
    </>
  )
}

export default App
