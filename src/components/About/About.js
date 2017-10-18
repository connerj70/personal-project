import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import './About.css';
import axios from 'axios';

class About extends Component {

    onToken = (token) => {
        token.card = void 0;
        console.log('token', token);
        axios.post('http://localhost:3535/api/payment', { token, amount: 100 } ).then(response => {
          alert('we are in business')
        });
      }

    render() {
        return (
            <div className='main-container'>
                <div>About Page</div>
                <StripeCheckout
                token={this.onToken}
                stripeKey={ stripe.pub_key }
                amount={1000}
                />
            </div>
        )
    }
}

export default About;