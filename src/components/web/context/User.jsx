import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let UserContext = createContext(null);

export default function UserContextProvider({children}){

    let [userToken, setUserToken] = useState(null);
    let [userData , setUserData] = useState(null);
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
        try{
            const token = localStorage.getItem("userToken");
           const {data} = await axios.get(`${import.meta.env.VITE_API_URL}/order` ,
           {headers:{Authorization:`Tariq__${token}`}});
            return data
        }catch(error){
           console.log(error);
        }
          
       }
    useEffect(()=>{
        getUserData()}
    ,[userToken])
 
    return <UserContext.Provider value={{userToken, setUserToken , userData , 
    setUserData , loading , getOrderContext}}>
     {children}
    </UserContext.Provider>
}