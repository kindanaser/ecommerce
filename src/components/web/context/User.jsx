import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let UserContext = createContext(null);

export default function UserContextProvider({children}){

    let [userToken, setUserToken] = useState(null);
    let [userData , setUserData] = useState(null);
    let [userOrder , setUserOrder] = useState(null);
    let [loading,setLoading] = useState(true);

    const getUserData = async()=>{
       if(userToken) {
        const {data} = await axios.get(`${import.meta.env.VITE_API_URL}/user/profile` , 
       {headers:{authorization:`Tariq__${userToken}`}})
      setUserData(data.user);
      setLoading(false);
       }
       
    }
    const getOrderContext = async ()=>{
        //  try{
            const token = localStorage.getItem("userToken");
           const {data} = await axios.get(`${import.meta.env.VITE_API_URL}/order` ,
           {headers:{Authorization:`Tariq__${token}`}});
           let length = (data.orders.length) -1 ;
           setUserOrder(data.orders[length])
        //     return data
        // }catch(error){
        //    console.log(error);
        // }
       }
    useEffect(()=>{
        getUserData()}
    ,[userToken])

    useEffect(()=>{
        getOrderContext()}
    ,[userToken])
 
    return <UserContext.Provider value={{userToken, setUserToken , userData , 
    setUserData , loading , userOrder ,setUserOrder , getOrderContext }}>
     {children}
    </UserContext.Provider>
}