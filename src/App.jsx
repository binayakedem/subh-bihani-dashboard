import Register from "./Pages/Registration"
import axios from "axios"
import { BrowserRouter,Routes, Route } from "react-router-dom"
import Login from "./Pages/LoginForm"
import Profile from "./Pages/Profile"
axios.defaults.baseURL="http://localhost:5000/api"
import { userContext } from "./userContext/userContext"
import { useContext} from "react"
import PrivateRoute from "./PrivateRoute/PrivateRoute"
import { Toaster } from 'react-hot-toast';
function App() {
const{user}=useContext(userContext);

console.log("i am from app:",user)
  return (
    <>
    <BrowserRouter>
    <Toaster />
    <Routes>
<Route path="/" element={<Register/>}/>
<Route path="/login" element={<Login/>}/>
<Route path="/profile" element={<Profile/>}/>
<Route path="/dashboard" element={
  <PrivateRoute>
  </PrivateRoute>
            }
          />
    </Routes>
    </BrowserRouter>
    </>
  )
}
export default App


