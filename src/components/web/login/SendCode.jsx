import React from 'react'
import Input from '../../pages/Input.jsx'
import {useFormik} from 'formik';
import {forgetPasswordSchema} from '../validation/validate.js'
import axios from 'axios'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function SendCode() {
    const navigate = useNavigate();
    const initialValues ={
        email:'',
        password:'',
        code:'',
    }
    const onSubmit= async user=>{
        const {data} = await axios.patch(`${import.meta.env.VITE_API_URL}/auth/forgotPassword`,user);
        console.log(data)
        if(data.message =='success'){
         formik.resetForm();
         toast.success('reset password successfully', {
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
        navigate("/login")
     }
     const formik = useFormik ({
        initialValues,
        onSubmit, 
        validationSchema:forgetPasswordSchema,
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
        },       {
            id:'code',
            type:'text',
            name:'code',
            title:'Code',
            value:formik.values.code,
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
    <div className='container my-3'>
    <h2>Reset Password</h2>
    <form onSubmit={formik.handleSubmit}>
       {renderInputs}
       <button type="submit" className='btn btn-outline-primary text-decoration-none' disabled={!formik.isValid}> reset password </button>
    </form>
   </div>
  )
}
