import jsPDF from "jspdf";
import "jspdf-autotable";

function GeneratePDF(cart, userEmail){
   const calculateTotal = (items) =>
      items.reduce((ack, item) => ack + item.amount * item.price, 0);

   const total = calculateTotal(cart)

   const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'IDR',
   });

   const doc = new jsPDF();

   const tableColumn = ["Item", "Amount", "Price", "Subtotal"];
   
   const tableRows = [];

   cart.forEach(item => {
      const itemData = [
         item.title,
         item.amount,
         formatter.format(item.price),
         formatter.format(item.amount*item.price),
      ];
      tableRows.push(itemData);
   });

   tableRows.push(["Total", "", "", formatter.format(total)])
   
   doc.autoTable(tableColumn, tableRows, { startY: 20 });

   var today = new Date();
   var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
   var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
   var dateTime = date + ' ' + time;
   console.log(dateTime)
   // const date = Date().split(" ");
   // const dateStr = date[0] + date[1] + date[2] + date[3] + date[4];
   doc.text(`HotCube E-Receipt for Transaction at ${dateTime}`, 14, 15);
   doc.save(`HotCube E-Receipt ${dateTime}.pdf`);
};

export default GeneratePDF;