import React, {useState, useEffect} from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getCart } from '../../actions'
import MailTemplate from './MailTemplate'
import { sendEmail } from '../../api'

import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'

function Mail() {
   const location = useLocation()
   const cart = useSelector((state) => state.cart)
   const dispatch = useDispatch()

   useEffect(() => {
      setEmailContent({
         'toEmail': userEmail,
         'subject': "HotCube E-Receipt",
         'htmlFile': `${renderToStaticMarkup(<MailTemplate userName={userName} total={total} date={Date(Date.now()).toString()} cart={cart}/>)}`
      })
      dispatch(getCart(userEmail))
   }, [dispatch, location, cart, userName, userEmail, total])

   const calculateTotal = (items) =>
      items.reduce((ack, item) => ack + item.amount * item.price, 0);

   const total = calculateTotal(cart)

   const profile = JSON.parse(localStorage.getItem('profile'));
   const userName = profile?.result.name;
   const userEmail = profile?.result.email;

   const [ emailContent, setEmailContent ] = useState({})
   // console.log(cart)

   const handleSendMail = async (emailContent) => {
      
      try {
         console.log(emailContent)
         await sendEmail(emailContent);
         console.log("Mail sent")
      } catch (error) {
         console.log(error.message)
      }
   }

   return (
      <div className="mt-5">
         <Container>
            <div className="d-flex flex-column align-items-center">
               <Button className="w-100" onClick={() => handleSendMail(emailContent)} variant="outline-success">Send Mail</Button>
            </div>
         </Container>
      </div>
   )
}

export default Mail
