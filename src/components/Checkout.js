import { useSelector, useDispatch } from 'react-redux'
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Modal from 'react-bootstrap/Modal'

import { useLocation } from 'react-router-dom'
import CartItem from './Cart/CartItem';
import { useEffect, useState } from "react";
import { getUser, getCart, updateCartItem, deleteCartItem, updateUser, ordering, postOrder } from '../actions'
import GeneratePDF from './Receipt/Receipt'
import sendMail from './Mail/sendMail'

function Checkout() {
   const dispatch = useDispatch()
   const location = useLocation()
   
   const cart = useSelector((state) => state.cart)
   const users = useSelector((state) => state.users)
   const orderForReceipt = useSelector((state) => state.orderForReceipt)

   useEffect(() => {
      const profile = JSON.parse(localStorage.getItem('profile'));
      const userEmail = profile?.result.email;

      dispatch(getCart(userEmail))
      dispatch(getUser())
   }, [dispatch, location, cart])

   const [amount, setAmount] = useState(0)
   const [isTopUp, setIsTopUp] = useState(false)
   const [isPaid, setIsPaid] = useState(false)
   const [message, setMessage] = useState('')
   const [show, setShow] = useState(false);
   
   const profile = JSON.parse(localStorage.getItem('profile'));
   const userEmail = profile?.result.email;

   var balance;
   users.forEach(function (item, index) {
      if (item.email === userEmail){
         balance = item.balance
      }
   });

   const calculateTotal = (items) =>
      items.reduce((ack, item) => ack + item.amount * item.price, 0);

   const handleClose = () => setShow(false);
   const handleShow = () => {
      if(cart){
         setShow(true)
      }
   };

   const handleDecreaseAmount = (userEmail, itemId) => {
      cart.map(cartItem => {
         if (cartItem.itemId === itemId) {
            if (cartItem.amount === 1) {
               dispatch(deleteCartItem(userEmail, cartItem._id))
            }
            dispatch(updateCartItem(userEmail, cartItem.itemId, { ...cartItem, amount: cartItem.amount - 1 }))
         } else {
            dispatch(updateCartItem(userEmail, cartItem.itemId, { ...cartItem }))
         }
      })
   };

   const handleIncreaseAmount = (userEmail, itemId) => {
      cart.map(cartItem => {
         if (cartItem.itemId === itemId) {
            dispatch(updateCartItem(userEmail, cartItem.itemId, { ...cartItem, amount: cartItem.amount + 1 }))
         } else (
            dispatch(updateCartItem(userEmail, cartItem.itemId, { ...cartItem }))
         )
      })
   }

   const handlePay = () => {
      var total = calculateTotal(cart)
      users.forEach(function (user, index) {
         if (user.email === userEmail) {
            if (user.balance >= total){
               dispatch(updateUser(user._id, { ...user, balance: user.balance - total }))
               dispatch(ordering(user.cart))
               
               let { createdAt, balance, password, _id, ...y } = user;

               var today = new Date();
               var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
               var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
               var dateTime = date + ' ' + time;
               console.log(dateTime)
               dispatch(postOrder({ ...y, status: "Order Received", paymentDate: dateTime.toString()}))
               
               const cart = user.cart
               cart.forEach(function (item, index) {
                  const _id = item._id
                  dispatch(deleteCartItem(user.email, _id))
               })
               setIsPaid(true)
               sendMail(cart, userEmail)
            } else {
               setMessage('Balance is not sufficient, please top up, then try again!')
            }
         }
      });
      setShow(false)
   }

   const switchMode = () => {
      setIsTopUp((prev) => !prev)
   }

   const handleTopUp = (e) => {
      e.preventDefault()
      users.forEach(function (item, index) {
         if (item.email === userEmail) {
            dispatch(updateUser(item._id, { ...item, balance: item.balance + parseInt(amount) }))
         }
      });
      
   }

   const handleChange = (e) => {
      setAmount(e.target.value)
   };

   const ColoredLine = ({ color }) => (
      <hr
         style={{
            color: color,
            backgroundColor: color,
            height: 1
         }}
      />
   );

   const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'IDR',
   });

   

   return(
      <div>
         <Container>
            <Row className='my-3'>
               <Col className='order-2 order-lg-1' md={12} lg={6}>
                  <h4>Review Your Cart</h4>
                  {calculateTotal(cart) ? (
                     <>
                        <ColoredLine color="black" />
                        {cart.map(cartItem => (
                           <CartItem key={cartItem._id}
                              cartItem={cartItem}
                              decreaseAmount={handleDecreaseAmount}
                              increaseAmount={handleIncreaseAmount}
                           />
                        ))}
                        <ColoredLine color="black" />
                        <div className="d-flex flex-row justify-content-between">
                           <h5 className='text-right font-weight-bold'>Total: {formatter.format(calculateTotal(cart))}</h5>
                        </div>
                     </>
                  ):(
                     null
                  )}    
               </Col>
               
               <Col className='order-1 order-lg-2' md={12} lg={6}>
                  <div>
                     <h4>Your Balance</h4>
                     <ColoredLine color="black" />

                     <div className="d-flex justify-content-between">
                        <h6 className='font-weight-bold'>{formatter.format(balance)}</h6>
                        <Button className='bg-secondary mb-5' variant="light" onClick={switchMode}>Toggle TOP UP</Button>
                     </div>

                     {isTopUp ? (
                        <Form onSubmit={handleTopUp}>
                           <Form.Group controlId="formBasicText">
                              <Form.Control name="amount" type="number" placeholder="Amount" onChange={handleChange} />
                           </Form.Group>
                           <Button className='bg-success mb-5' variant="light" type="submit">TOP UP</Button>
                        </Form>
                     ) : (
                        null
                     )}
                  </div>
                  <div className='d-flex flex-column'>
                     <Button className='bg-success' variant="light" onClick={handleShow}>PAY</Button>
                     <div>{message}</div>
                     {isPaid ? (
                        <Button onClick={() => GeneratePDF(orderForReceipt, userEmail)}>Receipt</Button>
                     ):(
                        null
                     )} 
                  </div>
                  <p className="mt-5">Please go to <i className="bi bi-layout-text-sidebar-reverse"></i>, to check the order status.</p>
                  <p>When the order is ready, you can click "Scan Barcode" to open the cube by scanning the barcode on it.</p>
               </Col>
            </Row>

            <Modal show={show} onHide={handleClose}>
               <Modal.Header closeButton>
                  <Modal.Title><b>Confirmation</b></Modal.Title>
               </Modal.Header>
               <Modal.Body>Are you sure you want to send this order?</Modal.Body>
               <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                     No
                  </Button>
                  <Button variant="success" onClick={handlePay}>
                     Yes
                  </Button>
               </Modal.Footer>
            </Modal>
         </Container>
      </div>
   )
}

export default Checkout;