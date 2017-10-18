import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import stripe from './stripeKey';
import './About.css';
import axios from 'axios';
import { Grid, Row, Col } from 'react-bootstrap';

class About extends Component {
    constructor(props) {
        super(props);

        this.state = {
            donationAmount: '',
            active: null
        }
    }

    onToken = (token) => {
        token.card = void 0;
        console.log('token', token);
        axios.post('http://localhost:3535/api/payment', { token, amount: this.state.donationAmount } ).then(response => {
          alert('we are in business')
        });
      }

      handleAmountClick(value, active) {
        this.setState({donationAmount: value, active: active})
      }

    render() {
        return (
            <Grid>
                <Row className='show-grid'>
                    <Col className='main-col' xs={12}>
                        <div className='about-wrapper'>
                            <div  className='about-section1'>
                                <h1>Grail / gräel / (noun)</h1>
                                <p>that specific piece you obsess over owning, but can’t ever find or afford
                                    <br />
                                    <br />
                                    Grailed is a curated community marketplace for men’s clothing. Our goal is to make great clothing affordable and available to everyone.
                                    <br />
                                    <br />
                                    It’s hard to find that perfect item, especially at the right price. That’s why we built Grailed. Each piece is sourced directly from the closets of like-minded fashion-conscious individuals. Not only is our catalog highly curated, but since every item is secondhand our prices are unbeatable. It’s the single best way to build your wardrobe with high-quality, stylish pieces.
                                    <br />
                                    <br />
                                    Saving up for your Grail? Have great clothes you rarely wear? Turn your closet into cash by posting your clothing for sale right now.
                                </p>
                            </div>
                            <div className='donation-div'>
                                <button onClick={() => this.handleAmountClick('1', 1)} className={ this.state.active == 1 ? 'donate-amount-button-active' : 'donate-amount-button'}>$1</button>
                                <button onClick={() => this.handleAmountClick('5', 2)} className={ this.state.active == 2 ? 'donate-amount-button-active' : 'donate-amount-button'}>$5</button>
                                <button onClick={() => this.handleAmountClick('10', 3)} className={ this.state.active == 3 ? 'donate-amount-button-active' : 'donate-amount-button'}>$10</button>
                                <button onClick={() => this.handleAmountClick('20', 4)} className={ this.state.active == 4 ? 'donate-amount-button-active' : 'donate-amount-button'}>$20</button>
                                <button onClick={() => this.handleAmountClick('100', 5)} className={ this.state.active == 5 ? 'donate-amount-button-active' : 'donate-amount-button'}>$100</button>
                            </div>
                            <StripeCheckout
                            name="Sangraal"
                            bitcoin
                            panelLabel = "Donate"
                            token={this.onToken}
                            stripeKey={ stripe.pub_key }
                            amount={this.state.donationAmount * 100}
                            data-label="Donate"
                            ><button className="donate-button">
                            DONATE
                            </button></StripeCheckout>
                        </div>
                    </Col>
                </Row>
            </Grid>
        )
    }
}

export default About;