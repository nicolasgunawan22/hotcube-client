import React, { useState } from 'react';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button';
import "../App.css"

function MenuCard({ itemId, title, price, desc, image, addToCart }) {
   
   const [amount, setAmount] = useState(0)

   const increment = () => {
      setAmount(amount + 1)
   }

   const decrement = () => {
      if (amount > 0) {
         setAmount(amount - 1)
      }
      else {
         setAmount(0)
      }
   }

   var formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'IDR',
   });

   const profile = JSON.parse(localStorage.getItem('profile'));
   const userEmail = profile?.result.email

   return (
      <div className="d-flex h-100">
         <Card className='menu-card'>
            <Card.Img variant="top" src={image} style={{ maxHeight: '100px', objectFit: "cover" }} />
            <Card.Body>
               <Card.Title key={itemId} id="menu-title" className="h6">{title}</Card.Title>
               <Card.Text>{formatter.format(price)}</Card.Text>
               <Card.Text>{desc}</Card.Text>
               <div className="menu-button">
                  <Button style={{ margin: "2px", fontSize: "12px" }} size="sm" variant="primary" onClick={decrement}>-</Button>
                  <div>{amount}</div>
                  <Button style={{ margin: "2px", fontSize: "12px" }} size="sm" variant="primary" onClick={increment}>+</Button>
                  <Button className='mb-0' style={{ fontSize: "12px" }} variant="primary" onClick={() => addToCart(userEmail, itemId, title, price, amount)}><i className="bi bi-basket3-fill"></i></Button>
               </div>
            </Card.Body>
         </Card>
         <br />
      </div>
   )
}
export default MenuCard;