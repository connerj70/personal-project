import React, { Component } from 'react';
import './ModalPop.css'

class ModalPop extends Component {

    render() {
        return (
            <div>
                <button onClick={() => this.props.open()}>Reply</button>
                
                <div className={ this.props.isOpen ? 'modal-popper-open' : 'modal-popper-hide'}>
                    <textarea placeholder='write your message here' />
                    <button>Send</button>
                    <button onClick={() => this.props.close()}>Close</button>
                </div>
            </div>
        )
    }
}

export default ModalPop;
