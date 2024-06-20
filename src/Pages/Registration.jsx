import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { NavLink, useNavigate } from 'react-router-dom'
const Register = () => {
    const navigate=useNavigate()
    const[hidePass , setHidePass]=useState(false)
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        password: '',
        image: null, 
      });
const handleChange = (e) => {
        if (e.target.type === 'file') {
          setFormData({ ...formData, image: e.target.files[0] });
        } else {
          setFormData({ ...formData, [e.target.name]: e.target.value });
        }
      };
const handleSubmit = async (e) => {
        e.preventDefault();
        const formDataToSend = new FormData();
        Object.keys(formData).forEach((key) => {
          formDataToSend.append(key, formData[key]);
        });
      
        try {
          const response = await fetch('http://localhost:5000/register', {
            method: 'POST',
            body: formDataToSend
          });
          
          if (!response.ok) {
            const errorData = await response.json();
            toast.error(errorData.error)
            return;
          }else{
            console.log('something went wrong');
              toast.success("User is added succefully!!!")
             
              setFormData({
                  name: '',
                  phone: '',
                  email: '',
                  password: '',
                  image: null,
                });
                navigate('/login')
            }
        } catch (error) {
          toast.error("Something went wrong!!!!")
        }
      };   
  return (
    <div>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
            <div className='h-full w-full overflow-hidden flex justify-center items-center'>
                <img src='https://i2-prod.devonlive.com/incoming/article2006433.ece/ALTERNATES/s615/0_FwEWW52w.jpg' alt="png" />
            </div>
            <div className='  flex flex-col justify-center items-center w-full'>
                <div>
                    <h1 className='text-center text-green-600 font-briem text-lg font-semibold'><span>Register to Subh Bihani Pvt.Ltd</span></h1>
                </div>
                <div className='w-full px-6 md:w-full grid grid-cols-1 lg:grid-cols-2 gap-2 md:gap-4'>
                <div className={`  flex flex-col`}>
                <label htmlFor="name" className='font-semibold text-gray-700'>Enter your name</label>
                <input className=' border border-gray-500 p-1 md:p-2 rounded-md' type="text" placeholder='Enter your name' name="name" value={formData.name} onChange={handleChange} required/>
                 </div>
                 <div className={`  flex flex-col`}>
                <label htmlFor="name" className='font-semibold text-gray-700'>Enter your phone (Pre-order*)</label>
                <input className=' border border-gray-500 p-1 md:p-2 rounded-md' type="number" placeholder='Enter your phone'name="phone" value={formData.phone} onChange={handleChange} required/>
                 </div>
                 <div className='flex flex-col'>
                <label htmlFor="name" className='font-semibold text-gray-700'>Enter your email</label>
                <input className=' border border-gray-500 p-1 md:p-2 rounded-md' type="email" placeholder='Enter your email'name="email" value={formData.email} onChange={handleChange} required/>
                 </div>
                 <div className='flex flex-col'>
                <label htmlFor="name" className='font-semibold text-gray-700'>Enter your Password</label>
                <input className=' border border-gray-500 p-1 md:p-2 rounded-md' type={`${!hidePass?'password':'text'}`} placeholder='Enter your password' name="password" value={formData.password} onChange={handleChange}/>
                {
                    hidePass?<p onClick={()=>setHidePass(!hidePass)} className='cursor-pointer'>Hide password</p>:
                    <p onClick={()=>setHidePass(!hidePass)} className='cursor-pointer'>Show password</p>
                }
                 </div>
                 <div className={`  flex flex-col`}>
                    <p>Choose your profile</p>
                    <input className={`  flex flex-col`}  type="file" placeholder='Insert image for profile'  name="image" onChange={handleChange} required/>
                 </div>
                </div>
                    <div  className='w-3/4'>
       
                <button className='bg-green-600 font-semibold text-lg font-briem my-4 text-white w-full px-4 py-2 rounded-md hover:bg-green-500' onClick={handleSubmit}>Register</button>
                
                </div>
                <div>
                    <div className='flex flex-row font-normal text-lg gap-2'>
                    <h1>Have an account already?</h1><NavLink to='/login' className='text-green-600 font-semibold hover:cursor-pointer hover:scale-110 duration-500 ease-in-out' >Login</NavLink>
                    </div>
                </div>
            </div>
            
        </div>
    </div>
  )
}

export default Register