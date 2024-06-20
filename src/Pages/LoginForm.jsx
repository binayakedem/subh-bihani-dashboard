import React, { useState } from 'react'
import {toast} from 'react-hot-toast'
import { useNavigate ,NavLink} from 'react-router-dom'
import axios from 'axios'
const Login = () => {
    const navigate=useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const[toggle,setToggle]=useState(false)
    const[hidePass,setHidePass]=useState(false)
  
    const handleSubmit = async (event) => {
      event.preventDefault(); // Prevent default form submission behavior
  
      try {
        const response = await axios.post('http://localhost:5000/login', {
          email,
          password,
        });
  
        if (response.data.token) {
          localStorage.setItem('authToken', response.data.token);
          localStorage.setItem('email',response.data.useremail)
          toast.success(response.data.message)
          window.location.href = '/dashboard';
        } else {
          toast.error(response.data.error);
          console.log('not valid')
        }
      } catch (error) {
        console.error('Error during login:', error);
      }
    };
  return (
    <div>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
            <div className='h-full w-full overflow-hidden flex justify-center items-center'>
                <img src='https://static01.nyt.com/images/2023/10/10/multimedia/10best-restaurants-seattle-cover2-kfqg/10best-restaurants-seattle-cover2-kfqg-videoSixteenByNineJumbo1600.jpg' alt="png" />
            </div>
            <form onSubmit={handleSubmit}  className='flex flex-col justify-center items-center w-full'>
            <div className='flex flex-col w-2/3'>
                <label htmlFor="name" className='font-semibold text-gray-700'>Enter your email</label>
                <input className=' border border-gray-500 p-1 md:p-2 rounded-md'  type="email"id="email" name="email" placeholder="Enter your email"value={email}onChange={(event) => setEmail(event.target.value)}/>
                 </div>
                 <div className='flex flex-col w-2/3'>
                <label htmlFor="name" className='font-semibold text-gray-700'>Enter your Password</label>
                <input className=' border border-gray-500 p-1 md:p-2 rounded-md' type={`${!hidePass?'password':'text'}`}id="password"name="password" placeholder="Enter your password"value={password} onChange={(event) => setPassword(event.target.value)}/>
                {
                    hidePass?<p onClick={()=>setHidePass(!hidePass)} className='cursor-pointer'>Hide password</p>:
                    <p onClick={()=>setHidePass(!hidePass)} className='cursor-pointer'>Show password</p>
                }
                 </div>
                 <div  className='w-3/4'>
               
                <button className='bg-green-600 font-semibold text-lg font-briem my-4 text-white w-full px-4 py-2 rounded-md hover:bg-green-500'type="submit" >Login</button>
                </div>
                <div>
                    <div className='flex flex-row font-normal text-lg gap-2'>
                     <h1>Don't have an account?</h1> <NavLink to='/' className='text-green-600 font-semibold hover:cursor-pointer hover:scale-110 duration-500 ease-in-out' >Register</NavLink>
                    </div>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Login

