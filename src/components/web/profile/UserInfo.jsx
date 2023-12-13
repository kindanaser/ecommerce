import React, { useContext } from 'react'
import { UserContext } from '../context/User.jsx';

export default function UserInfo() {
    
    let {userData , loading} = useContext(UserContext);

    if(loading){
     <p>Loading...</p>
    }
  return (
    <div>
         <h2>{userData.userName}</h2>
         <img src={userData.image.secure_url} />
    </div>
  )
}
