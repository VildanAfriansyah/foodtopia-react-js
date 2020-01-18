import React from 'react';
import {Link} from 'react-router-dom'
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Input,
    InputGroup, 
    InputGroupAddon,
} from 'reactstrap';
import Axios from 'axios'
import Cookie from 'js-cookie'
import { connect } from 'react-redux'


import { APP_URL } from '../source/config'
import { postUser } from '../redux/action/User'

const token = Cookie.get('token')

const color = {
  color: '#000',
  borderColor: '#AAA'
}


// Login


class ModalLogin extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            token: ''
        }
    }

    login = async () => {
        const url = APP_URL.concat(`user/login`)
        await Axios.post(url, {
            username: this.state.username,
            password: this.state.password
        })
            .then((res) => {
                this.setState({
                    token: res.data.auth
                })
                if (this.state.token) {
                    Cookie.set("token",this.state.token)
                    window.location='/'
                }
                if (res.data.success === false) {
                    alert('Incorrect Username or Password')
                }
            })
            .catch((err) => {
                console.log(err)
                alert(err)
            })
    }
    

    render() {
      
        const {ShowModalLogin, toggle} = this.props
        let { username, password } = this.state
        
        const externalCloseBtn = <button className="close" style={{ position: 'absolute', top: '15px', right: '15px' }} onClick={toggle}>&times;</button>;
        return (
          <div>
          <Button color="info" style={{width: '100%'}} onClick={toggle}>Login</Button>
          <Modal isOpen={ShowModalLogin} toggle={toggle} external={externalCloseBtn}>
            <ModalHeader>Login</ModalHeader>
            <ModalBody>
            <div>
              <InputGroup>
                <Input type='text' value={username} onChange={(e) => this.setState({ username: e.target.value })} placeholder="Username" />
                <InputGroupAddon addonType="append">
                  <Button color="secondary" className="fa fa-user" disabled></Button>
                </InputGroupAddon>
              </InputGroup>
              <br />
              <InputGroup>
                <Input type='password' value={password} onChange={(e) => this.setState({ password: e.target.value })} placeholder="Password" />
                <InputGroupAddon addonType="append">
                  <Button color="secondary" className="fa fa-lock" disabled>&nbsp;</Button>
                </InputGroupAddon>
              </InputGroup>
            </div>
            </ModalBody>
            <ModalFooter>
            <Button color="#E0E0E0" style={color} className="lg" block>
                <span className="fa fa-facebook fa-lg" style={{color: '#3A589B'}}>&nbsp;</span><b>Facebook</b>
    
            </Button>{' '}
                <span style={{margin: 'auto'}}><b>OR</b></span>
                <Button outline color="#E0E0E0" style={color} className="lg" block>
                    <img src={require('../source/images/22WR2.png')} style={{width: '5%'}} alt=""></img>&nbsp;<b style={{color: '#000'}}>Google</b>
                </Button>{' '}
            </ModalFooter>
            <ModalFooter>
              <div className="margin"> 
              <Button color="primary"  onClick={() => { toggle(); this.login(); }}>Login</Button>
              </div>
              <Button color="danger" onClick={toggle}>Cancel</Button>
            </ModalFooter>
          </Modal>
        </div>
        )
    }
}

// Logout

class ModalLogout extends React.Component {
  constructor(props) {
      super(props)
      this.state = {
          username: '',
          password: '',
          token: ''
      }
  }

