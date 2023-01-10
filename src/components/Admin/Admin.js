import React from 'react'
import Button from 'react-bootstrap/Button'

function Admin() {
   return (
      <div >
         <div className="d-flex align-items-center justify-content-around mt-5">
            <Button href="/customerqueue">For Customers</Button>
            <Button href="/chefqueue">For Chefs</Button>
         </div>
      </div>
   )
}

export default Admin
