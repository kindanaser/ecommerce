import React from 'react'
import {useFormik} from 'formik';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { sendCodeSchema } from '../validation/validate.js';
import Input from '../../pages/Input.jsx';

export default function ForgetPassword() {
    const navigate = useNavigate();
    const initialValues ={
        email:'' }

    const onSubmit= async email=>{
            const {data} = await axios.patch(`${import.meta.env.VITE_API_URL}/auth/sendcode`,email);
             console.log(data) ;
            if(data.message =='success'){
             formik.resetForm();
             toast.success('Check your email', {
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
            navigate("/sendcode")
         }
         const formik = useFormik ({
            initialValues,
            onSubmit, 
            validationSchema:sendCodeSchema,
        });
        const inputs = [
            {
                id:'email',
                type:'email',
                name:'email',
                title:'User Email',
                value:formik.values.email,
            }]
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
//     {/* <Link to='/sendcode' className='text-decoration-none text-dark'>sendcode</Link> */}
  return (
      <div className='container my-3'>
      <p className="my-2 fs-4">ForgetPassword</p>
      <form onSubmit={formik.handleSubmit}>
      {renderInputs}
      <button className='ms-2 btn btn-outline-primary' type="submit" disabled={!formik.isValid}>sendcode
    
      </button>
      </form>
      </div>

  )
}
