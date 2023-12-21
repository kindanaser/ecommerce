import axios from 'axios';
import React from 'react'
import { useQuery } from 'react-query';
import { Link, useParams } from 'react-router-dom'

export default function CategoriesDetails() {
    const {categoryId} = useParams();
    
    const getCategoryDetails = async ()=>{
        const {data} = await axios.get(`${import.meta.env.VITE_API_URL}/products/category/${categoryId}`)
        return data.products ;
    }
    const {data,isLoading} = useQuery('category_details',getCategoryDetails);
    if(isLoading){
     return <p>Loading...</p>
    }
  return (
    <div className='container py-4'>
       <h3 className='fs-3 fst-italic mb-4'> Categories page </h3>
    <div className='products row d-flex justify-content-center text-center'>
        {data.length?data.map( (product)=>
           <div className='product col-md-12' key={product._id}>
           <img src={product.mainImage.secure_url} className='w-25' />
           <h2 className='fs-4 fst-italic my-3'>{product.name}</h2>
           <Link className='text-decoration-none fw-bold btn btn-outline-secondary' 
           to={`/products/${product._id}`}>Show More</Link>
           </div>
        ):<h2>no products</h2>}
    </div>
    </div>
  )
}




