import React from 'react';
import Container from 'react-bootstrap/Container'
import Carousel from 'react-bootstrap/Carousel'
import "../App.css"

function Jumbo() {

   const promotions = [
      {
         "id": "1",
         "title": "Today's Specials",
         "description": "Taste it Now. Available Until the End of the Month.",
         "image": "https://images.unsplash.com/photo-1615653633551-25dd80d2765a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80",
         "imageAlt": "PromotionOne",
         "link": "/PromotionOne"
      },
      {
         "id": "2",
         "title": "Delicious Breakfast Meal",
         'description': "50% OFF. Available from 7-9 AM.",
         "image": "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80",
         "imageAlt": "PromotionTwo",
         "link": "/PromotionTwo"
      },  
      {
         "id": "3",
         "title": "Super Monday Deals",
         'description': "Buy 1 Get 1 FREE. Available Every Monday.",
         "image": "https://images.unsplash.com/photo-1525351326368-efbb5cb6814d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=80",
         "imageAlt": "PromotionThree",
         "link": "/PromotionThree"
      },  
   ]

   return (
      <div>
         <Carousel>
            {promotions.map(promotion => (
               <Carousel.Item key={promotion.id}>
                  <a href="/">
                     <div className="jumbotron">
                        <img src={promotion.image} className="header-img" alt={promotion.imageAlt}></img>
                        <Container className="header-text">
                           <h1>{promotion.title}</h1>
                           <h6>{promotion.description}</h6>
                        </Container>
                     </div>
                  </a>
               </Carousel.Item>
            ))}
         </Carousel>
      </div>
   )
}

export default Jumbo;