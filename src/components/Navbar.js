import {useState, useEffect} from 'react'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import { useHistory, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import logo from '../images/HotCube.svg'
import "../App.css"

function Navigation() {
   const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
   const dispatch = useDispatch()
   const history = useHistory()
   const location = useLocation()

   const signOut = () => {
      dispatch({ type: 'SIGNOUT' });   
      history.push('/');
      setUser(null);
      history.go(0)
   }

   useEffect(() => {
      // const token = user?.token;

      // // JSON Web Token
      // if (token) {
      //    const decodedToken = decode(token);

      //    if (decodedToken.exp * 1000 < new Date().getTime()) logout();
      // }

      setUser(JSON.parse(localStorage.getItem('profile')));
   }, [dispatch, location]);
   return (
      <div>
         <Navbar className='navigation' variant='dark' style={{ backgroundColor: "#202020" }}>
            <Container>
               <Navbar.Brand href="/" className="font-weight-bold"> <img style={{ backgroundColor: "white" }} src={logo} alt="HotCube" height="40"></img></Navbar.Brand>
               <Nav>
                  {user ? (
                     <>
                        <Nav.Link href="/order">{<i className="bi bi-layout-text-sidebar-reverse"></i>}</Nav.Link>
                        <DropdownButton title={user?.result.name} id="dropdown-menu-align-right" menuAlign="right" variant="light">
                           {user?.result.email === 'admin1@hotcube.my.id' || user?.result.email === 'admin2@hotcube.my.id' ? (
                              <Dropdown.Item href="/admin">Admin Access</Dropdown.Item>
                           ):(
                              null
                           )}
                           <Dropdown.Item onClick={signOut}>Sign Out</Dropdown.Item>
                        </DropdownButton>
                     </>
                  ):(
                     <Nav.Link href="/signIn">Sign In</Nav.Link>
                  )}

               </Nav>
            </Container>
         </Navbar>
      </div>
      
   )
}

export default Navigation;