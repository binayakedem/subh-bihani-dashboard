import React, { useState ,useEffect,useContext} from 'react'
import { NavLink ,useNavigate} from 'react-router-dom';
import { userContext } from '../userContext/userContext';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FaPhone } from "react-icons/fa";
import { MdAttachEmail } from "react-icons/md";
const Profile = () => {
  const navigate=useNavigate();
  const { user} = useContext(userContext);
  const [greeting, setGreeting] = useState('');
  useEffect(() => {
    const updateTime = () => {
      const date = new Date();
      const hours = date.getHours();
      const currentGreeting = hours < 12 ? 'Good Morning' : (hours < 18 ? 'Good Afternoon' : 'Good Evening');
      setGreeting(currentGreeting);
    };
    updateTime()
  }, []);
  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('authToken'); 

      const response = await axios.post('http://localhost:5000/logout', {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }})
  
      if (response.data.status) {
        localStorage.removeItem('authToken');
        localStorage.removeItem('email');
        toast.success(response.data.message);
        navigate('/login');
      } else {
        toast.error(response.data.message);
        console.error('Error during logout:', response.data.message);
      }
    } catch (error) {
      console.error('Error during logout:', error);
      toast.error('Network error.'); // Handle network errors (optional)
    }
  };
  
  return (
    <div className=''>
      <div className='  pt-4 pb-12  border-gray-800 border-t-2 border-b-2 flex flex-row justify-start items-center px-3 md:px-8 gap-2'>
        {user?<div className='border h-32 w-32 md:h-40 md:w-40 shadow-lg shadow-gray-900 overflow-hidden rounded-full'>
          <img className='w-full h-full object-cover hover:scale-125 duration-500 ease-in-out cursor-grab' src={`http://localhost:5000/uploads/${user.image}`} alt="profile" /> <p>{user.image}</p>
        </div>:''}
        <div>
          {user?<div>
          <h1 className='font-briem md:font-bold md:text-lg'>{greeting}, <h1 className='text-green-600'>{user.name}</h1></h1>
          <div className='flex flex-row gap-3 items-center text-sm md:text-lg'>
           < FaPhone color='green'/>
          <p>{user.phone}</p>
          </div>
          <div className='flex flex-row gap-3 items-center text-sm md:text-lg'>
          <MdAttachEmail color='red'/>
          <p>{user.email}</p>
          </div>
          <button className='w-full bg-red-600 text-white font-semibold font-briem my-2 p-1 rounded-md hover:bg-red-500'  onClick={handleLogout}>Log out</button>
          </div>:<div> 
          <h1 className='font-briem font-bold text-lg'>Hi, <span className='text-green-600'>{greeting}</span></h1>
          <p className='my-2'>Please Register and continue to pre-order</p>
          <NavLink to='/login' className='w-full bg-green-600 text-white font-semibold font-briem my-2 p-1 px-10 rounded-md hover:bg-green-500'>Register/Login Now</NavLink>
        </div>}
        </div>

      </div>
    </div>
  )
}

export default Profile