  logout = async () => {
    const url = APP_URL.concat(`user/logout`)
    await Axios.get(url, {
        headers: {
            Authorization: 'Bearer ' + token 
        }

    })
        .then((res) => {
            console.log(res)
            if (res.data.success === true) {
                Cookie.remove('token')
                window.location.reload()
            }
        })
        .catch((err) => {
            console.log(err)
            alert(err)
        })
}
  
  
  render() {
    const {ShowModalLogout, toggle} = this.props
    
    const externalCloseBtn = <button className="close" style={{ position: 'absolute', top: '15px', right: '15px' }} onClick={toggle}>&times;</button>;
    return (
      <div>
      <Link to = '#' className = "fa fa-sign-out ml-2 mr-3" color="info" style={{ fontSize : '20px' }} onClick={toggle}></Link>
      <Modal isOpen={ShowModalLogout} toggle={toggle} external={externalCloseBtn}>
        <ModalHeader><b>Logout</b></ModalHeader>
        <ModalFooter>
          <span style = {{ fontSize : '25px', textAlign : 'left', width : '100%' }}>Are you sure ?</span>
        </ModalFooter>
        <ModalFooter>
          <div className="margin"> 
          <Button color="primary"  onClick={() => { toggle(); this.logout(); }}>Logout</Button>
          </div>
          <Button color="danger" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
    )
  }
}

// Register


class ModalRegister extends React.Component {
  constructor(props) {
      super(props)
      this.state = {
          username: '',
          password: '',
          name: ''
      }
  }

  register = async () => {
    const nameuser = await this.state.name
    const username = await this.state.username
    const password = await this.state.password
    const roles = "client"
    alert('Account has been created')
    window.location='/'
    console.log(nameuser,username,password,roles)
    await this.props.dispatch(postUser({nameuser,username,password,roles}))
}
  
  
  render() {
    const {ShowModalRegister, toggle} = this.props
    
    const externalCloseBtn = <button className="close" style={{ position: 'absolute', top: '15px', right: '15px' }} onClick={toggle}>&times;</button>;
    return (
      <div>
          <Button color="info" style={{width: '100%'}} onClick={toggle}>Register</Button>
          <Modal isOpen={ShowModalRegister} toggle={toggle} external={externalCloseBtn}>
            <ModalHeader>Register</ModalHeader>
            <ModalBody>
            <div>
              <InputGroup>
                <Input type='text'  onChange={(e) => this.setState({ name: e.target.value })} placeholder="Name" />
                <InputGroupAddon addonType="append">
                  <Button color="secondary" className="fa fa-user" disabled></Button>
                </InputGroupAddon>
              </InputGroup>
              <br />
              <InputGroup>
                <Input type='text'  onChange={(e) => this.setState({ username: e.target.value })} placeholder="Username" />
                <InputGroupAddon addonType="append">
                  <Button color="secondary" className="fa fa-user" disabled></Button>
                </InputGroupAddon>
              </InputGroup>
              <br />
              <InputGroup>
                <Input type='password'  onChange={(e) => this.setState({ password: e.target.value })} placeholder="Password" />
                <InputGroupAddon addonType="append">
                  <Button color="secondary" className="fa fa-lock" disabled>&nbsp;</Button>
                </InputGroupAddon>
              </InputGroup>
            </div>
            </ModalBody>
            <ModalFooter>
            <Button color="#E0E0E0" style={color} className="lg" block>
                <span className="fa fa-facebook fa-lg" style={{color: '#3A589B'}}>&nbsp;</span><b>Facebook</b>
    
            </Button>{' '}
                <span style={{margin: 'auto'}}><b>OR</b></span>
                <Button outline color="#E0E0E0" style={color} className="lg" block>
                    <img src={require('../source/images/22WR2.png')} style={{width: '5%'}} alt=""></img>&nbsp;<b style={{color: '#000'}}>Google</b>
                </Button>{' '}
            </ModalFooter>
            <ModalFooter>
              <div className="margin"> 
              <Button color="primary"  onClick={() => { toggle(); this.register(); }}>Register</Button>
              </div>
              <Button color="danger" onClick={toggle}>Cancel</Button>
            </ModalFooter>
          </Modal>
        </div>
    )
  }
}
const mapStateToProps = state =>{
  return{
      user: state.user
  }
}

export default connect (mapStateToProps) (ModalRegister)
export {ModalLogin, ModalLogout, ModalRegister}