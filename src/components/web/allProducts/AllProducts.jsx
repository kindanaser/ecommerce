import axios from 'axios';
import React, { useState } from 'react'
import { useQuery } from 'react-query';
import './allProduct.css'


export default function AllProducts() {
    let [page , setPage] = useState(1);
    let [sort , setSort] = useState('');
    let [maxPrice , setMaxPrice] = useState(0);
    let [minPrice , setMinPrice] = useState(0);
    let [search , setSearch] = useState('');
    const getProduct = async ()=>{
      if(maxPrice == 0 && minPrice == 0 && search ==''){
        const {data} = await axios.get(`${import.meta.env.VITE_API_URL}/products?page=${page}&limit=4&sort=${sort}`);
       console.log(data);
        return data ;
       }
       else if(maxPrice == 0 && minPrice == 0 && search !=''){
        const {data} = await axios.get(`${import.meta.env.VITE_API_URL}/products?page=${page}&limit=4&sort=${sort}&search=${search}`);
        console.log(data)
        return data;
       }
        else if(maxPrice != 0 && minPrice != 0 && search =='' && sort ==''){
        const {data} = await axios.get(`${import.meta.env.VITE_API_URL}/products?page=${page}&limit=4&sort=${sort}&finalPrice[gte]=${minPrice}&finalPrice[lte]=${maxPrice}`);
        console.log(data)
        return data ;
       }
        else{
         const {data} = await axios.get(`${import.meta.env.VITE_API_URL}/products?page=${page}&limit=4&sort=${sort}&finalPrice[gte]=${minPrice}&finalPrice[lte]=${maxPrice}&search=${search}`);
         console.log(data)
         return data ;
        }
        
    }
   
    const {data , isLoading} = useQuery('product',getProduct);
    if(isLoading){
    return 
    <p>Loading...</p>
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

   const handleSubmit = (e)=>{
    e.preventDefault()
    setMinPrice(e.target.min.value);
    setMaxPrice(e.target.max.value);
   }
  
  return (
   <div className='container py-5'>
    <div className='d-flex justify-content-between pb-4'>
     <h3 className='fs-3 fst-italic'> Products page </h3>
     <span className='fs-6 fst-italic'>page - {page}</span>
    </div>
    <div className='mb-3 row h-25'>
    <div className='col-md-4 d-flex'>
      <label htmlFor='sort' className='d-flex align-items-center me-3 fst-italic'>Sort</label>
    <select value={sort} onChange={e=>setSort(e.target.value)} className="form-select" id='sort' aria-label="Default select example">
  <option selected value={'categoryId'} onChange={e=>setSort(e.target.value)}>Sort products by</option>
  <option value={'name'} onClick={e=>setSort(e.target.value)}>A-Z</option>
  <option value={'-name'} onClick={e=>setSort(e.target.value)}>Z-A</option>
  <option value={'finalPrice'} onClick={e=>setSort(e.target.value)}>lowest price to highest</option>
  <option value={'-finalPrice'} onClick={e=>setSort(e.target.value)}>highest price to lowest</option>
  <option value={'discount'} onClick={e=>setSort(e.target.value)}>lowest discount to highest</option>
  <option value={'-discount'} onClick={e=>setSort(e.target.value)}>highest discount to lowest</option>
    </select>
    </div>
   <div className='col-md-4 d-flex'>
    <form onSubmit={handleSubmit} className='d-flex'>
   <label htmlFor='min' className='d-flex align-items-center mx-2 fst-italic'>min price</label>
   <input className='form-control ms-2' type='text' name='min' placeholder='min'
    id='min' />
   <label htmlFor='max' className='d-flex align-items-center mx-2 fst-italic'>max price</label>
   <input className='form-control ms-2' type='text' name='max' placeholder='max'
   id='max' />
   <button type="submit" className='btn btn-outline-secondary ms-2'> Go </button>
   </form> 
  </div>
  <div className='col-md-4 d-flex'>
  <label htmlFor='search' className='d-flex align-items-center mx-2 fst-italic'>Search</label>
  <input className='form-control ms-3' type='text' name='search' placeholder='Search' 
   id='search' onClick={e=>setSearch(e.target.value)} />
    <button type="submit" className='btn btn-outline-secondary ms-2'>Search</button>
  </div>
  </div>
  
    <div className='container row'>
    {data?.products?(data.products.map((product)=>
  <div className='product col-md-6 pb-5 d-flex text-center justify-content-center'>
    <div className='col-md-11 offset-1'>
  <div className='col-md-12 d-flex justify-content-center'>
  <img src={product.mainImage.secure_url} className='proImg' /> 
  </div>
  <div className='col-md-12 mt-3'>
      <h4 className='fs-4 fst-italic'>{product.name}</h4>
      <p className='mb-0'>{product.description}</p>
      <span className='py-2'>{stars(product.avgRating)}<br /></span> 
      <span className='text-danger'>${product.finalPrice}</span>   
  </div>
  </div>
 </div>
)) : "no data found"}
    </div>
     <nav className='w-100 d-flex justify-content-center'>
     <ul className="pagination pagination-sm">
      <li className="page-item" onClick={()=>getProduct(setPage(1))}>
      <a className="page-link" href="#">1</a>
     </li>
     <li className="page-item" onClick={()=>{getProduct(setPage(2))}}>
      <a className="page-link" href="#">2</a>
    </li>
    <li className="page-item" onClick={()=>{getProduct(setPage(3))}}>
      <a className="page-link" href="#">3</a>
    </li>
    </ul>
    </nav>
 </div>

  )
}
