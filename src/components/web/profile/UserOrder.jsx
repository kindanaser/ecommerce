import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../context/User.jsx';
// import { useQuery } from 'react-query';

export default function UserOrder() {
    let {userOrder} = useContext(UserContext);
    let {isloading} = useContext(UserContext);
    // if(loading){
    //  <p>Loading...</p>
    // }
    // let [length] = useState(0);
    // const getOrder = async()=>{
    //     const res = await getOrderContext();
    //     length = (res.orders.length) -1 ;
    //     return res.orders[length];
    //   }
    //   const {isLoading , data}=useQuery("order",getOrder);
     
      if(isloading){
        <p>Loading...</p>
       }

  //  useEffect( ()=>{setUserOrder()} ,[])
      //  console.log(userOrder);
  
   
      return (
    <div className="mt-2 w-75"> orders
   
     <p> about your order : </p>
          <p>the final price is : {userOrder.finalPrice} </p>
          <p>the payment type is : {userOrder.paymentType}</p>
          <p>the order status is : {userOrder.status}</p>
          <p>your address is : {userOrder.address}</p>
          <p>your phone is : {userOrder.phoneNumber}</p>
         {userOrder.couponName == ""?
         <p>the coupon used is : {userOrder.couponName}</p>:
          <p>the coupon used is : you dont use a coupon </p>
          }
    </div>

  )
}
