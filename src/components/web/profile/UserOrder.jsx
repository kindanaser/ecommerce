import React, { useContext } from 'react'
import { UserContext } from '../context/User.jsx';
import { useQuery } from 'react-query';

export default function UserOrder() {
    let {getOrderContext} = useContext(UserContext);
    const getOrder = async()=>{
        const res = await getOrderContext();
        return res;
      }
      const {data , isLoading}=useQuery("order",getOrder);
      
      if(isLoading){
        <p>Loading...</p>
       }
      let length = data.orders.length;
   
      return (
    <div className="products mt-2 w-75" id="products"> order
        <p className ="m-0">you have create a {data.orders.length} orders</p>
        <p className ="m-0"> your last order is : </p>
        <ul>
          <li>number of product is : {data.orders[length-1].products.length}</li>
          <li>the final price is : {data.orders[length-1].finalPrice}</li>
          <li>the payment type is : {data.orders[length-1].paymentType}</li>
          <li>your address is : {data.orders[length-1].address}</li>
          <li>your phone is : {data.orders[length-1].phoneNumber}</li>
         {data.orders[length-1].couponName == " "?
         <li>the coupon used is : {data.orders[length-1].couponName}</li>:
          <li>the coupon used is : you dont use a coupon </li>}
        </ul>
    </div>

  )
}