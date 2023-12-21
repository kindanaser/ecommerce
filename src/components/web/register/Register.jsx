import React from 'react'
import Input from '../../pages/Input.jsx'
import {useFormik} from 'formik';
import {registerSchema} from '../validation/validate.js'
import axios from 'axios'
import { toast } from 'react-toastify';

export default function Register(){
    const initialValues ={
        userName:'',
        email:'',
        password:'',
        image:''
    }

    const handelFieldChange =(event)=>{
        formik.setFieldValue('image',event.target.files[0]);
    }

   const onSubmit= async users=>{
       const formData = new FormData();
       formData.append("userName",users.userName)
       formData.append("email",users.email)
       formData.append("password",users.password)
       formData.append("image",users.image)
       const {data} = await axios.post('https://ecommerce-node4.vercel.app/auth/signup',formData);
       if(data.message =='success'){
        formik.resetForm();
        toast.success('account created successfully , please verify your email to login', {
            position: "bottom-center",
            autoClose: false,
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
        validationSchema:registerSchema,
    });

    const inputs = [
        {
            id:'username',
            type:'text',
            name:'userName',
            title:'User Name',
            value:formik.values.userName,
        },
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
        },
        {
            id:'image',
            type:'file',
            name:'image',
            title:'User image',
            onChange:handelFieldChange,
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
               onChange={input.onChange || formik.handleChange}/>
    )
  return (
    <>
    <div className='container py-5'>
    <div className='row d-flex justify-content-center'>
        <div className='col-md-8 '>
        <h2 className='fs-3 fst-italic mb-4'>Create Account</h2>
     <form onSubmit={formik.handleSubmit}>
        {renderInputs}
        <button type="submit" disabled={!formik.isValid} encType="multipart/form-data" 
        className='btn btn-outline-secondary'> Register </button>
     </form>
    </div>
    </div>
    </div>
    </>
  )
}
