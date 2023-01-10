import React from 'react';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import MenuCard from './MenuCard'

import "../App.css"

function Foods({addToCart}) {

   const foods = [
      {
         itemId: '1',
         title: 'Hottest Fried Chicken',
         price: 25000,
         desc: 'Rice + Fried Chicken + Special Sauce',
         image: "https://images.unsplash.com/photo-1562967914-608f82629710?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=752&q=80"
      },
      {
         itemId: '2',
         title: 'HotCube Fried Rice',
         price: 20000,
         desc: 'Rice  + Egg + Special Sauce',
         image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=752&q=80"

      },
      {
         itemId: '3',
         title: 'HotCube Special Burger',
         price: 35000,
         desc: 'Burger + Fries + Special Sauce',
         image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=602&q=80"

      },
      {
         itemId: '4',
         title: 'Spaghetti Bolognese',
         price: 30000,
         desc: 'Spaghetti + Cheese + The Sauce',
         image: "https://images.unsplash.com/photo-1597933856545-b9ee519aa0ec?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=80"

      },
      {
         itemId: '5',
         title: 'Triple Hot Fried Chicken',
         price: 30000,
         desc: 'Rice + Fried Chicken + Special Sauce',
         image: "https://images.unsplash.com/photo-1562967914-608f82629710?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=752&q=80"
      },
      {
         itemId: '6',
         title: 'Super Hot Cheese Burger',
         price: 40000,
         desc: 'Burger + Fries + Special Sauce',
         image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=602&q=80"

      },
   ]
   
   return (
      <div className='menu-carousel'>
         <Row>
            {foods.map(food => (
               <Col className="my-3" key={food.itemId} xs={6} md={3} lg={2}><MenuCard
                  itemId={food.itemId}
                  title={food.title}
                  price={food.price}
                  desc={food.desc}
                  image={food.image}
                  addToCart={addToCart}
               />
               </Col>))}
         </Row>
      </div>
   )
}

export default Foods