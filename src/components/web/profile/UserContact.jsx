import React, { useContext } from 'react'
import { UserContext } from '../context/User.jsx';

export default function UserContact() {
    let {userData , loading} = useContext(UserContext);
    let {userOrder} = useContext(UserContext);
    if(loading){
     <p>Loading...</p>
    }
      
  return (
    <>
      <div className='py-3 d-flex align-items-center'>
         <h2 className='fst-italic fs-4 border-bottom pb-3'>Your Email : {userData.email}</h2>
      </div> 
      {userOrder? 
      <div>
      <p className='my-2 fw-bold fst-italic fs-5'>Your Data Is Updated</p>
      <p className='my-2 fw-bold fst-italic fs-6'>Your phone number - {userOrder.phoneNumber}</p>
      <p className='my-2 fw-bold fst-italic fs-6'>Your address - {userOrder.address}</p>
      </div>:null}
     
      
    </>
  )
}
