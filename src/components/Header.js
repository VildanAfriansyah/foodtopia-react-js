import React from 'react'
import {
    Link
} from 'react-router-dom'
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    Row,
    InputGroup,
    Input,
    InputGroupAddon,
    Button,
    DropdownToggle,
    NavItem,
    DropdownItem,
    DropdownMenu,
    UncontrolledDropdown
} from 'reactstrap'
import Jwt from 'jwt-decode'
import Cookie from 'js-cookie'
import {ModalLogin, ModalLogout, ModalRegister} from '../components/Modal'
import { connect } from 'react-redux'

import { getItems } from '../redux/action/Item'

const token = Cookie.get('token')
let decode = ''
if (token) {
    decode = Jwt(token)
}

class Header extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            isOpen :false,
            ShowModal :false,
            id : decode.id,
            search : '',
            ShowModalLogin: false,
            ShowModalRegister: false,
            ShowModalLogout: false
        }
    }

    getData = async() =>{
        await this.props.dispatch(getItems(this.state.search))
    }

    

    toggle = () =>{
        this.setState({
            isOpen:!this.state.isOpen
        })
    }

    toggleModalLogin = () => {
        this.setState({
            ShowModalLogin:!this.state.ShowModalLogin
        })
    }

    toggleModalRegister = () => {
        this.setState({
            ShowModalRegister:!this.state.ShowModalRegister
        })
    }

    toggleModalLogout = () => {
        this.setState({
            ShowModalLogout:!this.state.ShowModalLogout
        })
    }

    handleChange = (event)=>{
        this.setState({search: event.target.value})
        // console.log(this.state.search)
    }

    handleSearch = async (search) =>{
        await this.setState({search})
        this.getData(this.state.search)
        console.log(this.state.search)
    }

    render(){
        const {isOpen, ShowModalLogin, ShowModalRegister, ShowModalLogout, search} = this.state
        // var name = this.props.name
        return(
            <Container-fluid>
            <header id="mu-header" style={{backgroundColor: '#F3F3F3'}}>
                <div className="row ml-4 mr-4">
                    <div className="col-lg-12 col-md-12">
                        <div className="mu-header-area">
                            <div className="row">
                                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                                    <div className="mu-header-top-left">
                                        <div className="mu-top-email">
                                            <i className="fa fa-envelope"></i>
                                            <span>FoodTopia@gmail.com</span>
                                        </div>
                                        <div className="mu-top-phone">
                                            <i className="fa fa-phone"></i>
                                            <span>(021) 8254241</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                                    <div className="mu-header-top-right">
                                        <nav>
                                            <ul className="mu-top-social-nav">
                                                <li><a><span className="fa fa-facebook"></span></a></li>
                                                <li><a><span className="fa fa-twitter"></span></a></li>
                                                <li><a><span className="fa fa-google-plus"></span></a></li>
                                                <li><a><span className="fa fa-youtube"></span></a></li>
                                            </ul>
                                        </nav>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <div style = {{backgroundColor : "#42B549"}}>
                <Navbar  light expand="md" className="shadow">
                    <NavbarBrand> 
                            <b><i style={{fontColor: ''}}>FoodTopia</i></b>
                    </NavbarBrand>
                    <NavbarToggler color = "success" onClick={this.toggle} />
                    <Collapse isOpen={isOpen} navbar>
                        <Nav className="mr-auto mb-3" navbar>

                        </Nav>
                        <div style = {{ width : '50%' }}>
                        <UncontrolledDropdown >
                            <DropdownToggle nav caret className = "text-left">
                                    Sort
                            </DropdownToggle>
                            <DropdownMenu left = "true">
                                <DropdownItem>
                                    <NavItem>
                                        <Link className = "nav-link" to ="/Restaurant">Restaurant</Link>
                                    </NavItem>
                                </DropdownItem>
                
                                <DropdownItem>
                                    <NavItem>
                                        <Link className = "nav-link" to ="/Category">Category</Link>
                                    </NavItem>
                                </DropdownItem>
                                
                                <DropdownItem>
                                    <NavItem>
                                        <Link className = "nav-link" to ="/Price">Price</Link>
                                    </NavItem>
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                        </div>
                        <div className="mr-3" style={{fontSize: '20px'}}>
                        <InputGroup>
                            <Input value = {search} onChange={(e) => this.handleSearch(e.target.value)}  placeholder = "Search ..." />
                                {/* <Home 
                                    data = {this.getData}
                                    name = "asd"
                                /> */}
                            <InputGroupAddon addonType="append" >
                                <Button color="secondary" disabled>Search</Button>
                            </InputGroupAddon>
                        </InputGroup>
                        </div>
                        <div className="mr-3" style={{fontSize: '20px'}}>
                            <Link to = {`/Cart/${this.state.id}`}> 
                                <span className="fa fa-shopping-cart"></span>
                            </Link>
                        </div>
                        <div className="mr-3" style={{fontSize: '20px'}}>
                            <Link to = {`/`}> 
                                <span className="fa fa-home"></span>
                            </Link>
                        </div>
                        <div className="mr-4 mb-1" style={{fontSize: '27px'}}>
                            |
                        </div>

                        {!token?
                            <Row className = "mr-2">  
                                <div>
                                    <ModalLogin 
                                        ShowModalLogin={ShowModalLogin}
                                        toggle={this.toggleModalLogin}
                                    />
                                </div>&nbsp;
                                <div>
                                    <ModalRegister 
                                        ShowModalRegister={ShowModalRegister}
                                        toggle={this.toggleModalRegister}
                                    />
                                </div>
                            </Row>
                        :
                            <Row>
                                <div>
                                    <Link to = '/'>
                                        <span style={{fontSize: '20px'}} className = "fa fa-user">
                                            &nbsp;Profile&nbsp;
                                        </span>
                                    </Link>
                                </div>&nbsp;
                                <div className = 'mr-3'>
                                        <ModalLogout
                                            ShowModalLogout={ShowModalLogout}
                                            toggle={this.toggleModalLogout}
                                        />
                                </div>
                            </Row>
                        }
                    </Collapse> 
                </Navbar>
            </div>
        </Container-fluid>
        )
    }
}

const mapStateToProps = state =>{
    return{
        item: state.item
    }
}

export default connect (mapStateToProps) (Header)