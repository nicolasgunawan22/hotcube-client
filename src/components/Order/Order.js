import React, {useEffect, useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { getOrders } from '../../actions'
import OrderCard from './OrderCard'
import { updateOrder } from "../../actions";
import Spinner from 'react-bootstrap/Spinner'

function Order() {
   const order = useSelector((state) => state.order).reverse()
   const dispatch = useDispatch()
   const [isLoading, setIsLoading] = useState(true)
   console.log(order)

   useEffect(()=> {
      dispatch(getOrders())
      setIsLoading(false)
   },[dispatch])

   const handleFinishingOrder = (_id) => {
      order.map(item => {
         if (item._id === _id) {
            dispatch(updateOrder(item._id, { ...item, status: "Order Finished" }))
         }
      })
      order.reverse()
   }

   if (isLoading) return <div className="d-flex justify-content-center align-self-center"> <Spinner animation="border" role="status"> <span className="sr-only">Loading...</span> </Spinner> </div>

   return (
      <div className='container mt-3'>
         <h5>Your Order Status:</h5>
         {
            order.map(ord => (
               <OrderCard 
                  key={ord._id}
                  _id={ord._id}
                  email={ord.email}
                  name={ord.name}
                  status={ord.status}
                  cart={ord.cart}
                  createdAt={ord.createdAt}
                  paymentDate={ord.paymentDate}
                  cubeNumber={ord.cubeNumber}
                  handleFinishingOrder={handleFinishingOrder}
               />
            ))
         }
         
      </div>
   )
}

export default Order
