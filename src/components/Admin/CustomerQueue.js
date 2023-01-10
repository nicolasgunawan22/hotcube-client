import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getOrders } from '../../actions'
import Table from 'react-bootstrap/Table'
import Container from 'react-bootstrap/Container'

function CustomerQueue() {
   const order = useSelector((state) => state.order)
   const dispatch = useDispatch()

   useEffect(() => {
      dispatch(getOrders())
   }, [dispatch, order])

   return (
      <div className="admin-root">
         <Container>
            <h2 className="mb-4">Queue</h2>
            <div className='d-flex'>
               <div className='mx-2 w-50'>
                  <Table hover responsive>
                     <thead>
                        <tr>
                           <th style={{ backgroundColor: '#cd950c', color: "white" }}><b>Received</b></th>
                        </tr>
                     </thead>
                     <tbody>
                        {order.map(ord => (ord.status == "Order Received" ? (
                           <tr key={ord._id} style={{ backgroundColor: '#F5E9CE', color: "#cd950c" }}>
                              <td>{ord._id.substr(ord._id.length - 3).toUpperCase()}</td>
                           </tr>
                        ) : (
                           null
                        )))}
                     </tbody>
                  </Table>
               </div>
               
               <div className='mx-2 w-50'>
                  <Table hover responsive>
                     <thead>
                        <tr>
                           <th style={{ backgroundColor: '#006400', color: "white" }}><b>Ready</b></th>
                           <th style={{ backgroundColor: '#006400', color: "white" }}><b>Cube</b></th>
                        </tr>
                     </thead>
                     <tbody>
                        {order.map(ord => (ord.status == "Order Ready" ? (
                           <tr key={ord._id} style={{ backgroundColor: '#CCE0CC', color: "#006400" }}>
                              <td>{ord._id.substr(ord._id.length - 3).toUpperCase()}</td>
                              <td>{ord.cubeNumber ? (ord.cubeNumber) : ("Please wait...")}</td>
                           </tr>
                        ) : (
                           null
                        )))}
                     </tbody>
                  </Table>
               </div>
            </div>
            
         </Container>
      </div>
   )
}

export default CustomerQueue
