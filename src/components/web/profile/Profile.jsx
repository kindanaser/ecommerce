import React, { useContext } from 'react'
import { UserContext } from '../context/User.jsx'
import style from './profile.module.css'
import { Link, Outlet } from 'react-router-dom';
export default function Profile() {
     let {loading} = useContext(UserContext);
     if(loading){
      <p>Loading...</p>
     }
  return (

    <aside className={`${style.profile}`}>
      <div className={`${style.profileLinks}`}>
        <nav>
        <Link to=''>Info</Link>
        <Link to='contact'>Contact</Link>
        <Link to='userOrder'>Order</Link>
        </nav>
      </div>
      <div className={`${style.userData}`}>
        <Outlet />
      </div>
    </aside> 

  )
}
