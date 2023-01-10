import React, { useState } from 'react'
// import { useSelector, useDispatch } from 'react-redux'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Accordion from 'react-bootstrap/Accordion'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Table from 'react-bootstrap/Table'
import Modal from 'react-bootstrap/Modal'
import Barcode from '../Barcode/Barcode'
// import { getOrders } from '../../actions'

function OrderCard({ _id, paymentDate, email, name, status, cart, cubeNumber, handleFinishingOrder}) {
   // const order = useSelector((state) => state.order)
   // const dispatch = useDispatch()
   const [showBarcode, setShowBarcode] = useState(false)

   const handleToggleShow = () =>{
      setShowBarcode(!showBarcode)
   }
   // useEffect(() => {
   //    dispatch(getOrders())
   // }, [dispatch, order])
   const [show, setShow] = useState(false);

   const handleClose = () => setShow(false);
   const handleShow = () => setShow(true);

   const profile = JSON.parse(localStorage.getItem('profile'));
   const userEmail = profile?.result.email;

   const calculateTotal = (items) =>
      items.reduce((ack, item) => ack + item.amount * item.price, 0);

   const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'IDR',
   });

   const handleYes = (_id) => {
      handleFinishingOrder(_id)
      handleClose()
   }

   const isEmailSame = email === userEmail && cart;
   return (
      <div className='mt-2'>
         { isEmailSame ? ( 
            <>
               <Accordion>
                  <Card bg='light' text="dark" className="text-center px-2 pt-1">
                     {showBarcode ? <Barcode cubeNumber={cubeNumber} /> : null}
                     <div className="text-left">Status:<span style={{ color: '#00BD45' }}> {status}</span></div>
                     <h5>{name} / {paymentDate}</h5>
                     <div>Order ID: <b>{_id.substr(_id.length - 3).toUpperCase()}</b></div>
                     {status === "Order Ready" ? (<div>Your order is ready. <b>{cubeNumber ? (`Please go to Cube ${cubeNumber}`):("But please wait, while we processing other orders") } </b></div>) : (null)}
                     <Accordion.Toggle as={Button} variant="link" eventKey="0">
                        <div style={{color: "#000055"}}>Click to Toggle Your Cart</div>
                     </Accordion.Toggle>  
                     <Accordion.Collapse eventKey="0">
                        <Card.Body>
                           <Table id="order-list" striped bordered hover responsive size='sm'>
                              <thead>
                                 <tr>
                                    <th><b>Item</b></th>
                                    <th><b>Amount</b></th>
                                    <th><b>Price</b></th>
                                 </tr>
                              </thead>
                              <tbody>
                                 {cart.map(item => (
                                    <tr key={item.itemId}>
                                       <td>{item.title}</td>
                                       <td>{item.amount}</td>
                                       <td>{formatter.format(item.price)}</td>
                                    </tr>
                                 ))}
                                 <tr>
                                    <td colSpan="2"> <b>Total</b></td>
                                    <td><b>{formatter.format(calculateTotal(cart))}</b></td>
                                 </tr>
                              </tbody>
                           </Table>
                        </Card.Body>
                     </Accordion.Collapse>
                     {status==="Order Ready" ? (
                        <Row>
                           <Col><Button onClick={handleToggleShow}>Barcode Scan</Button></Col>
                           <Col><Button onClick={handleShow}>Finish Order</Button></Col>
                        </Row>
                     ):(
                        null
                     )}
                  </Card>
               </Accordion>
               <Modal show={show} onHide={handleClose}>
                  <Modal.Header closeButton>
                     <Modal.Title><b>Confirmation</b></Modal.Title>
                  </Modal.Header>
                  <Modal.Body>Are you sure you want to finish the order?</Modal.Body>
                  <Modal.Footer>
                     <Button variant="secondary" onClick={handleClose}>
                        No
                     </Button>
                     <Button variant="success" onClick={() => handleYes(_id)}>
                        Yes 
                     </Button>
                  </Modal.Footer>
               </Modal>
            </>
         ):(
            null
         )}
      </div>
   )
}

export default OrderCard;