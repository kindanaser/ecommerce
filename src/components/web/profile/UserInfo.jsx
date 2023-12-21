import React, { useContext } from 'react'
import { UserContext } from '../context/User.jsx';

export default function UserInfo() {
    
    let {userData , loading} = useContext(UserContext);

    if(loading){
     <p>Loading...</p>
    }
  return (

    <div className='py-3 d-flex align-items-center'>
       <img src={userData.image.secure_url} className='userImg rounded-circle' />
         <h2 className='fst-italic ms-3'>{userData.userName} - {userData.role}</h2>
    </div>
  )
}
