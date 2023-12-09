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
    <div className='products row'>
        {data.length?data.map( (product)=>
            <div className='product col-lg-4' key={product._id}>
           <img src={product.mainImage.secure_url} />
           <h2 className='fs-4'>{product.name}</h2>
           <Link className='text-decoration-none text-dark fw-bold' 
           to={`/products/${product._id}`}>Show More</Link>
           </div>
        ):<h2>no products</h2>}
    </div>
  )
}
