import React, { useState } from 'react';

import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Spinner from 'react-bootstrap/Spinner'

import { useDispatch, useSelector } from 'react-redux';
import { GoogleLogin } from 'react-google-login'
import { useHistory } from 'react-router-dom'

import { signIn, signUp } from '../actions'

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' }

function SignIn() {

   const dispatch = useDispatch();
   const [isSignUp, setIsSignUp] = useState(false);
   const history = useHistory()

   const errorMessage = useSelector(state => state.errorMessage)

   const [formData, setFormData] = useState(initialState)

   const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value })
   };

   const handleSubmit = async e => {
      e.preventDefault()
      if (isSignUp) {
         dispatch(signUp(formData, history))
      } else {
         dispatch(signIn(formData, history))
      }
   }

   const switchMode = () => {
      setIsSignUp((prevIsSignUp) => !prevIsSignUp)
   };

   const googleSuccess = (res) => {
      const result = res?.profileObj; // ? used so you dont get an error, if you dont get the res.
      const token = res?.tokenId;

      try {
         // dispatch({ type: 'AUTH', data: { result, token } });
         if (isSignUp) {
            dispatch(signUp({ firstName: result.givenName, lastName: result.familyName, email: result.email, password: token, confirmPassword: token }, history))

         } else {
            dispatch({ type: 'AUTH', data: { result, token } });
            history.push('/')
            history.go(0)
         }
      } catch (error) {
         console.warn(error)
      }
   };


   const googleFailure = (error) => {
      console.warn("Google Sign In was unsuccesfully, Try Again Later ")
   };

   return (
      <div>

         <Container id="login-form" className="margin">
            {errorMessage ? (
               <div className="d-block text-center p-2 mb-3" style={{ color: "#FF0000", backgroundColor: "#FFCCCC", borderRadius: '10px', borderStyle: 'solid', borderWidth: '2px' }}>{errorMessage.message}</div>
            ) : (
               null
            )}
            <Form onSubmit={handleSubmit}>
               {isSignUp ? (
                  <>
                     <Row>
                        <Col>
                           <div>First Name</div>
                           <Form.Control name='firstName' required onChange={handleChange} />
                        </Col>
                        <Col>
                           <div>Last Name</div>
                           <Form.Control name='lastName' required onChange={handleChange} />
                        </Col>
                     </Row>
                  </>
               ) : (
                  null
               )}
               <Form.Group controlId="formGroupEmail">
                  <div>Email address</div>
                  <Form.Control name='email' type="email" required onChange={handleChange} />
               </Form.Group>
               <Form.Group controlId="formGroupPassword">
                  <div>Password</div>
                  <Form.Control name='password' type="password" required onChange={handleChange} />
               </Form.Group>
               {isSignUp ? (
                  <Form.Group controlId="formGroupPassword">
                     <div>Confirm Password</div>
                     <Form.Control name='confirmPassword' type="password" required onChange={handleChange} />
                  </Form.Group>
               ) : (
                  null
               )}
               <Col className="form-btn"  >
                  <Row className="sign-in-btn" ><Button className="custom-btn" type="submit">{isSignUp ? ('Sign Up') : ('Sign In')}</Button></Row>
                  <Row className="sign-in-btn" >
                     <GoogleLogin
                        clientId='590997606413-ttuvb1ujqqgi8a36k748lhudolsk627g.apps.googleusercontent.com'
                        render={(renderProps) => (
                           <Button className="custom-btn" onClick={renderProps.onClick} disabled={renderProps.disabled} variant='contained'><i className="bi bi-google" /> Google </Button>
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookies-policy='single_host_origin'
                     />
                  </Row>
               </Col>
               <div className="d-flex justify-content-center">
                  {isSignUp ? (
                     <Button size='sm' onClick={switchMode}>Already registered? Sign In</Button>
                  ) : (
                     <Button size='sm' onClick={switchMode}>Need a HotCube account? Sign Up</Button>
                  )}
               </div>
            </Form>
         </Container>
      </div>
   )
}

export default SignIn;