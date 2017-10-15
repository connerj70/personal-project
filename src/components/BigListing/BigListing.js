import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import { Card, Button, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { newGrail, getGrails } from '../../ducks/users';
import './BigListing.css';
import Modal, {closeStyle} from 'simple-react-modal';
import axios from 'axios';

class BigListing extends Component {
    constructor(props) {
        super(props)

        this.state = {
            show: false,
            messageText: '',
            senderId: null,
            isOpen: false
        }
    }

    componentDidMount() {
        this.props.getGrails(this.props.user.user_id)
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
    }
    
    handleMessageChange(message) {
        this.setState({
            messageText: message
        })
    }

    
    newMessage() {
        if(!this.state.messageText) {
           alert('Message Body Cannot Be Empty');
        } else {
        const userId = this.props.user.user_id;
        const { senderId, messageText } = this.state;
        axios.post('http://localhost:3005/api/messages', {senderId: senderId, messageText: messageText, userId: userId})
        this.close();
        this.setState({messageText: '', senderId: null})
        }
    }

    addGrail(newGrail, newGrailId, userId) {
        this.props.newGrail(newGrail, newGrailId, userId)
    }

    render() {
        const specificListing = this.props.listings[0] ? this.props.listings[0].filter( listing => listing.listing_id == this.props.match.params.id) : null;
        const specificListingUser = this.props.users[0] ? this.props.users[0].filter(user => user.user_id == specificListing[0].user_id): null;
        const isGrail = this.props.userGrails.length ? this.props.userGrails[0].filter(grail => grail.listing_id == this.props.match.params.id) : null;       
         console.log(isGrail)
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
                    <div className={this.state.show ? 'message-container-blur' : 'message-container'}>
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
                                    <div className='icon-div'>
                                        <button onClick={() => this.addGrail(specificListing[0], specificListing[0].listing_id, this.props.user.user_id)}className='icon-button'><Icon name={isGrail ? isGrail.length ? 'bookmark' : 'remove bookmark' : null} /></button>
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
                    </div>
                </Grid>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        listings: state.listings,
        users: state.users,
        user: state.user,
        userGrails: state.userGrails
    }
}

export default connect(mapStateToProps, {newGrail, getGrails})(BigListing);