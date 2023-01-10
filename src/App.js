import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from './components/Home'
import About from './components/About'
import SignIn from './components/SignIn'
import Feedback from './components/Feedback'
import Terms from './components/Terms'
import Checkout from './components/Checkout'
import Navigation from './components/Navbar'
import Order from './components/Order/Order'
import Receipt from './components/Receipt/Receipt'
import Barcode from './components/Barcode/Barcode'
import Admin from './components/Admin/Admin'
import CustomerQueue from './components/Admin/CustomerQueue'
import ChefQueue from './components/Admin/ChefQueue'
import Mail from './components/Mail/Mail'
import MailTemplate from './components/Mail/MailTemplate'
import "./App.css"

 
function App() {

  return (
    <div>
      <Router>
      <Navigation/>
        <Switch>
          <Route path='/' exact><Home/></Route>
          <Route path='/about' component={About} ></Route>
          <Route path='/signin' component={SignIn} ></Route>
          <Route path='/checkout' component={Checkout} ></Route>
          <Route path='/feedback' component={Feedback} ></Route>
          <Route path='/termsandconditions' component={Terms} ></Route>
          <Route path='/order' component={Order} ></Route>
          <Route path='/receipt' component={Receipt} ></Route>
          <Route path='/barcode' component={Barcode} ></Route>
          <Route path='/admin' component={Admin} ></Route>
          <Route path='/customerqueue' component={CustomerQueue} ></Route>
          <Route path='/chefqueue' component={ChefQueue} ></Route>
          <Route path='/mail' component={Mail} ></Route>
          <Route path='/mailtemplate' component={MailTemplate} ></Route>
        </Switch>
      </Router>
    </div>
  )
}

export default App;