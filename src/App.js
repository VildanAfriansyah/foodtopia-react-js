import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Detail from './pages/Detail'
import DetailRestaurant from './pages/DetailRestaurant'
import DetailCategory from './pages/DetailCategory'
import Cart from './pages/Cart'
import Restaurant from './pages/Restaurant'
import Category from './pages/Category'
import Price from './pages/Price'
// import Register from './pages/Register'
// import logo from './logo.svg';
// import './App.css';

class App extends React.Component{
  constructor(props){
    super(props)
    this.state ={
      navCollapsible : false
    }
  }
  render(){
    return(
      <Router>
        <div className="fixed-top">
          <Header/>
        </div><br /><br /><br /><br />
       <Switch>
        <Route path='/' exact>
          <Home />
        </Route>
        <Route path='/Restaurant' exact>
          <Restaurant />
        </Route>
        <Route path='/Category' exact>
          <Category />
        </Route>
        <Route path='/Price' exact>
          <Price />
        </Route>
        <Route path='/Detail/:id' exact component={Detail} />
        <Route path='/DetailRestaurant/:id' exact component={DetailRestaurant} />
        <Route path='/DetailCategory/:id' exact component={DetailCategory} />
        <Route path='/Cart/:id' exact component={Cart} />
       </Switch>
        <div>
          <Footer />
        </div>
      </Router>
    )
  }
}

export default App;

