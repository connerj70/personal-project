import React, {Component} from 'react';
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
            senderId: null
        }
    }

componentDidMount() {
    this.props.getSentMessages(this.props.user.user_id);
    this.props.getRecievedMessages(this.props.user.user_id);
    this.props.getUsers();
   
}

show(senderId) {
    this.setState({show: true, senderId: senderId});
}

close() {
    this.setState({show: false});
}

handleMessageChange(message) {
    this.setState({
        messageText: message
    })
    console.log(this.state.messageText)
}

    render() {
       

        const sentMessagesToRender = this.props.sentMessages.length ? this.props.sentMessages[0].map( message => {
            const recievingUser = this.props.users.length ? this.props.users[0].filter( user => user.user_id === message.reciever_id) : null
            
           return ( 
            <div className='message-div' recieverId={message.reciever_id}>
                {message.message_content}
                <div>Username: <a>{recievingUser ? recievingUser[0].username : <div>Loading sent user...</div>}</a></div>
                <div>email: <a>{recievingUser ? recievingUser[0].email : <div>Loading sent user email...</div>}</a></div>
            </div>
           )
        }) : null;

        const recievedMessagesToRender = this.props.recievedMessages.length ? this.props.recievedMessages[0].map( message => {
            const sendingUser = this.props.users.length ? this.props.users[0].filter( user => user.user_id === message.sender_id) : null
           return ( 
            <div className='message-div' senderId={message.sender_id}>
                <div className='message-content'>{message.message_content}</div>
                <div>Username: <a>{sendingUser ? sendingUser[0].username : <div>Loading user...</div>}</a></div>
                <div>email: <a>{sendingUser ? sendingUser[0].email : <div>Loading user email...</div>}</a></div>
                <div>
                    <button onClick={this.show.bind(this)}>Reply</button>
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
            <div className='message-container'>
                <Container>
                    <Grid>
                        <Grid.Row columns={1}>
                            <Grid.Column>
                                <Tab panes={panes} menu={{secondary: true, pointing: true}} />
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                    <Modal
                    className="test-class" //this will completely overwrite the default css completely 
                    containerClassName="test"
                    closeOnOuterClick={true}
                    show={this.state.show}
                    onClose={this.close.bind(this)}>
                
                    <a className='xer' onClick={this.close.bind(this)}>X</a>
                    <div>
                        <h3>New Message</h3>
                        <textarea onChange={(e) => this.handleMessageChange(e.target.value)} placeholder='message text...' className='message-input' />
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