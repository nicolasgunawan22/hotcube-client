import React from 'react';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import MenuCard from './MenuCard'

import "../App.css"

function Drinks({ addToCart }) {

   const drinks = [
      {
         itemId: '101',
         title: 'Tea',
         price: 5000,
         desc: 'Just tea (Ice/No Ice)',
         image: "https://images.unsplash.com/photo-1562547256-2c5ee93b60b7?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=380&q=80"
      },
      {
         itemId: '102',
         title: 'Sweet Tea',
         price: 10000,
         desc: 'Tea with sugar',
         image: "https://images.unsplash.com/photo-1517959105821-eaf2591984ca?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=752&q=80"

      },
      {
         itemId: '103',
         title: 'Coffee',
         price: 10000,
         desc: 'Ngopi!',
         image: "https://images.unsplash.com/photo-1512568400610-62da28bc8a13?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80"

      },
      {
         itemId: '104',
         title: 'Ice Lemon Tea',
         price: 10000,
         desc: 'Tea with lemon',
         image: "https://images.unsplash.com/photo-1599390719602-2874f553a716?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80"

      },
      {
         itemId: '105',
         title: 'Hotcube Special Tea',
         price: 15000,
         desc: 'Tea with secret recipe',
         image: "https://images.unsplash.com/photo-1567922045116-2a00fae2ed03?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=375&q=80"
      },
      {
         itemId: '106',
         title: 'Soft Drinks',
         price: 15000,
         desc: 'Coke/Fanta/Sprite',
         image: "https://images.unsplash.com/photo-1592892111425-15e04305f961?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80"

      },
   ]

   return (
      <div className='menu-carousel'>
         <Row>
            {drinks.map(drink => (
               <Col className="my-3" key={drink.itemId} xs={6} md={3} lg={2}><MenuCard
                  itemId={drink.itemId}
                  title={drink.title}
                  price={drink.price}
                  desc={drink.desc}
                  image={drink.image}
                  addToCart={addToCart}
               />
               </Col>))}
         </Row>
      </div>
   )
}

export default Drinks