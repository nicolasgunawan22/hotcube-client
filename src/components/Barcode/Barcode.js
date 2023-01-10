import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import BarcodeScannerComponent from "react-webcam-barcode-scanner";
import { useHistory } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import { getOrders, getEspData, postEspData } from '../../actions'
import Modal from 'react-bootstrap/Modal'

function Barcode({cubeNumber}) {
   const history = useHistory()
   const order = useSelector((state) => state.order)
   const espData = useSelector(state => state.espData)
   const dispatch = useDispatch()

   useEffect(() => { 
      dispatch(getOrders())
      dispatch(getEspData())
   }, [history, dispatch, order])

   const cube = [
      {
         'id': '1',
         'code': '2dc3a0101937ed858cf6a8982a3f78de6f0f93a9',
      },
      {
         'id': '2',
         'code': 'a0922b47020d1d10e5b90def8e49a5ea952cc301',
      },
      {
         'id': '3',
         'code': '548c59b7b13463a600aa7b3344fd56cdfb50b901',
      },
   ]

   const profile = JSON.parse(localStorage.getItem('profile'));
   const userEmail = profile?.result.email;

   const [data, setData] = useState('Not Found');
   const [text, setText] = useState('');
   const [canRun, setCanRun] = useState(true);
   const [show, setShow] = useState(false);
   const handleClose = () => setShow(false);
   const handleShow = () => setShow(true);

   const handleBarcode = (err, result) => {
      if(result){
         setData(result.text)
         for(var i=0; i<cube.length; i++){
            if (result.text === cube[i].code){
               setText(`You are scanning barcode on the cube ${cube[i].id}`)
            }
         }

         if(data === cube[cubeNumber-1].code && canRun){
            setCanRun(false)
            handleShow()
         }
         else{
            console.log("Wrong Cube")
         }
      }
      else{
         setText('None')
      }
   }

   const handleSend = () => {
      dispatch(postEspData({ status: espData[espData.length - 1].status, cubeId: cubeNumber, command: "open"}))
      handleClose()
   }

   return (
      <div>
         <Container className='d-flex flex-column align-items-center'>
            <BarcodeScannerComponent
               width={250}
               height={250}
               onUpdate={handleBarcode}
            />
            <p>{text}</p>
            <p>{cubeNumber}</p>
            {/* <Button onClick={() => setNum(0)}>1</Button>
            <Button onClick={() => setNum(1)}>2</Button>
            <Button onClick={() => setNum(2)}>3</Button> */}
            <Modal show={show} onHide={handleClose}>
               <Modal.Header closeButton>
                  <Modal.Title><b>Confirmation</b></Modal.Title>
               </Modal.Header>
               <Modal.Body>The cube door will open towards you. Please keep your distance from the door.</Modal.Body>
               <Modal.Footer>
                  <Button variant="success" onClick={handleSend}>
                     Okay
                  </Button>
                  <Button variant="secondary" onClick={handleClose}>
                     Cancel
                  </Button>
               </Modal.Footer>
            </Modal>
         </Container>
      </div>
   )
}

export default Barcode;