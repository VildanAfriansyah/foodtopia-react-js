import React from 'react'
import {Link} from 'react-router-dom'
import { Container, 
  Card, 
  CardBody, 
  CardTitle, 
  CardText, 
  Button, 
  CardHeader, 
  CardFooter,
  Input, 
  Nav,
  Col,
  Row } 
from 'reactstrap'
import NumberFormat from 'react-number-format'
import Axios from 'axios'
import Cookie from 'js-cookie'
import Jwt from 'jwt-decode'
import { connect } from 'react-redux'
import StarRatings from 'react-star-ratings'


import { APP_URL } from '../source/config'
import { getItemById } from '../redux/action/Item'
import { getCommentById, postComment } from '../redux/action/Comment'
import '../source/detail.css'

const token = Cookie.get('token')

let decode = ''
if (token) {
    decode = Jwt(token)
}
class DetailItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data : [],
      sugest : [],
      comment : [],
      isFetched: false,
      total : 1,
      id_item : 0,
      rating : 0,
      review : null
    }
  }

  async componentDidMount(){
    this.dataItem()
    this.dataComment()
    console.log(this.state.comment)
  }

  dataItem = async () =>{
    const {id} = this.props.match.params
        await this.props.dispatch(getItemById(id))
        .then((rest)=>(
            this.setState({
              data : rest.value.data.data, 
              sugest : rest.value.data.sugest,
              id_item : id})
        ))
    
        this.dataComment()
  }

  dataComment = async () =>{
    const {id} = this.props.match.params
        this.props.dispatch(getCommentById(id))
        .then((rest)=>(
            this.setState({
              comment : rest.value.data.data})
        ))
  }

  addCard = async () =>{
    const id_user = decode.id
    const {id} = this.props.match.params
    const url = APP_URL.concat(`cart/`)
    await Axios.post(url, {
        total : this.state.total,
        id_user : id_user,
        id_item : id
    })
  }

  buttonPlus = ()=>{
    this.setState({total: this.state.total + 1})
  }

  buttonMin = ()=>{
    this.setState({total: this.state.total - 1})
  }

  addComment = ()=>{
    const id_item = this.props.match.params.id
    const comment = this.state.review
    const rating = this.state.rating
    const id_user = decode.id
    this.props.dispatch(postComment({id_item,comment,rating,id_user}))
    this.dataComment()
  }

  render() {
    const { review } = this.state
    const id_user = decode.id
    const id = this.props.match.params.id
    if(this.state.id_item !== id){
      this.dataItem()
      console.log(this.state.comment)
    }
    return (
      <Container className="p-0">
      <br />
      {
          this.state.data.map(v=>(
         <div className="row">
            <div className="col-md-12">
              <Card className="mb-3" body>
                <div className="row">
                  <div className="col-md-2">
                    <img style={{width: '200px', height:'250px'}} src={APP_URL.concat(`image/item/${v.images}`)} alt="imgDetailItem" />
                  </div>
                  <div className="col-md-5 ml-5">
                    <CardTitle style={{fontSize: '30px'}}><b>{v.item_name}</b></CardTitle>
                    <CardText style={{fontSize: '20px'}}>{v.restaurant}</CardText>
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
                    <CardText>
                      <NumberFormat value={v.price} displayType={'text'} thousandSeparator={true} prefix={'Rp. '} renderText={value => <div>{value}</div>} />
                    </CardText>
                    <CardText>{v.description}</CardText>
                  </div>
                  <div className="cold-md-5 ml-5">
                    <div className="text-center mb-4 mt-4">
                          <span className="text-center"><b>Total</b></span>
                    </div>
                   <Nav style={{width: '100%'}}>
                      <div className="cold-md-5">
                        <Button style={{backgroundColor: '#42B549'}} 
                        onClick={this.buttonMin}
                        disabled={this.state.total<=1?true:false}><b>-</b></Button>
                      </div>
                      <div className="cold-md-2">
                        <Input style={{width: '80px',textAlign: 'center'}} value={this.state.total}></Input>
                      </div>
                      <div className="cold-md-5">
                        <Button style={{backgroundColor: '#42B549'}} onClick={this.buttonPlus}><b>+</b></Button>
                      </div>
                   </Nav>
                   <div className='mt-3 ml-3' >
                      <Link to = {`../cart/${id_user}`} >
                        <Button style={{backgroundColor: '#ed5821'}} onClick={this.addCard}>
                          <span className="fa fa-shopping-cart"></span>&nbsp;<b>Add Card</b>
                        </Button>
                      </Link>
                   </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
          ))}


{/* comment */}


      <div  className="mb-3">
        <Card className=" mb-3 shadow">
          <CardHeader style={{fontSize: '30px'}}><b>Comment</b></CardHeader>
        </Card>
      </div>
          <div className="row">
            <div className="col-md-12">
            {
              this.state.comment.map(v=>
              <Card className=" mb-3">
                <CardHeader md key={v.id_item}><h3>{v.name_user}</h3></CardHeader>
                <CardBody>
                  <CardTitle>
                    <StarRatings
                      rating={v.rating}
                      starRatedColor="#FFC400"
                      changeRating={this.changeRating}
                      numberOfStars={5}
                      name='rating' 
                      starDimension="20px"
                      starSpacing="5px"
                    />
                  </CardTitle>
                  <CardText>{v.comment}</CardText>
                  <Button style={{backgroundColor: '#42B549'}}>Reply</Button>
                </CardBody>
                <CardFooter>Last Update : {(v.updated_on).substr(0,10)} </CardFooter>
              </Card>
              
      )}
      {token? 
            <Card className=" mb-3 shadowv">
            <CardBody>
              <Input type = "textarea" placeholder = " Add Comment " 
              value = { review } onChange = {(e) => this.setState ({review : e.target.value})} />
                    <StarRatings
                      rating={this.state.rating}
                      starRatedColor="#FFC400"
                      // changeRating={this.changeRating}
                      changeRating={(newRating)=>this.setState({rating: newRating})}
                      numberOfStars={5}
                      name='rating' 
                      starDimension="20px"
                      starSpacing="5px"
                    />
            </CardBody>
            <CardHeader>
              <Button onClick = {this.addComment}>Add Comment</Button>
            </CardHeader>
          </Card>
    :
        <></> 
      
    }
              
            </div>
          </div>
{/* Show Case */}


      <Card className=" mb-1 shadow">
          <CardHeader style={{fontSize: '30px'}}><b>Recommendation</b></CardHeader>
      </Card>
      
      <Row>
        {
          this.state.sugest.map(v=>(  
                <Col md key = {v.id_item} className = 'mt-1'>
                 <Link className = "nav-link" to = {`/Detail/${v.id_item}`}>
                    <Card color = 'light'>
                      <div className = 'text-center'><b>{v.item_name}</b></div><br/>
                      <div className = 'text-center'> 
                        <img src={APP_URL.concat(`image/item/${v.images}`)} alt = {v.images}
                        style = {{width : "300px", height : "250px"}}/> 
                      </div>                        
                      <div className = 'text-center'>
                        <NumberFormat value={v.price} displayType={'text'} thousandSeparator={true} prefix={'Rp. '} renderText={value => <div>{value}</div>} />
                      </div>
                      <div className = 'text-center'>{v.restaurant}</div>
                      <div className = 'text-center'> {v.description}</div>
                      <div className = 'text-center'>{v.name_resto}</div>
                      <div className = 'text-center'>{v.descriptions}</div><br/>
                      <div className = 'text-center'>
                        <StarRatings
                          rating={v.rate}
                          starRatedColor="#FFC400"
                          changeRating={this.changeRating}
                          numberOfStars={5}
                          name='rating' 
                          starDimension="20px"
                          starSpacing="5px"
                        />
                      </div>
                    </Card>
                  </Link>
                </Col>
            ))     
          }
          
          </Row> 
      </Container>
    )
  }
}

const mapStateToProps = state =>{
  return{
      item: state.item,
      comment : state.comment
  }
}

export default connect (mapStateToProps) (DetailItem)