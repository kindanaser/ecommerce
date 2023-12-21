import React from 'react'
import './footer.css'
import { Link } from 'react-router-dom'
export default function Footer() {
  return (
   <div className=" footer py-5">
  <div className="container">
    <div className="row pt-4 copyright ms-3">
    <div className="col-md-6">
        <ul className='d-flex'>
          <li className='me-5 text-secondary fw-bold'><Link to="/" className="text-secondary">HOME</Link></li>
          <li className='me-5 text-secondary fw-bold'><Link to="/allProducts" className="text-secondary">PRODUCTS</Link></li>
          <li className='me-5 text-secondary fw-bold'><Link to="/categories" className="text-secondary">CATEGORIES</Link></li>
        </ul>
      </div>
      <div className="col-md-6 d-flex justify-content-end">
        <p className='fw-bold d-flex justify-content-end text-secondary'> © 2022 Company. Inc</p>
      </div>
    </div>
  </div>
</div>

  )
}
