import React, {Component} from 'react';
import axios from 'axios';
import { Grid, Row, Col, Image, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import './Settings.css';

class Settings extends Component {
    constructor(props) {
        super(props);

        this.state = {
            venmoName: '',
            country: ''
        }
    }
    
    
    handleVenmoChange(e) {
        this.setState({venmoName: e});
    }
        
    handleCountryChange(e) {
        this.setState({country: e});
    }

    handleFormSubmit() {
        const {country, venmoName} = this.state;
        const userId = this.props.user.user_id; 
        axios.put('http://localhost:3005/api/users', {userId, country, venmoName})
        this.setState({venmoName: '', country: ''})
    }
    
    render() {
        return (
            <div>
                <Grid>
                    <Row className='show-grid'>
                        <Col xs={0} md={3}></Col>
                        <Col xs={12} md={6}>
                            <h3 className='edit-info'>EDIT YOUR INFO</h3>
                            <Image src='' rounded />
                            <form>
                                <h2>VENMO USERNAME</h2>
                                <input value={this.state.venmoName} className='settings-input' onChange={(e) => this.handleVenmoChange(e.target.value)} className='settings-input'/>
                                <h2>COUNTRY</h2>
                                <input value={this.state.country} className='settings-input' onChange={(e) => this.handleCountryChange(e.target.value)} className='settings-input'/>
                                <div><Button onClick={() => this.handleFormSubmit()}className='save-button'>SAVE</Button></div>
                            </form>
                            <a href='http://localhost:3005/auth/logout'><Button bsStyle='danger' className='logout-button'>LOGOUT</Button></a>
                        </Col>
                        <Col xs={0} md={3}></Col>
                    </Row>
                </Grid>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(Settings);