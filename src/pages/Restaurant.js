import React from 'react'
import {Link} from 'react-router-dom'
import {Row, Col, Container, Button, Card} from 'reactstrap'
import { connect } from 'react-redux'

import Carosel from '../components/Carosel'
import { APP_URL } from '../source/config'
import { getRestaurant } from '../redux/action/Restaurant'

class Restaurant extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            data : {},
            isFetched : false
        }
    }
    async componentDidMount(){
        this.props.dispatch(getRestaurant())
    }

    // prevButton = async()=>{
    //     const url = this.state.data.info.prev
    //     if(url){
    //         const {data} = await axios.get(url)
    //         this.setState({data})
    //     }
    // }

    // nextButton = async()=>{
    //     const url = this.state.data.info.next
    //     if(url){
    //         const {data} = await axios.get(url)
    //         this.setState({data})
    //     }
    // }

    render(){
        return(
            
            <div>
                <Carosel />
            <Container>
                <Row>
                    {
                        // isFetched&&
                        // data.data.map
                        this.props.restaurant.data.data.map(v=>(
                            <Col md key = {v.id_item} className = 'mt-5'>
                                <Link className = "nav-link" to = {`/DetailRestaurant/${v.id_restaurant}`}>
                                    <Card color = 'light'>
                                        <div className = 'text-center'><b>{v.item_name}</b></div><br/>
                                        <div className = 'text-center'> <img src={APP_URL.concat(`image/restaurant/${v.images}`)} alt = {v.image}
                                        style = {{width : "300px", height : "300px"}}/> </div>  
                                        <div className = 'text-center'>{v.restaurant}</div>
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
        restaurant: state.restaurant
    }
}

export default connect (mapStateToProps) (Restaurant)