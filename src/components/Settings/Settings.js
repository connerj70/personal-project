import React, {Component} from 'react';
import { Grid, Row, Col, Image, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import './Settings.css';

class Settings extends Component {
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
                                <input className='settings-input'/>
                                <h2>COUNTRY</h2>
                                <input className='settings-input'/>
                                <div><Button className='save-button'>SAVE</Button></div>
                            </form>
                            <Button bsStyle='danger' className='logout-button'>LOGOUT</Button>
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