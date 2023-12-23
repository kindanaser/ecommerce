import axios from 'axios';
import React, { useContext, useState } from 'react'
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom'
import {commentSchema} from '../validation/validate.js'
import { CartContext } from '../context/Cart.jsx';
import { UserContext } from '../context/User.jsx';
import { useFormik } from 'formik';
import Input from '../../pages/Input.jsx';
import './product.css'
import { toast } from 'react-toastify';

export default function Products() {
    let {userOrder} = useContext(UserContext);
    const {productId} = useParams()
    let {userToken} = useContext(UserContext);
    const {addToCartContext} = useContext(CartContext);
    const getProduct = async ()=>{
        const {data} = await axios.get(`${import.meta.env.VITE_API_URL}/products/${productId}`)
        return data.product ;
    }
 
   function stars(num) {
     let stars = [];
     for(var i = 0 ; i<num ; i++){
      stars.push( <svg height="16" width="18" viewBox="0 0 576 512">
       <path fill="#dfd330" d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"/>
       </svg> ) ;
        }
        return stars
   }
    const initialValues ={
      comment:'',
      rating:'',
  }
  const onSubmit= async users=>{
    const token = localStorage.getItem('userToken');
    const {data} = await axios.post(`${import.meta.env.VITE_API_URL}/products/${productId}/review`,users ,
    {headers:{Authorization:`Tariq__${token}`}});
    if(data.message =='success'){
     toast.success('your comment added successfully', {
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
 }

const formik = useFormik ({
  initialValues,
  onSubmit, 
  validationSchema:commentSchema,
});

const inputs = [
  {
      id:'comment',
      type:'text',
      name:'comment',
      title:'User Comment',
      value:formik.values.comment,
  },
  {
      id:'rating',
      type:'text',
      name:'rating',
      title:'User Rating',
      value:formik.values.rating,
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

    const {data,isLoading} = useQuery('product',getProduct);
    const addToCart = async (productId)=>{
      const res = await addToCartContext(productId);
      return res;
    }
    
    if(isLoading){
    return <p>Loading...</p>
    }

  return (
    <div className='container py-4'>
         <div className='row'>
         <div className='subImg col-md-1'>
         {data && data.subImages.map( (img , index)=>
          <div className='images mt-3' key={index}> 
          <img src={img.secure_url} className='' />
          </div>)}
         </div>     
         <div className='image col-md-3 ps-5 mt-3'>
          <img src={data.mainImage.secure_url}  />
          </div>
           <div className='col-md-6 mt-3'>
           <h3 className='fs-4'>{data.name}</h3>
           <div className='mb-2 d-flex justify-content-between'>
            <div className='d-flex justify-content-start mb-0'>
            <span className='text-danger me-4 d-flex align-items-center'>finel price is : ${data.price}</span>
           <span className='text-danger me-4 d-flex align-items-center'>discount : {data.discount}%</span>
            </div>
           {userToken? <button className='btn btn-outline-secondary me-4' onClick={()=>addToCart(data._id)} >Add to cart</button>
           :null}
           </div>
            <p className='desc border-top pt-3 mb-4 '>{data.description}</p>   
            <h4 className='fs-5 text-dark fst-italic mb-1 '>reviews about this product</h4>
            {data && data.reviews? data.reviews.map( (rev)=> 
            <div className='review d-flex align-items-center'>
             <img src={rev.createdBy.image.secure_url} className='userImg me-3 my-1 rounded-circle' />
             <span className='me-3 '>{rev.createdBy.userName}:</span>
             <span className='me-3'>{rev.comment}</span>
              {stars(rev.rating)}
            </div>): null}
            {userToken && userOrder && userOrder.status =='deliverd'?
             <form onSubmit={formik.handleSubmit} className='my-3 border-top pt-3'>
              <h4 className='fs-5 text-dark fst-italic mb-3 '>add your comment </h4>
             {renderInputs}
             <button type="submit" className='btn btn-outline-secondary' disabled={!formik.isValid}> Add Comment </button>
               </form>:null}  

           </div>
        </div>
     </div>
  )
}

