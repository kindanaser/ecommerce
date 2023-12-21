import axios from 'axios';
import {createContext, useState,} from 'react'
import { toast } from 'react-toastify';

export const CartContext = createContext(null);
 
export function CartContextProvider({children}) {
    let [count , setCount] = useState(0);
    let [data , setData] = useState(null);
 
    const addToCartContext = async (productId)=>{
        try{
            const token = localStorage.getItem("userToken");
            const {data} = await axios.post(`${import.meta.env.VITE_API_URL}/cart`,{productId},
            {headers:{Authorization:`Tariq__${token}`}});
            if(data.message =='success'){
                toast.success('product added successfully', {
                    position: "top-right",
                    autoClose: false,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    });
               }
               setCount(++count);
          return data;
        }catch(error){
            console.log(error);
        }
    }
    let [total] = useState(0)
    const getCartContext = async ()=>{
     try{
         const token = localStorage.getItem("userToken");
        const {data} = await axios.get(`${import.meta.env.VITE_API_URL}/cart` ,
        {headers:{Authorization:`Tariq__${token}`}});
        setData(data); 
        let quantity = 0 ;
        for(let i = 0 ; i<data.products.length ; i++){
         quantity += (data.products[i].quantity) ;
         }
         total = quantity ;
        setCount(total)
         return data
     }catch(error){
        console.log(error);
     }
       
    }

   

    const removeItemContext = async (productId)=>{
        try{
          const token = localStorage.getItem("userToken");
          const {data} = await axios.patch(`${import.meta.env.VITE_API_URL}/cart/removeItem`,{productId},
          {headers:{Authorization:`Tariq__${token}`}})
          setCount(data.cart.products.length);
          return data;
        }catch(error){
            console.log(error);
        }
    }

    const clearCartContext = async ()=>{
        try{
          const token = localStorage.getItem("userToken");
          const {data} = await axios.patch(`${import.meta.env.VITE_API_URL}/cart/clear`,{} ,
          {headers:{Authorization:`Tariq__${token}`}});
          if(data.message =='success'){
            toast.success('Cart Cleared Successfully', {
                position: "top-right",
                autoClose: false,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
           }
          return data;
        }catch(error){
            console.log(error);
        }
    }

    const decreaseQuntityContext = async (productId)=>{
        try{
            const token = localStorage.getItem("userToken");
            const {data} = await axios.patch(`${import.meta.env.VITE_API_URL}/cart/decraseQuantity`,{productId},
            {headers:{Authorization:`Tariq__${token}`}});
            if(data.message =='success'){
                toast.success('decrease quntity successfully', {
                    position: "top-right",
                    autoClose: false,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    });
               }
              setCount(--count);
          return data;
        }catch(error){
            console.log(error);
        }
    }

    const increaseQuntityContext = async (productId)=>{
        try{
            const token = localStorage.getItem("userToken");
            const {data} = await axios.patch(`${import.meta.env.VITE_API_URL}/cart/incraseQuantity`,{productId},
            {headers:{Authorization:`Tariq__${token}`}});
            if(data.message =='success'){
                toast.success('increase quntity successfully', {
                    position: "top-right",
                    autoClose: false,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    });
               }
             
              setCount(++count);
          return data;
        }catch(error){
            console.log(error);
        }
    }
   
    return <CartContext.Provider value={{addToCartContext ,  getCartContext , clearCartContext , decreaseQuntityContext ,
        increaseQuntityContext ,
    removeItemContext , setCount , count , data}}>
        {children}
    </CartContext.Provider>
}
