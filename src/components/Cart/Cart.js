import { useSelector } from 'react-redux'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'

import CartItem from './CartItem'

function Cart({ decreaseAmount, increaseAmount}) {
   
   const cart = useSelector(state => state.cart)

   const calculateTotal = (items) =>
      items.reduce((ack, item) => ack + item.amount * item.price, 0);

   var formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'IDR',
   });

   return (
      <div>
         <Container>
            <Row className='d-flex justify-content-center'>
               <Col>
                  {cart.map(cartItem => (
                     <CartItem key={cartItem._id}
                        cartItem={cartItem}
                        decreaseAmount={decreaseAmount}
                        increaseAmount={increaseAmount}
                     />
                  ))}
               </Col>
               <Col>
                  <h6 className='text-right'>Total</h6>
                  <h6 className='text-right font-weight-bold'>{formatter.format(calculateTotal(cart))}</h6>
                  <Button className='checkout btn-raised' variant="light bg-success" href="/checkout">Checkout</Button>
               </Col>
            </Row>
         </Container> 
      </div>
   )
}

export default Cart