import React from 'react'
import axios from 'axios'
import {Row, Col, Container, Button} from 'reactstrap'

class Home extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            data : {},
            isFetched : false
        }
    }
    async componentDidMount(){
        this.setState({isFetched:!this.state.isFetched})
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
            <Container>
                <Row>
                {
                    isFetched&&
                    data.results.map(v=>(
                    <Col md key = {v.id} className = 'mt-5'>
                        <div> <img src={v.image} alt = {v.name}/> </div>
                        <div className = 'text-center'>{v.name}</div>
                    </Col>)
                    )
            }
            </Row>
            <Row className = 'mt-5 mb-5'>
                <Col md={6} className = 'text-center'>
                    <Button onClick = {this.prevButton} color = 'primary'> Previous </Button>
                </Col>
                <Col md={6} className = 'text-center'>
                    <Button onClick = {this.nextButton} color = 'primary'> Next </Button>
                </Col>
            </Row>
            </Container>
        )
    }
}

export default Home