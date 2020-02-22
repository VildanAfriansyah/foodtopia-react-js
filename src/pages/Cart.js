import React from 'react'
import Axios from 'axios'
import NumberFormat from 'react-number-format'
import Jwt from 'jwt-decode'
import Cookie from 'js-cookie'
import { Link, Route } from 'react-router-dom'
import { Button, Container, Row, Card, CardTitle, CardText, Input, Nav, Col } from 'reactstrap'
import StarRatings from 'react-star-ratings'


import { APP_URL } from '../source/config';

const token = Cookie.get('token')
let decode = ''
if (token) {
    decode = Jwt(token)
}

class Cart extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            data : null,
            isFetched: false,
            subtotal: 0,
            total: 0 
        }
    }

    async componentDidMount(){
        const {id} = this.props.match.params
        if(id == decode.id){
          const url = APP_URL.concat(`cart/${id}`)
          const item = await Axios.get(url, {
            headers: {
                Authorization: 'Bearer ' + token 
            }
          })
          const {data} = item
          this.setState({data, isFetched:!this.state.isFetched})
          
          this.setState({subtotal: data.subtotal})
        console.log(data.data.total)
          // this.setState({total: data.data.map( v=>(v.total))})
          // this.setState({subtotal: data.subtotal})
          
        }
      }

    deleteCart = async (id) =>{
        const id_user = decode.id
        const url = APP_URL.concat(`cart/delete`)
        
        console.log(id_user,id)
        await Axios.delete(url,{ data: { id_user: id_user, id_item: id }})
        this.setState({isFetched: false})
        this.componentDidMount();
      }
    
    buttonPlus = async(i)=>{
        const data = this.state.data.data
        console.log({data})
        const item = data.filter(v=>{
          if(v.id_item === i){
            v.total += 1
          }
          return v
        })
      this.setState({item})
      var subtotal = 0
      data.filter(v=>{
          var total1 = v.price * v.total
          subtotal += total1;
      })
      this.setState({subtotal: subtotal})

    }

    buttonMin = (i)=>{
      const data = this.state.data.data
        console.log({data})
        const item = data.filter(v=>{
          if(v.id_item === i){
            v.total -= 1
          }
          return v
        })
      this.setState({item})
      var subtotal = 0
      data.filter(v=>{
          var total1 = v.price * v.total
          subtotal += total1;
      })
      this.setState({subtotal: subtotal})
    }

    checkout = async ()=>{
        const id_user = decode.id
        const url = APP_URL.concat(`cart/checkout`)
        
        console.log(id_user)
        await Axios.delete(url,{ data: { id_user: id_user}})
        alert('Payment Success')
        this.setState({isFetched: false})
        this.componentDidMount();
    }

    render(){
        const {isFetched, data} = this.state
        return(
            <Container>
                <Row>
                  <Col className = "col md-7 mt-4">
                    
                
                {isFetched&&
                    data.data.map((v,i)=>(
                  <div key={v.id_item}>
                    <Card className="mb-3" body>
                      <div className="row">
                        <div className="col-md-2">
                          <img style={{width: '100px', height:'100px'}} src={APP_URL.concat(`image/item/${v.images}`)} alt="imgDetailItem" />
                        </div>
                        <div className="col-md-5 ml-5">
                          <CardTitle style={{fontSize: '20px'}}><b>{v.item_name}</b></CardTitle>
                          <CardText style={{fontSize: '15px'}}>{v.restaurant}</CardText>
                          <CardText>
                            <NumberFormat value={v.price} displayType={'text'} thousandSeparator={true} prefix={'Rp. '} renderText={value => <div>{value}</div>} />
                          </CardText><CardText>
                            <NumberFormat value={v.price * v.total} displayType={'text'} thousandSeparator={true} prefix={'Rp. '} renderText={value => <div>Total : {value}</div>} />
                          </CardText>
                          
                          <CardText>
                            <StarRatings
                                rating={v.rate}
                                starRatedColor="#FFC400"
                                changeRating={this.changeRating}
                                numberOfStars={5}
                                name='rating' 
                                starDimension="20px"
                                starSpacing="5px"
                            />
                          </CardText>
                        </div>
                        <div className="cold-md-5 ml-5">
                          <div className="text-center mb-4 mt-4">
                                <span className="text-center"><b>Total</b></span>
                          </div>
                        <Nav style={{width: '100%'}}>
                            <div className="cold-md-5">
                              <Button 
                                style={{backgroundColor: '#42B549'}} onClick={()=>this.buttonMin(v.id_item)}
                                disabled={v.total<=1?true:false}><b>-</b>
                              </Button>
                            </div>
                            <div key={v.id_item.toString} className="cold-md-2">
                              <Input style={{width: '80px',textAlign: 'center'}} value={v.total}></Input>
                            </div>
                            <div className="cold-md-5">
                              <Button style={{backgroundColor: '#42B549'}} onClick={()=>this.buttonPlus(v.id_item)}><b>+</b></Button>
                            </div>
                        </Nav>
                        <div className = "text-center" style = {{ width : '100%', fontSize : '25px'}}>
                          <Link to = '#' onClick = {()=>this.deleteCart(v.id_item)} className = "fa fa-trash" style = {{ color : '#EA212D' }}></Link>
                        </div>
                        </div>
                      </div>
                    </Card>
                  </div>
                    
                  ))}

                  
                  </Col> 
                  
                  <Col md = {4} className="mt-4">
                  <div>
                        <Card body>
                            <CardTitle className = "text-center" style={{fontSize: '35px'}}><b>Total Payment</b></CardTitle>
                            <hr />
                            <CardText>
                              Total Price : <NumberFormat value={this.state.subtotal} displayType={'text'} thousandSeparator={true} prefix={'Rp. '} renderText={value => <div>{value}</div>} />
                            </CardText>
                            <Button color = "primary" onClick = {()=>this.checkout()}>Checkout</Button>
                        </Card>
                    </div> 
                  </Col> 
                </Row> 
              
            </Container>
        )
    }
}


export default Cart