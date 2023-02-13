import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getOrders, updateOrder, getEspData } from '../../actions'
import Table from 'react-bootstrap/Table'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'

function ChefQueue() {
   const order = useSelector((state) => state.order)
   const espData = useSelector((state) => state.espData)
   const dispatch = useDispatch()

   useEffect(() => {
      dispatch(getOrders())
      dispatch(getEspData())
   }, [dispatch, order])
   const esp = []
   const lastEspData = []

   for (var i = 0; i < 2; i++) {
      esp[i] = espData.filter(data => data.cubeId === (i + 1).toString())
      lastEspData[i] = esp[i][esp[i].length - 1]
   }

   const handleOrderReady = (_id) => {
      order.map(item => {
         if (item._id === _id) {
            dispatch(updateOrder(item._id, { ...item, status: "Order Ready" }))
            if (lastEspData[0].status === 'empty') {
               setToCubeOne(_id)
            } else if (lastEspData[1].status === 'empty') {
               setToCubeTwo(_id)
            }
         } else {
            dispatch(updateOrder(item._id, { ...item }))
         }
      })
   }

   const setToCubeOne = (_id) => {
      order.forEach(item => {

         if (item._id === _id) {
            dispatch(updateOrder(item._id, { ...item, status: "Order Ready", cubeNumber: '1' }))
         } else {
            dispatch(updateOrder(item._id, { ...item }))
         }
      })
   }

   const setToCubeTwo = (_id) => {
      order.forEach(item => {
         if (item._id === _id) {
            dispatch(updateOrder(item._id, { ...item, status: "Order Ready", cubeNumber: '2' }))
         } else {
            dispatch(updateOrder(item._id, { ...item }))
         }
      })
   }

   return (
      <div className="admin-root">
         <Container>
            <h2 className="mb-4">Chef</h2>
            <Table striped bordered hover responsive>
               <thead>
                  <tr>
                     <th>Order No</th>
                     <th>Date</th>
                     <th>Customer</th>
                     <th>Status</th>
                     <th>Cart</th>
                     <th>Ready</th>
                     <th>Cube</th>
                  </tr>
               </thead>
               <tbody>
                  {order.map(ord => (ord.status !== "Order Finished" ? (
                     <tr key={ord._id}>
                        <td>{ord._id.substr(ord._id.length - 3).toUpperCase()}</td>
                        <td>{ord.paymentDate}</td>
                        <td>{ord.name.split(" ")[0].toUpperCase()} {ord.name.split(" ")[1][0].toUpperCase()}.</td>
                        <td>{ord.status}</td>
                        <td><div className='mx-3'>{ord.cart.map(item => (<Row key={item._id} className="text-left">{item.amount} x {item.title}</Row>))}</div></td>
                        <td>
                           <Button onClick={() => handleOrderReady(ord._id)}><i className="bi bi-patch-check"></i></Button>

                        </td>
                        {ord.status === "Order Ready" ? (
                           <>
                              <td>
                                 <p>{ord.cubeNumber}</p>
                                 <div className='d-flex justify-content-center'>
                                    {/* <Button className="m-0" onClick={() => setToCubeOne(ord._id)}>1</Button>
                                    <Button className="m-0" onClick={() => setToCubeTwo(ord._id)}>2</Button> */}
                                 </div>
                              </td>
                           </>
                        ) : (
                           <td>

                           </td>
                        )}
                     </tr>
                  ) : null
                  ))}
               </tbody>
            </Table>
         </Container>
      </div>
   )
}

export default ChefQueue
