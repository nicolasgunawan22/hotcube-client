import React from 'react';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

function Footer() {
   return (
      <div className="footer mb-4">
         <Container className="footerContainer">
            <Row>
               <Col className=''><a href="/about">About</a></Col>
               {/* <Col className=''><a href="/feedback">Feedback</a></Col>
               <Col className=''><a href="/termsandconditions">Terms and Conditions</a></Col> */}
            </Row>
            <p>© Copyright 2021 Hotcube - All Rights Reserved</p>
         </Container>
      </div>
   )
}

export default Footer