import React, { useState,useEffect } from 'react'
import { IoMdNotifications } from "react-icons/io";
import { MdDarkMode } from "react-icons/md";
import { FaLightbulb } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { IoReorderThreeSharp } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import logo from '../assets/react.svg'
import { ThemeContext } from '../Contexts/ContextProvider';
import { useContext } from 'react';
import { FaEye } from "react-icons/fa";
import axios from 'axios';
import { IoExitOutline } from "react-icons/io5";
import { userContext } from '../userContext/userContext';
import Profile from '../Pages/Profile';
const Navbar = () => {
    const {user}=useContext(userContext)
    const { theme, toggleTheme, sidebarToggle } = useContext(ThemeContext);
    const [popup, setPopup] = useState(false)
    const styles = {
        light: {
            backgroundColor: 'white',
            color: 'black',
        },
        dark: {
            backgroundColor: '#1C2434',
            color: 'white',
        },
    };
    const [unreadMessageCount, setUnreadMessageCount] = useState(0);
    const [message, setMessage]=useState([])
    const fetchMessage=()=>{
        fetch('http://localhost:5000/api/messeges?read=0')
        .then(response => response.json())
        .then(data => {
          setMessage(data)
          const unreadCount = data.length;
          setUnreadMessageCount(unreadCount);
        })
        .catch(error => {
          console.error('Error fetching unread messages:', error);
        });
      }
      
    useEffect(() => {
        fetchMessage()
    }, []);
    const [toggle, setToggle]=useState(false)
    const handleRead = async (messageId) => {
        try {
          const response = await axios.put(`http://localhost:5000/api/messeges/${messageId}`, {
            read: 1
          });
      
          if (response.status === 200) {
            console.log('Message successfully marked as read!');
            fetchMessage();
          } else {
            console.error('Error marking message as read:', response.data);
          }
        } catch (error) {
          console.error('Error updating message:', error);
        }
      };
      console.log(user)
      
    return (
        <div>
            

            <div className='flex lg:flex-row flex-row justify-between items-center p-2 md:p-4 lg:p-6 shadow-navbar w-full ' style={styles[theme]}>
                <div className='flex flex-row justify-center items-center'>
                    <div className=' mr-3'>
                        <IoReorderThreeSharp onClick={sidebarToggle} className='cursor-pointer lg:text-2xl md:text-lg text-md' />
                    </div>
                    <div className='flex lg:flex-row gap-2 lg:gap-4 justify-center items-center '>

                        <input className='border lg:py-1 rounded-sm ' type="text" placeholder='Search' /><FaSearch className='cursor-pointer lg:text-2xl md:text-lg text-md' />
                    </div>

                </div>
                <div className='flex gap-1 lg:flex-row lg:gap-6 md:gap-4 justify-center items-center'>
                    <div>
                        {
                            theme === 'dark' ?
                                <FaLightbulb onClick={toggleTheme} color='yellow' className='cursor-pointer lg:text-2xl md:text-lg text-md' /> :
                                < MdDarkMode onClick={toggleTheme} className='cursor-pointer lg:text-2xl md:text-lg text-md' />
                        }
                    </div>
                    <div>
                        {
                            !!user &&(<h1>Hi {user.name}</h1>)
                        }
                    </div>
                    <div>
                    <div className="relative flex items-center">
            <IoMdNotifications onClick={()=>setToggle(!toggle)} size={24} className="cursor-pointer " />
            {unreadMessageCount > 0 && (
                <div className="bg-red-500 text-white rounded-full w-6 h-6 flex justify-center items-center text-xs">
                    {unreadMessageCount}
                </div>
            )}
        </div>       
                      
                    </div>
                    <div className='hidden md:block'>
                        {/* The image will be displayed on medium screens and above */}
                        <img className='cursor-pointer h-14 w-14 rounded-full ' onClick={() => setPopup(true)} src={`http://localhost:5000/uploads/${user.image}`} alt="logo" />
                        {
                            popup ? <div className='bg-white text-black p-4  fixed top-0 right-0 z-50 gap-4 lg:h-auto lg:w-auto shadow-md shadow-black flex flex-col justify-center items-start' onMouseLeave={() => setPopup(false)}>
                               <Profile/>
                            </div> : ''
                        }
                    </div>
                </div>
                </div>
                {
                    toggle?
                <div className='fixed  top-0 p-12 z-50 right-0 bg-white text-black overflow-scroll shadow-lg shadow-black rounded'>
                    <div>
                        <div>
                        <IoExitOutline onClick={()=>setToggle(!toggle)} className='cursor-pointer'/>
                        </div>
                        {
                            message.map((m, index)=>(
                                <div key={index} className='flex flex-ro justify-center'>
                                    <div >
                                        <h1 className='my-8'>Name:{m.name}</h1>
                                        <p className="text-sm white-space-pre-wrap bg-blue-700 text-white rounded-lg p-6">Message:{m.messege}</p>
                                    </div>
                                        <p><FaEye onClick={()=>handleRead(m._id)} className='cursor-pointer'/></p>

                                </div>
                            ))
                        }

                    </div>
        </div>:''
             }

        </div>
    )
}

export default Navbar