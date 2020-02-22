import React from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Container, Button, Card } from 'reactstrap'
import { connect } from 'react-redux'

import Carosel from '../components/Carosel'
import { APP_URL } from '../source/config'
import { getCategory } from '../redux/action/Category'

class Category extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }
    async componentDidMount() {
        this.props.dispatch(getCategory())
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

    render() {
        return (
            <div>
                <Carosel />
                <Container>
                    <Row>
                        {
                            this.props.restaurant.data.data.map(v => (
                                <Col md key={v.id_item} className='mt-5'>
                                    <Link className="nav-link" to={`/DetailCategory/${v.id_category}`}>
                                        <Card color='light'>
                                            <div className='text-center'> <img src={APP_URL.concat(`image/category/${v.images}`)} alt={v.images}
                                                style={{ width: "300px", height: "300px" }} /> </div>
                                            <div className='text-center'>{v.category}</div>
                                        </Card>
                                    </Link>
                                </Col>
                            ))
                        }
                    </Row>
                    <Row className='mt-5 mb-5'>
                        <Col md={6} className='text-center'>
                            <Button className='shadow' onClick={this.prevButton} color='primary'> Previous </Button>
                        </Col>
                        <Col md={6} className='text-center'>
                            <Button className='shadow' onClick={this.nextButton} color='primary'> Next </Button>
                        </Col>
                    </Row>
                </Container>

            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        restaurant: state.category
    }
}

export default connect(mapStateToProps)(Category)