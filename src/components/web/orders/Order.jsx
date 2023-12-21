import React, { useContext, useState } from 'react'
import { CartContext } from '../context/Cart.jsx';
import { useQuery } from 'react-query';
import Input from '../../pages/Input.jsx';
import { useFormik } from 'formik';
import { orderSchema } from '../validation/validate.js';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
export default function Order() {
    const navigate = useNavigate();
    const {getCartContext} = useContext(CartContext);
      let [ total ,setTotal ] = useState(0) ;
     const getCart = async()=>{
     const res = await getCartContext();
     let sum = 0 ;
     for(let i = 0 ; i<res.count ; i++){
      sum += (res.products[i].details.price * res.products[i].quantity) ;
      setTotal(sum);
      }
      total = sum ;
       return res;
     }
     const {data,isLoading}=useQuery("cart",getCart);
     if(isLoading){
       return <p>Loading...</p>
     }
     const initialValues ={
        address:'',
        phone:'',
        couponName:'',
    }

    const onSubmit= async ({address , phone})=>{
        try{
        const token = localStorage.getItem("userToken");
        const {data} = await axios.post(`${import.meta.env.VITE_API_URL}/order`,{address , phone},
        {headers:{Authorization:`Tariq__${token}`}});
        if(data.message =='success'){
         toast.success('create order successfully', {
             position: "top-right",
             autoClose: 3000,
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
    navigate('/');
}

     const formik = useFormik ({
        initialValues,
        onSubmit, 
        validationSchema:orderSchema,
    });
    const inputs = [
        {
            id:'address',
            type:'text',
            name:'address',
            title:'User Address',
            value:formik.values.address,
        },
        {
            id:'phone',
            type:'text',
            name:'phone',
            title:'User Phone',
            value:formik.values.phone,
        },  {
          id:'couponName',
          type:'text',
          name:'couponName',
          title:'Coupon Name',
          value:formik.values.couponName,
      }
    ];

    const renderInputs = inputs.map( (input,index)=>
    <Input type={input.type} 
           id={input.id} 
           name={input.name}
           title={input.title} 
           key={index} 
           value={input.value}
           errors={formik.errors} 
           touched={formik.touched} 
           onBlur={formik.handleBlur} 
           onChange={formik.handleChange}/>
)

  return (
    <div className="cart">
    <div className="container">
      <div className="row">
        <div className="cart-items w-75">
          <div className="products" id="products">
            <div className="item">
              <div className="product-info">
                <h2>Product</h2>
              </div>
              <div className="quantity">
                <h2>Quantity</h2>
              </div>
              <div className="price">
                <h2>Price</h2>
              </div>
              <div className="subtotal">
                <h2>Subtotal</h2>
              </div>
            </div>
           {data?.products?(data.products.map((product)=>
            <div className="item">
              <div className="product-info">
                <img src={product.details.mainImage.secure_url} />
                <div className="product-details">
                  <h2>{product.details.name}</h2>
                
                </div>
              </div>
              <div className="quantity">
                <span>{product.quantity}</span>
              </div>
              <div className="price">${product.details.price}</div>
              <div className="subtotal">${product.quantity * product.details.price}</div>
            </div>
           )):'no product in cart'}
                
          <div className='fw-bold ms-auto me-5'>The Total Is : ${total}</div>         
          </div>
        
        </div>
        <div className="row">
        <h2>Create Order</h2>
      <form onSubmit={formik.handleSubmit}>
        {renderInputs}
         <button type="submit" className='btn btn-outline-secondary' disabled={!formik.isValid}> create </button>
     </form>
        </div>
      </div>
    </div>
  </div>
  )
}
