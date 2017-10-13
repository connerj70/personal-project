import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import { Card, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import './BigListing.css';
import Modal, {closeStyle} from 'simple-react-modal';
import axios from 'axios';

class BigListing extends Component {
    constructor(props) {
        super(props)

        this.state = {
            show: false,
            messageText: '',
            senderId: null
        }
    }

    show() {
        this.setState({show: true});
    }
    
    close() {
        this.setState({show: false});
    }
    
    handleReplyClick(senderId) {
        this.show();
        this.setState({senderId: senderId})
        console.log(senderId);
        console.log(this.state)
    }
    
    handleMessageChange(message) {
        this.setState({
            messageText: message
        })
    }
    
    newMessage() {
        console.log('newMessage');
        const userId = this.props.user.user_id;
        const { senderId, messageText } = this.state;
        axios.post('http://localhost:3005/api/messages', {senderId: senderId, messageText: messageText, userId: userId})
        this.close();
        this.setState({messageText: '', senderId: null})
    }

    render() {
        //console.log(this.props.match.params.id);
        const specificListing = this.props.listings[0] ? this.props.listings[0].filter( listing => listing.listing_id == this.props.match.params.id) : null;
        console.log(specificListing);
        
        const specificListingUser = this.props.users[0] ? this.props.users[0].filter(user => user.user_id == specificListing[0].user_id): null;
        console.log(specificListingUser)

        // const extra = this.props.listings[0] ? (
        //     <div>
        //         <div>
        //            Size: {specificListing[0].size}
        //         </div>
        //         <div>
        //             Category: {specificListing[0].category}
        //         </div>
        //         <div>
        //             Condition: {specificListing[0].condition}
        //         </div>
        //     </div>
        // ) : null;

        return (
            <div>
                <Grid>
                    <Modal
                        className="test-class" //this will completely overwrite the default css completely 
                        containerClassName="test"
                        closeOnOuterClick={true}
                        show={this.state.show}
                        onClose={this.close.bind(this)}>
                    
                        <a className='xer' onClick={this.close.bind(this)}>X</a>
                        <div>
                            <h3>Send {this.props.listings[0] ? specificListingUser[0].username : null} a message</h3>
                            <textarea value={this.state.messageText} onChange={(e) => this.handleMessageChange(e.target.value)} placeholder='message text...' className='message-input' />
                            <Button color='black' size='big' onClick={() => this.newMessage()}className='submit-button'>Send</Button>
                        </div>
                    </Modal>
                    <Row className='show-grid'>
                        <Col xs={12} md={9}>
                            <Card
                            className='large-card' 
                            image= {this.props.listings[0] ? specificListing[0].image_url : null}
                            />
                        </Col>
                        <Col xs={12} md={3}>
                            <div className='side-bar'>
                                <h2 className='heading'>{this.props.listings[0] ? specificListing[0].listing_name : null}</h2>
                                <div className='price'>
                                    <b>${this.props.listings[0] ? specificListing[0].price : null}</b>
                                </div>
                                <div className='button-div'>
                                    <Button onClick={() => this.handleReplyClick(specificListingUser[0].user_id)} color='black'>PURCHASE</Button>
                                </div>
                                <div className='button-div'>
                                    <Button onClick={() => this.handleReplyClick(specificListingUser[0].user_id)} inverted color='green' >ASK A QUESTION</Button>
                                </div>
                                <div className='description'>
                                    <div>DESCRIPTION</div>
                                    <br />
                                    {this.props.listings[0] ? specificListing[0].description : null}
                                </div>
                               
                                <div className='seller'>
                                    <div>SELLER</div>
                                    <br />
                                    {this.props.listings[0] ? specificListingUser[0].username : null}
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Grid>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        listings: state.listings,
        users: state.users,
        user: state.user
    }
}

export default connect(mapStateToProps)(BigListing);