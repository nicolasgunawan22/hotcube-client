import React from 'react'
import '../../App.css'

function MailTemplate({ userName, total, date, cart}) {
   const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'IDR',
   });

   return (
      <div style={{ margin: 0, padding: 0 }}>
         <table align='center' width="600px" style={{ borderCollapse: 'collapse', borderRadius: '10px', fontFamily: ' Rubik, sans - serif' }}>
            <tr bgcolor='#505050' style={{ textAlign: 'center' }}><td colSpan="3"><img src="https://hotcube.my.id/static/media/HotCube.jpg" alt="Hotcube" height='50px' style={{backgroundColor: "white", margin: "10px 5px 10px 5px"}}/></td></tr>

            <tr>
               <td style={{ padding: "10px 30px 20px 30px" }}>
                  <table width='100%' style={{ borderCollapse: "collapse" }}>
                     <tr>
                        <td colSpan="3">
                           <p>Hello, <b>{userName}</b>,</p>
                        </td>
                     </tr>
                     <tr>
                        <td colSpan="3">
                           <h2><b>Pembayaran dan pesanan anda sudah kami terima.</b></h2>
                        </td>
                     </tr>
                     <tr>
                        <td colSpan="3">
                           <p>Terima kasih! Berikut ini detail pembayaranmu:</p>
                        </td>
                     </tr>
                     <tr bgcolor='lightgrey' style={{ margin: 0, padding: "1px 5px 1px 5px" }}>
                        <td><p style={{ margin: 0, padding: "1px 5px 1px 5px" }}>Total Bayar</p></td>
                        <td colSpan="2"><p style={{ margin: 0, padding: "1px 5px 1px 5px" }}><b>{formatter.format(total)}</b></p></td>
                     </tr>
                     <tr bgcolor='lightgrey' style={{ margin: 0, padding: "1px 5px 1px 5px" }}>
                        <td><p style={{ margin: 0, padding: "1px 5px 1px 5px" }}>Waktu Pembayaran</p></td>
                        <td colSpan="2"><p style={{ margin: 0, padding: "1px 5px 1px 5px" }}><b>{date}</b></p></td>
                     </tr>
                     <tr>
                        <td colSpan="3">
                           <h3><b>Rincian Pesanan</b></h3>
                        </td>
                     </tr>
                     <tr style={{textAlign: 'center'}} >
                        <td><b>Item</b></td>
                        <td><b>Amount</b></td>
                        <td><b>Price</b></td>
                     </tr>
                     {cart.map(item => (
                        <tr key={item._id}>
                           <td style={{ textAlign: 'center', margin: 0, padding: "1px 0 1px 0" }}>{item.title}</td>
                           <td style={{ textAlign: 'center', margin: 0, padding: "1px 0 1px 0" }}>{item.amount}</td>
                           <td style={{ textAlign: 'center', margin: 0, padding: "1px 0 1px 0" }}>{formatter.format(item.price)}</td>
                        </tr>
                     ))}
                  </table>
               </td>
            </tr>
            <tr>
               <td bgcolor='#505050' style={{ color: 'white', textAlign: "center"}}>
                  <p style={{ margin: "10px 5px 10px 5px" }}>&reg; Hotcube 2021<br />
                     Email ini dikirimkan secara otomatis, mohon untuk tidak membalas.</p>
               </td>
            </tr>
         </table>
      </div>
   )
}

export default MailTemplate;