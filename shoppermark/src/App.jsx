import React from 'react'
import './App.css'
import Footer from './components/Footer/Footer'
import Header from './components/header/Header'
import Container from '@mui/material/Container';
import HomeScreen from './screens/HomeScreen/HomeScreen';

import {BrowserRouter, Route, Switch} from 'react-router-dom';
import ProductScreen from './screens/ProductScreen/ProductScreen';
import CartScreen from './screens/CartScreen/CartScreen';
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
        <Route path='/product/:id'>
          <ProductScreen/>
        </Route>
        <Route path='/cart/:id?'>
          <CartScreen/>
        </Route>
        </Switch>
      </Container>
    </main>
    <Footer/>
    </BrowserRouter>
  )
}

export default App