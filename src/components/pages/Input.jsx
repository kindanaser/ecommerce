import React from 'react'

export default function Input({type,id,title,name, onChange , errors , onBlur , touched , value}) {
  return (
    <>
    <div className='input-group mb-3'>
      <label htmlFor={id}>{title}</label>
      <input className='form-control ms-3' type={type} id={id} value={value} name={name} onChange={onChange}
       touched={touched} onBlur={onBlur} />
      {touched[name] && errors[name] && <p className="text text-danger ms-3">{errors[name]}</p>}
    </div>
    </>
  )
}
