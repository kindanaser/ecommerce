import React, { useContext } from 'react'
import { UserContext } from '../context/User.jsx';

export default function UserContact() {
    let {userData , loading} = useContext(UserContext);
    if(loading){
     <p>Loading...</p>
    }
  return (
      <div>
         <h2>{userData.email}</h2>
         <h2>{userData.role}</h2>
      </div> 

  )
}
