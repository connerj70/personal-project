import React, {Component} from 'react';
import axios from 'axios';
import { Container, Grid, Tab, Header, Button } from 'semantic-ui-react';
import Modal, {closeStyle} from 'simple-react-modal';
import { getSentMessages, getRecievedMessages, getUsers } from '../../ducks/users.js';
import { connect } from 'react-redux';
import './Messages.css';
import ModalPop from '../ModalPop/ModalPop';

class Messages extends Component {
    constructor(props) {
        super(props)

        this.state = {
            show: false,
            messageText: '',
            senderId: null,
            userToSend: []
        }
    }

componentDidMount() {
    this.props.getSentMessages(this.props.user.user_id);
    this.props.getRecievedMessages(this.props.user.user_id);
    this.props.getUsers();
   
}

show(senderId) {
    
    const userToSet = this.props.users[0].filter( user => user.user_id == senderId)
    this.setState({userToSend: userToSet})
    this.setState({show: true}); 
    console.log(this.state.userToSend)
}

close() {
    this.setState({show: false});
}

handleReplyClick(senderId1) {
    console.log(senderId1)
    this.setState({senderId: senderId1}, this.show(senderId1));
    console.log(this.state)
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
    this.props.getSentMessages(userId);
    this.close();
    this.setState({messageText: '', senderId: null})
     }
}


    render() {

        const sentMessagesToRender = this.props.sentMessages.length ? this.props.sentMessages[0].map( message => {
            const recievingUser = this.props.users.length ? this.props.users[0].filter( user => user.user_id === message.reciever_id) : null
            
           return ( 
            <div className='message-div' recieverId={message.reciever_id}>
                <div className='message-content'>{message.message_content}</div>
                <div><b>Username:</b> <a>{recievingUser ? recievingUser[0].username : <div>Loading sent user...</div>}</a></div>
                <div className='email'><b>Email: </b><a>{recievingUser ? recievingUser[0].email : <div>Loading sent user email...</div>}</a></div>
            </div>
           )
        }) : null;

        const recievedMessagesToRender = this.props.recievedMessages.length ? this.props.recievedMessages[0].map( message => {
            const sendingUser = this.props.users.length ? this.props.users[0].filter( user => user.user_id === message.sender_id) : null
           return ( 
            <div className='message-div' senderId={message.sender_id}>
                <div className='message-content'>{message.message_content}</div>
                <div><b>Username:</b> {sendingUser ? sendingUser[0].username : <div>Loading user...</div>}</div>
                <div className='email'>email: {sendingUser ? sendingUser[0].email : <div>Loading user email...</div>}</div>
                <div>
                    <Button className='reply-button' onClick={() => this.handleReplyClick(message.sender_id)}>REPLY</Button>
                </div>
            </div>
           )
        }) : null;

        const panes = [
            { menuItem: 'Sent Messages', render: () => <Tab.Pane attached={false}>{this.props.sentMessages.length ? sentMessagesToRender : <div>Loading...</div>}</Tab.Pane> },
            { menuItem: 'Recieved Messages', render: () => <Tab.Pane attached={false}>{this.props.recievedMessages.length ? recievedMessagesToRender : <div>Loading...</div>}</Tab.Pane> },
        ]

        console.log(this.props.sentMessages);
        console.log(sentMessagesToRender);
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

export default connect(mapStateToProps, {getSentMessages, getRecievedMessages, getUsers})(Messages);