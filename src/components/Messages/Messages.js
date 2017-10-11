import React, {Component} from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import { getMessages } from '../../ducks/users.js';
import { connect } from 'react-redux';

class Messages extends Component {

componentDidMount() {
    this.props.getMessages(this.props.user.user_id);
    console.log(this.props.messages)
}

    render() {
        return (
            <div>
                <Grid>
                    <Row className='show-grid'>
                        <Col xs={12}>
                            {this.props.messages.length ? JSON.stringify(this.props.messages) : <div>Loading...</div>}
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
    messages: state.messages
   }
}

export default connect(mapStateToProps, {getMessages})(Messages);