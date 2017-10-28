import React, {Component} from 'react';
import axios from 'axios';
import { Container, Grid, Tab, Header, Button } from 'semantic-ui-react';
import Modal, {closeStyle} from 'simple-react-modal';
import { getSentMessages, getRecievedMessages, getUsers, addMessage, getMessageListings } from '../../ducks/users.js';
import { connect } from 'react-redux';
import './Messages.css';
import ModalPop from '../ModalPop/ModalPop';
import swal from 'sweetalert';

class Messages extends Component {
    constructor(props) {
        super(props)

        this.state = {
            show: false,
            messageText: '',
            senderId: null,
            userToSend: [],
            hiddenMessage: false,
            messageImages: []
        }
    }

componentDidMount() {
    this.props.getSentMessages(this.props.user.user_id);
    this.props.getRecievedMessages(this.props.user.user_id);
    this.props.getUsers();
    axios.get('http://localhost:3005/api/mesimages')
    .then(res => {
        console.log(res.data)
        this.setState({
            messageImages: res.data
        })
    })
}

show(senderId) {
    
    const userToSet = this.props.users[0].filter( user => user.user_id == senderId)
    this.setState({userToSend: userToSet})
    this.setState({show: true}); 
}

close() {
    this.setState({show: false});
}

handleReplyClick(senderId1) {
    this.setState({senderId: senderId1}, this.show(senderId1));
}

handleMessageChange(message) {
    this.setState({
        messageText: message
    })
}

handleDivClick() {
    this.setState({
        hiddenMessage: !this.state.hiddenMessage
    })
}

newMessage() {
    if(!this.state.messageText) {
        swal("Bad Message", "Message can't be empty", "error");
     } else {
    const userId = this.props.user.user_id;
    const { senderId, messageText } = this.state;
    this.props.addMessage(senderId, messageText, userId)
    this.props.getSentMessages(userId);
    this.close();
    this.setState({messageText: '', senderId: null})
    swal("Message Sent", "", 'success');
     }
}


    render() {

        const sentMessagesToRender = this.props.sentMessages.length ? this.props.sentMessages[this.props.sentMessages.length - 1].map( message => {
            const recievingUser = this.props.users.length ? this.props.users[0].filter( user => user.user_id === message.reciever_id) : null
            // const messageImage = this.state.messageImages.length ? this.state.messageImages.filter(message2 => message2.message_id === message.message_id) : null
            
           return ( 
            <div>
            <div onClick={() => this.handleDivClick(message.message_id)} className='message-div' key={message.message_id} recieverId={message.reciever_id}>
                {/* <img className='message-image' src={messageImage ? messageImage[0].image_url : null} /> */}
                <div className='message-content'>{message.message_content}</div>
                <div><b>Username:</b> <a>{recievingUser ? recievingUser[0].username : <div>Loading sent user...</div>}</a></div>
                <div className='email'><b>Email: </b><a>{recievingUser ? recievingUser[0].email : <div>Loading sent user email...</div>}</a></div>
                
            </div>
            <div className={ this.state.hiddenMessage ? 'hidden-message-view' : 'hidden-message-hide'}>{message.message_content}</div>
            </div>
           )
        }) : null;

        const recievedMessagesToRender = this.props.recievedMessages.length ? this.props.recievedMessages[this.props.recievedMessages.length - 1].map( message => {
            const sendingUser = this.props.users.length ? this.props.users[0].filter( user => user.user_id === message.sender_id) : null
            const messageImage = this.state.messageImages.length ? this.state.messageImages.filter(message2 => message2.message_id === message.message_id) : null
            console.log(messageImage)
           return ( 
            <div>
            <div onClick={() => this.handleDivClick(message.message_id)} className='message-div' senderId={message.sender_id}>
                <img className='message-image' src={messageImage ? messageImage[0].image_url : null} />
                <div className='message-content'>{message.message_content}</div>
                <div><b>Username:</b> {sendingUser ? sendingUser[0].username : <div>Loading user...</div>}</div>
                <div className='email'>email: {sendingUser ? sendingUser[0].email : <div>Loading user email...</div>}</div>
                <div>
                    <Button className='reply-button' onClick={() => this.handleReplyClick(message.sender_id, messageImage.listing_id)}>REPLY</Button>
                </div>
            </div>
            <div className={ this.state.hiddenMessage ? 'hidden-message-view' : 'hidden-message-hide'}>{message.message_content}</div>
            </div>
           )
        }) : null;

        const panes = [
            { menuItem: 'Sent Messages', render: () => <Tab.Pane attached={false}>{this.props.sentMessages.length ? sentMessagesToRender : <div>Loading...</div>}</Tab.Pane> },
            { menuItem: 'Recieved Messages', render: () => <Tab.Pane attached={false}>{this.props.recievedMessages.length ? recievedMessagesToRender : <div>Loading...</div>}</Tab.Pane> },
        ]

        return (
            <div>
            
                <Container>
                    <div className={this.state.show ? 'message-container-blur' : 'message-container'}>
                        <Grid>
                            <Grid.Row columns={1}>
                                <Grid.Column>
                                    <Tab panes={panes} menu={{secondary: true, pointing: true}} />
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                     </div>
                    <Modal
                    className="test-class" //this will completely overwrite the default css completely 
                    containerClassName="test"
                    closeOnOuterClick={true}
                    show={this.state.show}
                    onClose={this.close.bind(this)}>
                
                        <a className='xer' onClick={this.close.bind(this)}>X</a>
                        <div>
                            {<h3 className='messages-modal-header'>New Message to { this.state.userToSend.length ? this.state.userToSend[0].username : null} </h3>}
                            <textarea value={this.state.messageText} onChange={(e) => this.handleMessageChange(e.target.value)} className='message-input' />
                            <Button color='black' size='big' onClick={() => this.newMessage()}className='submit-button'>Send</Button>
                        </div>

                    </Modal>
                </Container>
            </div>
        )
    }
}

function mapStateToProps(state) {
   return {
    user: state.user,
    sentMessages: state.sentMessages,
    recievedMessages: state.recievedMessages,
    users: state.users
   }
}

export default connect(mapStateToProps, {getSentMessages, getRecievedMessages, getUsers, addMessage})(Messages);