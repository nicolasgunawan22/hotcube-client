import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import { useDispatch, useSelector } from 'react-redux';

import Jumbo from './Jumbotron';
import Foods from './Foods';
import Drinks from './Drinks';
import Cart from './Cart/Cart';
import Footer from './Footer';
import { getCart, postCartItem, updateCartItem, deleteCartItem } from '../actions'
import { useLocation } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner'

import "../App.css"

function Home() {
   const dispatch = useDispatch()
   const location = useLocation()
   const cart = useSelector(state => state.cart)
   const [isLoading, setIsLoading] = useState(true)

   useEffect(() => {
      const profile = JSON.parse(localStorage.getItem('profile'));
      const userEmail = profile?.result.email;

      if(profile){
         dispatch(getCart(userEmail))
      }
      setIsLoading(false)
      
   }, [dispatch, location, cart])

   console.log(cart)

   const getTotalItems = (items) =>
      items.reduce((ack, item) => ack + item.amount, 0);
      
   const handleAddToCart = (userEmail, itemId, title, price, amount) => {
      const isItemInCart = cart.find(cartItem => cartItem.itemId === itemId);
      if(isItemInCart){
         cart.map(cartItem =>{
            if (cartItem.itemId === itemId) {
               dispatch(updateCartItem(userEmail, cartItem.itemId, { ...cartItem, amount: cartItem.amount + amount }))
            } /* else {
               dispatch(updateCartItem(userEmail, cartItem.itemId, { ...cartItem}))
            } */
         })
      }else {
         dispatch(postCartItem(userEmail, { itemId, title, price, amount }))
      }
   }
   
   const handleDecreaseAmount = (userEmail, itemId) => {
      cart.map(cartItem => {
         if(cartItem.itemId === itemId){
            if(cartItem.amount === 1){
               dispatch(deleteCartItem(userEmail, cartItem._id))
            }
            dispatch(updateCartItem(userEmail, cartItem.itemId, {...cartItem, amount: cartItem.amount - 1}))
         } /* else {
            dispatch(updateCartItem(userEmail, cartItem.itemId, { ...cartItem }))
         } */
      })
   };

   const handleIncreaseAmount = (userEmail, itemId) => {
      cart.map(cartItem => {
         if (cartItem.itemId === itemId) {
            dispatch(updateCartItem(userEmail, cartItem.itemId, { ...cartItem, amount: cartItem.amount + 1 }))
         } /* else (
            dispatch(updateCartItem(userEmail, cartItem.itemId, { ...cartItem }))
         ) */
      })
   }

   const ColoredLine = ({ color }) => (
      <hr
         style={{
            color: color,
            backgroundColor: color,
            height: 2
         }}
      />
   );

   return (
      <div>
         {isLoading ? (
            <div className="d-flex justify-content-center align-self-center">
               <Spinner animation="border" role="status">
                  <span className="sr-only">Loading...</span>
               </Spinner>
            </div>
            
         ): (
               <div className="bmd-layout-container bmd-drawer-f-b bmd-drawer-overlay">
                  <div id="dw-p1" className="bmd-layout-drawer bg-faded sticky">
                     <Container fluid>
                        <header>
                           <h4 className="text-center font-weight-bold mt-2">Cart ({getTotalItems(cart)})</h4>
                        </header>
                        <div className="list-group">
                           <Cart
                              decreaseAmount={handleDecreaseAmount}
                              increaseAmount={handleIncreaseAmount}
                           />
                        </div>
                     </Container>
                  </div>
                  <main className="bmd-layout-content">
                     <Jumbo />
                     <div className="container">
                        <h1 className='menu-title font-weight-bold mt-4'>Menu</h1>
                        <h3 className='font-weight-bold'>Foods</h3>
                        <ColoredLine color="grey" />
                        <Foods addToCart={handleAddToCart} />
                        <h3 className='font-weight-bold'>Drinks</h3>
                        <ColoredLine color="grey" />
                        <Drinks addToCart={handleAddToCart} />
                     </div>
                     <Footer />
                  </main>
                  <header className="bmd-layout-header sticky">
                     <div className="navbar navbar-dark bg-secondary">
                        <button className="navbar-toggler d-block mx-auto" type="button" data-toggle="drawer" data-target="#dw-p1">
                           <span className="sr-only">Toggle drawer</span>
                           <i className="material-icons"><i className="bi bi-basket3-fill"></i><span className="badge badge-pill badge-secondary">{getTotalItems(cart)}</span></i>
                        </button>
                     </div>
                  </header>
               </div>
            )}           
      </div>
   )
}

export default Home;