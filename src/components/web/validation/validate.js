import * as yup from 'yup';

export const registerSchema =  yup.object({
    userName:yup.string() .required("user name is required") .min(3,"must be at least 3 char") .max(30,"min is 3 char"),
    email:yup.string().required("user email is required").email(),
    password:yup.string() .required("password is required") .min(3,"must be at least 3 char") .max(30,"min is 3 char"),
  })

  export const loginSchema =  yup.object({
    email:yup.string().required("user email is required").email(),
    password:yup.string() .required("password is required") .min(3,"must be at least 3 char") .max(30,"min is 3 char"),
  })

  export const sendCodeSchema =  yup.object({
    email:yup.string().required("user email is required").email(),
  })
  export const forgetPasswordSchema =  yup.object({
    email:yup.string().required("user email is required").email(),
    password:yup.string() .required("password is required") .min(3,"must be at least 3 char") .max(30,"min is 3 char"),
    code:yup.string() .required("code is required") .length(4 ,"must be 4 char") ,
  })
  export const orderSchema =  yup.object({
    phone:yup.string().required("user phone is required") .length(10,"must be 10 numbers"),
    address:yup.string() .required("address is required"),
    couponName:yup.string() .notRequired("address is not required"),
  })

  export const commentSchema =  yup.object({
    comment:yup.string().required("your comment is required") .max(150,"your comment is too long"),
    rating:yup.number() .required("your rating is required") .min(1,'at least one') .max(5,'The rating must be out of five'),
  })