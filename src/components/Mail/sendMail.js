import React from 'react'
import { sendEmail } from '../../api'
import { renderToStaticMarkup } from 'react-dom/server'
import MailTemplate from '../Mail/MailTemplate'

function sendMail(cart, userEmail) {
   const calculateTotal = (items) =>
      items.reduce((ack, item) => ack + item.amount * item.price, 0);

   const total = calculateTotal(cart)

   const profile = JSON.parse(localStorage.getItem('profile'));
   const userName = profile?.result.name;

   const emailContent = {
      'toEmail': userEmail,
      'subject': "Hotcube E-Receipt",
      'htmlFile': `${renderToStaticMarkup(<MailTemplate userName={userName} total={total} date={Date(Date.now()).toString()} cart={cart} />)}`
   }

   const handleSendMail = async (emailContent) => {
      try {
         await sendEmail(emailContent);
      } catch (error) {
         console.warn(error.message)
      }
   }
   handleSendMail(emailContent)
}

export default sendMail
