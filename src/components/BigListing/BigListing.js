import React, { Component } from 'react';
import { Grid, Row, Col, Thumbnail } from 'react-bootstrap';
import { Card, Button, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { newGrail, getGrails, getListings, getListingImages } from '../../ducks/users';
import './BigListing.css';
import Modal, {closeStyle} from 'simple-react-modal';
import ReactImageZoom from 'react-image-zoom';
import axios from 'axios';
import swal from 'sweetalert';

class BigListing extends Component {
    constructor(props) {
        super(props)

        this.state = {
            show: false,
            messageText: '',
            senderId: null,
            isOpen: false,
            imageToShow: "",
            listingId: null
        }
    }

    componentDidMount() {
        this.props.getGrails(this.props.user.user_id);
        // this.props.getListings();
        this.props.getListingImages(this.props.match.params.id);
    }

    show() {
        this.setState({show: true});
    }
    
    close() {
        this.setState({show: false});
    }
    
    handleReplyClick(senderId, listingId) {
        console.log(listingId)
        this.show();
        this.setState({senderId: senderId, listingId: listingId})
    }
    
    handleMessageChange(message) {
        this.setState({
            messageText: message
        })
    }

    
    newMessage() {
        if(!this.state.messageText) {
            swal("Bad Message", "Message can't be empty", 'error');
        } else {
        const userId = this.props.user.user_id;
        const { senderId, messageText, listingId } = this.state;
        axios.post('http://localhost:3005/api/messages', {senderId: senderId, messageText: messageText, userId: userId, listingId: listingId})
        this.close();
        this.setState({messageText: '', senderId: null})
        swal("Message Sent", "", 'success');
        }
    }

    addGrail(newGrail, newGrailId, userId) {
        this.props.newGrail(newGrail, newGrailId, userId)
        this.props.history.push('/')
    }

    handleImageChange(imageURL) {
        this.setState({
            imageToShow: imageURL
        })
    }

    render() {
        console.log(this.props.listingImages)
        const thumbnailsToRender = this.props.listingImages.length ? this.props.listingImages.map( image => {
            var imageURL = image.image_url
            return imageURL === null ? null : <Thumbnail onClick={() => this.handleImageChange(imageURL)}src={`${image.image_url}`} className='thumbnails'/>
        }) : null

        const specificListing = this.props.listings[0] ? this.props.listings[0].filter( listing => listing.listing_id == this.props.match.params.id) : null;
       
        const specificListingUser = this.props.users[0] ? this.props.users[0].filter(user => user.user_id == specificListing[0].user_id) : null;
        const isGrail = this.props.userGrails.length ? this.props.userGrails[this.props.userGrails.length - 1].filter(grail => grail.listing_id == this.props.match.params.id) : null;       
       console.log(this.state.imageToShow)
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
                            <h3 className='message-modal-header'>Send {this.props.listings[0] ? specificListingUser[0].username : null} a message</h3>
                            <textarea value={this.state.messageText} onChange={(e) => this.handleMessageChange(e.target.value)} placeholder='message text...' className='message-input' />
                            <Button color='black' size='big' onClick={() => this.newMessage()}className='submit-button'>Send</Button>
                        </div>
                    </Modal>
                    <div className={this.state.show ? 'message-container-blur' : 'message-container'}>
                        <Row className='show-grid'>
                            <Col xs={12} md={9}>
                                <Card
                                className='large-card' 
                                image= {this.props.listings[0] ? this.state.imageToShow ? this.state.imageToShow : specificListing[0].image_url : null}
                                />
                                <Row className='show-grid thumbs-row'>
                                    <Col className='thumbs-column' md={9} xs={12}>
                                    {this.props.listings[0] ? <Thumbnail onClick={() => this.handleImageChange(specificListing[0].image_url)}src={specificListing[0].image_url} className='thumbnails'/> : null}
                                    {thumbnailsToRender}
                                    </Col>
                                </Row>
                            </Col>
                            <Col xs={12} md={3}>
                                <div className='side-bar'>
                                    <h2 className='heading'>{this.props.listings[0] ? specificListing[0].listing_name : null}</h2>
                                    <div className='price'>
                                        <b>${this.props.listings[0] ? specificListing[0].price : null}</b>
                                    </div>
                                    <div className='button-div'>
                                        <Button onClick={() => this.handleReplyClick(specificListingUser[0].user_id, specificListing[0].listing_id)} color='black'>PURCHASE</Button>
                                    </div>
                                    <div className='button-div'>
                                        <Button onClick={() => this.handleReplyClick(specificListingUser[0].user_id, specificListing[0].listing_id)} inverted color='green' >ASK A QUESTION</Button>
                                    </div>
                                    <div className='icon-div'>
                                        <button onClick={() => this.addGrail(specificListing[0], specificListing[0].listing_id, this.props.user.user_id)} className='icon-button'><Icon name={isGrail ? isGrail.length ? 'bookmark' : 'remove bookmark' : null} /></button>
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
        userGrails: state.userGrails,
        listingImages: state.listingImages
    }
}

export default connect(mapStateToProps, {newGrail, getGrails, getListingImages, getListings})(BigListing);