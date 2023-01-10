import Button from 'react-bootstrap/Button'

function CartItem({ cartItem, decreaseAmount, increaseAmount}) {
   var formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'IDR',
   });

   const profile = JSON.parse(localStorage.getItem('profile'));
   const userEmail = profile?.result.email
   
   return(
      <div className='justify-content-start'>
         <div className='d-flex' >
            <p className='font-weight-bold my-1 mr-3' key={cartItem._id}>{cartItem.title}</p>
         </div>
         <div className="d-flex align-items-center">
            <p className="my-1">{formatter.format(cartItem.price)}</p>
            <Button style={{ fontSize: "14px" }} size="sm" variant='dark' className='bg-light mx-2 mb-0 py-1' onClick={() => decreaseAmount(userEmail, cartItem.itemId)}>-</Button>
            <p className="my-1">{cartItem.amount}</p>
            <Button style={{ fontSize: "14px" }} size="sm" variant='dark' className='bg-light mx-2 mb-0 py-1' onClick={() => increaseAmount(userEmail, cartItem.itemId)}>+</Button>
         </div>
         
      </div>
   )
}

export default CartItem