import React ,{useContext, useEffect}from 'react'
import { userContext } from '../userContext/userContext';
import MainPage from '../Pages/MainPage';
const PrivateRoute = () => {
    const{user}=useContext(userContext);
    if(!user){
        return <div>
            <p className='text-center'>Loading...🤣</p>
        </div>
    }
    return <MainPage/>
     
    }


export default PrivateRoute