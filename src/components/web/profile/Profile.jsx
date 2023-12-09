import React, { useContext } from 'react'
import { UserContext } from '../context/User.jsx'

export default function Profile() {
     let {userData} = useContext(UserContext);
  return (
<div className="card border-success m-3" style={{maxWidth: '18rem'}}>
  <div className="text-success card-header fw-bold">{userData.userName} <span className='mx-2'>|</span> {userData.status}</div>
  <div className="card-body text-success">
    <h5 className="card-title">Your email is : {userData.email}</h5>
    <p className="card-text">Your role is : {userData.role}</p>
  </div>
</div>


  )
}
