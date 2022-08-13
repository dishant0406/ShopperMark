import React from 'react'
import './App.css'
import Footer from './components/Footer/Footer'
import Header from './components/header/Header'
import Container from '@mui/material/Container';
import HomeScreen from './screens/HomeScreen/HomeScreen';

import {BrowserRouter, Route, Switch} from 'react-router-dom';
import ProductScreen from './screens/ProductScreen/ProductScreen';
import CartScreen from './screens/CartScreen/CartScreen';
import LoginScreen from './screens/UserAuth/LoginScreen';
import RegisterScreen from './screens/UserAuth/RegisterScreen';
import UserProfile from './screens/UserProfile/UserProfile';
import ShippingScreen from './screens/ShippingScreen/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen/OrderScreen';
import UserListScreen from './screens/UserListScreen/UserListScreen';
const App = () => {
  return (
    
    <BrowserRouter>
    <Header/>
    <main>
      <Container>
        <Switch>
        <Route path='/' exact>
          <HomeScreen/>
        </Route>
        <Route path='/login' >
          <LoginScreen/>
        </Route>
        <Route path='/shipping' >
          <ShippingScreen/>
        </Route>
        <Route path='/payment' >
          <PaymentScreen/>
        </Route>
        <Route path='/placeorder' >
          <PlaceOrderScreen/>
        </Route>
        <Route path='/register' >
          <RegisterScreen/>
        </Route>
        <Route path='/profile' >
          <UserProfile/>
        </Route>
        <Route path='/product/:id'>
          <ProductScreen/>
        </Route>
        <Route path='/cart/:id?'>
          <CartScreen/>
        </Route>
        <Route path='/order/:id'>
          <OrderScreen/>
        </Route>
        <Route path='/admin/userslist'>
          <UserListScreen/>
        </Route>
        </Switch>
      </Container>
    </main>
    <Footer/>
    </BrowserRouter>
  )
}

export default App