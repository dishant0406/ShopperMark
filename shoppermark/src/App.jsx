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
import UserEditScreen from './screens/UserEditScreen/UserEditScreen';
import OrdersListScreen from './screens/OrdersListScreen/OrdersListScreen';
import ProductListScreen from './screens/ProductListScreen/ProductListScreen';
import ProductEditScreen from './screens/ProductEditScreen/ProductEditScreen';
const App = () => {
  return (
    
    <BrowserRouter >
    <Header/>
    <main>
      <Container>
        <Switch>
        <Route path='/' exact>
          <HomeScreen/>
        </Route>
        <Route exact path='/search/:keyword'>
          <HomeScreen/>
        </Route>
        <Route exact path='/page/:pageNumber'>
          <HomeScreen/>
        </Route>
        <Route exact path='/search/:keyword/page/:pageNumber'>
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
        <Route path='/admin/user/:id/edit'>
          <UserEditScreen/>
        </Route>
        <Route path='/admin/product/:id/edit'>
          <ProductEditScreen/>
        </Route>
        <Route path='/admin/orderlist'>
          <OrdersListScreen/>
        </Route>
        <Route path='/admin/productlist' exact>
          <ProductListScreen/>
        </Route>
        <Route path='/admin/productlist/page/:pageNumber' exact>
          <ProductListScreen/>
        </Route>
        </Switch>
      </Container>
    </main>
    <Footer/>
    </BrowserRouter>
  )
}

export default App