import axios from 'axios'
import { useQuery } from 'react-query';
import { Navigation, Pagination , Autoplay} from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './categories.css'
import { Link } from 'react-router-dom';


export default function Categories() {

  
  const getCategories = async()=>{
    const {data} = await axios.get(`${import.meta.env.VITE_API_URL}/categories/active?limit=9`)
    return data;
  }
 const {data,isLoading} = useQuery('web_categories',getCategories);
 if(isLoading){
  return <p>Loading...</p>
 }
  return (
    <div className='container'>
      <div className='swiper-custom-pagination'></div>
      <Swiper
       modules={[Navigation, Pagination,Autoplay]}
      spaceBetween={50}
      slidesPerView={7}
       navigation
       loop={true}
       autoplay={{
        delay:1000,
       }}
      pagination={{ clickable: true,
       el:'.swiper-custom-pagination' }}
      // onSlideChange={() => }
      // onSwiper={(swiper) =>}
    >
    {data?.categories.length? data?.categories.map( (category)=>
     <SwiperSlide key={category._id}>   
     <Link to={`/products/category/${category._id}`}>
     <div className='category' >
       <img src={category.image.secure_url} />
       </div>
       </Link>
     </SwiperSlide>):'no category found'}
     </Swiper>
    </div>

  )
    }