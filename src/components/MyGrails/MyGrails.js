import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getGrails } from '../../ducks/users';
import { Grid, Row, Col } from 'react-bootstrap';

class MyGrails extends Component {
    constructor(props) {
        super(props);

    }

    componentDidMount() {
        this.props.getGrails(this.props.user.user_id)
    }

    render() {
        
        // const listingsToRender = this.props.userGrails[0].map( grail => {
        //     return <div>{grail.}</div>
        // })

        return (
            <div>
                 MyGrails page
                {JSON.stringify(this.props.userGrails[0])}
                <Grid>
                    <Row className='show-grid'>
                        <Col xs={12}>
                            
                        </Col>
                    </Row>
                </Grid>
            </div>
        )
    }
}

function mapStateToProps(state) {
   return {
    user: state.user,
    userGrails: state.userGrails
   } 
}

export default connect(mapStateToProps, {getGrails})(MyGrails);