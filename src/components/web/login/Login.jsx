import React, { useContext } from 'react'
import Input from '../../pages/Input.jsx'
import {useFormik} from 'formik';
import {loginSchema} from '../validation/validate.js'
import axios from 'axios'
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/User.jsx';
export default function Login(){
    const navigate = useNavigate();
    let {userToken , setUserToken} = useContext(UserContext);
    const initialValues ={
        email:'',
        password:'',
    }

    if(userToken){
        navigate(-1);
    }
 
   const onSubmit= async users=>{
       const {data} = await axios.post('https://ecommerce-node4.vercel.app/auth/signin',users);
       localStorage.setItem("userToken",data.token);
       setUserToken(data.token);
       if(data.message =='success'){
        formik.resetForm();
        toast.success('login successfully', {
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
       navigate("/")
    }

    const formik = useFormik ({
        initialValues,
        onSubmit, 
        validationSchema:loginSchema,
    });

    const inputs = [
        {
            id:'email',
            type:'email',
            name:'email',
            title:'User Email',
            value:formik.values.email,
        },
        {
            id:'password',
            type:'password',
            name:'password',
            title:'User Password',
            value:formik.values.password,
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
    <>
    <div className='container py-5'>
        <div className='row d-flex justify-content-center'>
        <div className='col-md-8 '>
        <h2 className='fs-3 fst-italic mb-4'>Login</h2>
     <form onSubmit={formik.handleSubmit}>
        {renderInputs}
        <button type="submit" className='btn btn-outline-secondary' disabled={!formik.isValid}> Login </button>
       <Link to='/sendcode' className='ms-2 btn btn-outline-secondary text-decoration-none'>forgetpassword</Link>

     </form>
     </div>
   </div>
    </div>
    </>
  )
}
