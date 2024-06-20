import React, { useState } from 'react'
import logo from '../assets/react.svg'
import { BsBagCheck } from "react-icons/bs";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { RiCustomerService2Line } from "react-icons/ri";
import { FaUser, FaCommentsDollar } from "react-icons/fa";
import { HiMiniUsers } from "react-icons/hi2";
import { MdGroups } from "react-icons/md";
import Navbar from './Navbar';
import { ThemeContext } from '../Contexts/ContextProvider';
import { useContext } from 'react';
import Clients from './Clients';
import ClientsAdd from './ClientsAdd';
import Dashboard from './Dashboard'
import PortfolioAdd from './PortfolioAdd'
import Service from './Services'
import ServiceAdd from './ServicesAdd'
import Testimonial from './Testimonials'
import Portfolioss from './Portfolio'
const Sidebar = () => {
    const { sidebar } = useContext(ThemeContext);

    const [Portfolio, setPortfolio] = useState(false)
    const [clients, setClients] = useState(false)
    const [loggedin, setLoggedin] = useState(false)
    const [service, setService] = useState(false)
    const [testimonial, setTestimonial] = useState(false)

    const [selectedComponent, setSelectedComponent] = useState(<Dashboard />)
    const handleComponent = (component) => {
        switch (component) {
            case 'clientadd':
                setSelectedComponent(<ClientsAdd />);
                break;
            case 'clientlist':
                setSelectedComponent(< Clients />);
                break;

            case 'portfolioadd':
                setSelectedComponent(<PortfolioAdd />);
                break;
            case 'portfoliolist':
                setSelectedComponent(< Portfolioss />);
                break;

            case 'serviceadd':
                setSelectedComponent(<ServiceAdd />);
                break;
            case 'servicelist':
                setSelectedComponent(< Service />);
                break;

            case 'testimoniallist':
                setSelectedComponent(< Testimonial />);
                break;
            case 'dashboard':
                setSelectedComponent(< Dashboard />);
                break;
            default:
                setSelectedComponent(null);
                break;
        }
    }
    const { theme } = useContext(ThemeContext);
    const styles = theme === 'light' ? {
        backgroundColor: '#ffffff',
        color: '#000000',
    } : {
        backgroundColor: '#808080',
        color: '#ffffff',
        append: {

            backgroundColor: '#1C2434',
            color: '#ffffff'
        }

    };

    return (
        <div className={`flex flex-row w-screen h-auto`}>
            <div className={`${sidebar ? 'absolute translate-x-[-500px] transition-all duration-1000 ease-in-out' : 'translate-x-0 transition-all duration-100 ease-in-out'} flex flex-col justify-start items-start bg-[#1C2434] text-gray-200  p-8 shadow-sm lg:w-[20vw] md:w-[20vw]`}>
                <div className='flex flex-row justify-between items-center  lg:gap-4 font-semibold lg:font-bold'>
                    <img src={logo} alt="logo" />
                    <p className=''>Subh Bihani Pvt.Ltd</p>

                </div>
                <div className='flex flex-col gap-1 lg:gap-4 md:gap-2 mt-4 md:flex-col lg:flex-col lg:mt-8 justify-start items-start'>
                    <div>
                        <p onClick={() => handleComponent('dashboard')} className='font-semibold lg:mb-9 cursor-pointer'>Menus</p>
                    </div>
                    <div className='flex flex-row justify-between gap-4 items-center'>
                        <div className='flex flex-row gap-2 justify-center items-center'>
                            <BsBagCheck />
                            <p onClick={() => setPortfolio(!Portfolio)} className='cursor-pointer'>Portfolio</p>
                        </div>
                        <div>
                            {
                                Portfolio ?
                                    <IoMdArrowDropdown className='cursor-pointer' onClick={() => setPortfolio(!Portfolio)} /> :
                                    <IoMdArrowDropup className='cursor-pointer' onClick={() => setPortfolio(!Portfolio)} />
                            }

                        </div>

                    </div>
                    <div>
                        {
                            Portfolio ? <div className='flex flex-col ml-4 gap-1 mt-2'>
                                <div className='flex flex-row gap-2 justify-center items-center'>
                                    <BsBagCheck />
                                    <p onClick={() => handleComponent('portfolioadd')} className='cursor-pointer'>Add</p>
                                </div>
                                <div className='flex flex-row gap-2 justify-center items-center'>
                                    <BsBagCheck />
                                    <p onClick={() => handleComponent('portfoliolist')} className='cursor-pointer'>Lists</p>
                                </div>

                            </div> : ""
                        }
                    </div>
                    {/* next one */}
                    <div className='flex flex-row justify-between gap-4 items-center'>
                        <div className='flex flex-row gap-2 justify-center items-center'>
                            <MdGroups />
                            <p onClick={() => setClients(!clients)} className='cursor-pointer'>Clients</p>
                        </div>
                        <div>
                            {
                                clients ?
                                    <IoMdArrowDropdown className='cursor-pointer' onClick={() => setClients(!clients)} /> :
                                    <IoMdArrowDropup className='cursor-pointer' onClick={() => setClients(!clients)} />
                            }

                        </div>

                    </div>
                    <div>
                        {
                            clients ? <div className='flex flex-col ml-4 gap-1 mt-2'>
                                <div className='flex flex-row gap-2 justify-center items-center'>
                                    <MdGroups />
                                    <p onClick={() => handleComponent('clientadd')} className='cursor-pointer'>Add</p>
                                </div>
                                <div className='flex flex-row gap-2 justify-center items-center'>
                                    <MdGroups />
                                    <p onClick={() => handleComponent('clientlist')} className='cursor-pointer'>Lists</p>
                                </div>

                            </div> : ""
                        }
                    </div>
                    {/* third one */}
                    <div className='flex flex-row justify-between gap-4 items-center'>
                        <div className='flex flex-row gap-2 justify-center items-center'>
                            <RiCustomerService2Line />
                            <p onClick={() => setService(!service)} className='cursor-pointer'>Services</p>
                        </div>
                        <div>
                            {
                                service ?
                                    <IoMdArrowDropdown className='cursor-pointer' onClick={() => setService(!service)} /> :
                                    <IoMdArrowDropup className='cursor-pointer' onClick={() => setService(!service)} />
                            }

                        </div>

                    </div>
                    <div>
                        {
                            service ? <div className='flex flex-col ml-4 gap-1 mt-2'>
                                <div className='flex flex-row gap-2 justify-center items-center'>
                                    < RiCustomerService2Line />
                                    <p onClick={() => handleComponent('serviceadd')} className='cursor-pointer'>Add</p>
                                </div>
                                <div className='flex flex-row gap-2 justify-center items-center'>
                                    <RiCustomerService2Line />
                                    <p onClick={() => handleComponent('servicelist')} className='cursor-pointer'>Lists</p>
                                </div>

                            </div> : ""
                        }
                    </div>
                    {/* fourth one start here */}
                    <div className='flex flex-row justify-between gap-4 items-center'>
                        <div className='flex flex-row gap-2 justify-center items-center'>
                            <FaCommentsDollar />
                            <p onClick={() => setTestimonial(!testimonial)} className='cursor-pointer'>Testimonial</p>
                        </div>
                        <div>
                            {
                                testimonial ?
                                    <IoMdArrowDropdown className='cursor-pointer' onClick={() => setTestimonial(!testimonial)} /> :
                                    <IoMdArrowDropup className='cursor-pointer' onClick={() => setTestimonial(!testimonial)} />
                            }

                        </div>

                    </div>
                    <div>
                        {
                            testimonial ? <div className='flex flex-col ml-4 gap-1 mt-2'>

                                <div className='flex flex-row gap-2 justify-center items-center'>
                                    <FaCommentsDollar />
                                    <p onClick={() => handleComponent('testimoniallist')} className='cursor-pointer'>Lists</p>
                                </div>

                            </div> : ""
                        }
                    </div>
                    {/* fifth one start here */}
                   
                  




                    {/* for loggin */}
                    <div className='flex flex-row justify-between gap-4 items-center md:hidden'>
                        <div className='flex flex-row gap-2 justify-center items-center'>
                            <FaUser />
                            <p onClick={() => setLoggedin(!loggedin)} className='cursor-pointer'>Profile</p>
                        </div>
                        <div>
                            {
                                loggedin ?
                                    <IoMdArrowDropdown className='cursor-pointer' onClick={() => setLoggedin(!loggedin)} /> :
                                    <IoMdArrowDropup className='cursor-pointer' onClick={() => setLoggedin(!loggedin)} />
                            }

                        </div>

                    </div>
                    <div>
                        {
                            loggedin ? <div className='flex flex-col ml-4 gap-1 mt-2'>
                                <div className='flex flex-row gap-2 justify-start items-center'>
                                    <FaUser />
                                    <p className='cursor-pointer'>Info</p>
                                </div>
                                <div className='flex flex-row gap-2 justify-start items-center'>
                                    <FaUser />
                                    <p className='cursor-pointer'>Log Out</p>
                                </div>

                            </div> : ""
                        }
                    </div>

                </div>

            </div>
            <div className='w-full ' style={styles}>
                <Navbar />
                <div className='m-4 p-4 justify-center items-center  rounded overflow-x-auto shadow-lg shadow-black ' style={styles.append}>
                    {
                        selectedComponent
                    }
                </div>
            </div>
        </div>
    )
}

export default Sidebar