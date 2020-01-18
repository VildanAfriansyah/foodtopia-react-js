import React from 'react'
import {Link} from 'react-router-dom'
import {
  Collapse,
  Navbar as NB,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem
} from 'reactstrap';

class NavBar extends React.Component{
    constructor(props){
      super(props)
      this.state ={
        navCollapsible : false
      }
    }

    toggler = ()=>{
        this.setState({navCollapsible:!this.state.navCollapsible})
    }
    render(){
        const {navCollapsible} = this.state
      return(
        <NB color = 'dark' dark>
        <NavbarBrand>React Live Coding</NavbarBrand>
        <NavbarToggler onClick = {this.toggler}/>
        <Collapse isOpen = {navCollapsible} navbar>
        <Nav navbar>
          <NavItem>
            <Link to = '/' NavLink> Home </Link>
          </NavItem>
          <NavItem>
            <Link to = '/About' NavLink> About </Link>
          </NavItem>
          <NavItem>
            <Link to = '/Contact' NavLink> Contact Us </Link>
          </NavItem>
        </Nav>
        </Collapse>
      </NB>
      )
    }
}

export default NavBar