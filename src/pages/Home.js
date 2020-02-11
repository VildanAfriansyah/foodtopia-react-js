import React from 'react'
import { Link } from 'react-router-dom'
import {Row, Col, Container, Button, Card} from 'reactstrap'
import NumberFormat from 'react-number-format';
import { connect } from 'react-redux'
import StarRatings from 'react-star-ratings'


import Carosel from '../components/Carosel'
import { APP_URL } from '../source/config'
import { getItems, getNextItems } from '../redux/action/Item'


class Home extends React.Component{
    constructor(props){
        super(props)
        this.state = {
        }
    }
    async componentDidMount(){
        await this.props.dispatch(getItems())
    }

    prevButton = async()=>{
        const url = this.props.item.data.prev
        if(url){
            this.props.dispatch(getNextItems(url))
        }
    }

    nextButton = async()=>{
        const url = this.props.item.data.next
        if(url){
            this.props.dispatch(getNextItems(url))
        }
    }

    render(){
        return(
            <div>
                <Carosel />
            <Container>
                <Row>
                    {
                        // isFetched&&
                        // data.data.map(v=>
                        !this.props.item.isLoading &&
                        // this.props.item.data.data.length > 0 &&
                        this.props.item.data.data &&
                        this.props.item.data.data.map(v=>(
                            <Col md key = {v.id_item} className = 'mt-5'>
                                <Link className = "nav-link" to = {`/Detail/${v.id_item}`}>
                                    <Card color = 'light'>
                                        <div className = 'text-center'><b>{v.item_name}</b></div><br/>
                                        <div className = 'text-center'> <img src={APP_URL.concat(`image/item/${v.images}`)} alt = {v.images}
                                        style = {{width : "300px", height : "250px"}}/> </div>                        
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
            <Row className = 'mt-5 mb-5'>
                <Col md={6} className = 'text-center'>
                    <Button className = 'shadow' onClick = {this.prevButton} color = 'primary'> Previous </Button>
                </Col>
                <Col md={6} className = 'text-center'>
                    <Button className = 'shadow' onClick = {this.nextButton} color = 'primary'> Next </Button>
                </Col>
            </Row>
            </Container>
        
            </div>
        )
    }
}

const mapStateToProps = state =>{
    return{
        item: state.item
    }
}

export default connect (mapStateToProps) (Home)