import React, { useContext } from 'react'
import { UserContext } from '../context/User.jsx';

export default function UserOrder() {
    let {userOrders} = useContext(UserContext);
    let {isloading} = useContext(UserContext);
     
      if(isloading){
        <p>Loading...</p>
       }
   
      return (
    <div className="w-75">      
     <div className='py-3 d-flex align-items-center'>
         <h2 className='fst-italic fs-4 border-bottom pb-3'>Orders Information</h2>
      </div> 
     {/* <p> about your order : </p>
          <p>the final price is : {userOrder.finalPrice} </p>
          <p>the payment type is : {userOrder.paymentType}</p>
          <p>the order status is : {userOrder.status}</p>
          <p>your address is : {userOrder.address}</p>
          <p>your phone is : {userOrder.phoneNumber}</p>
         {userOrder.couponName == ""?
         <p>the coupon used is : you dont use a coupon </p>:
         <p>the coupon used is : {userOrder.couponName}</p>
          } */}

    <table class="table table-dark table-striped">
   <thead>
    <tr>
      <th scope="col">Id</th>
      <th scope="col">FinalPrice</th>
      <th scope="col">OrderStatus</th>
      <th scope="col">PaymentType</th>
      <th scope="col">Address</th>
      <th scope="col">YourPhone</th>
      <th scope="col">CouponName</th>
    </tr>
  </thead>
  <tbody className='text-white'>
    {userOrders?userOrders.map( (order , index) =>
    <tr key={index}>
   <td>{++index}</td>
  <td>{order.finalPrice}</td>
  <td>{order.status}</td>
  <td>{order.paymentType}</td>
  <td>{order.address}</td>
  <td>{order.phoneNumber}</td>
  <td> {order.couponName == ""?
         <p>you dont use a coupon </p>:
         <p>{order.couponName}</p>
          }</td>
    </tr>
    ):null}
  </tbody>
  </table>
    </div>

  )
}
