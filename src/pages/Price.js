import React from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import {Row, Col, Container, Button, Card} from 'reactstrap'
import NumberFormat from 'react-number-format';
import { connect } from 'react-redux'


import Carosel from '../components/Carosel'
import { APP_URL } from '../source/config'
import { getItemsByPrice } from '../redux/action/Item'

class Price extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            data : []
        }
    }
    async componentDidMount(){
        this.props.dispatch(getItemsByPrice())
        .then((rest)=>(
            this.setState({data : rest.value.data.data})
        ))
    }

    prevButton = async()=>{
        const url = this.state.data.info.prev
        if(url){
            const {data} = await axios.get(url)
            this.setState({data})
        }
    }

    nextButton = async()=>{
        const url = this.state.data.info.next
        if(url){
            const {data} = await axios.get(url)
            this.setState({data})
        }
    }

    render(){
        const {isFetched, data} = this.state
        return(
            
            <div>
                <Carosel />
            <Container>
                <Row>
                    {
                        this.state.data.map(v=>(
                            <Col md key = {v.id_item} className = 'mt-5'>
                                <Link className = "nav-link" to = {`/Detail/${v.id_item}`}>
                                    <Card color = 'light'>
                                        <div className = 'text-center'><b>{v.item_name}</b></div><br/>
                                        <div className = 'text-center'> <img src={APP_URL.concat(`image/item/${v.images}`)} alt = {v.images}
                                        style = {{width : "300px", height : "300px"}}/> </div>                        
                                        <div className = 'text-center'>
                                            <NumberFormat value={v.price} displayType={'text'} thousandSeparator={true} prefix={'Rp. '} renderText={value => <div>{value}</div>} />
                                        </div>
                                        <div className = 'text-center'>{v.restaurant}</div>
                                        <div className = 'text-center'> {v.description}</div>
                                        <div className = 'text-center'>{v.name_resto}</div>
                                        <div className = 'text-center'>{v.descriptions}</div><br/>
                                        <div className = 'text-center'>{v.rate}&nbsp;<span className="fa  fa-star" style={{color: '#FFC400'}}></span></div><br/>
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
        Item: state.item
    }
}

export default connect (mapStateToProps) (Price)