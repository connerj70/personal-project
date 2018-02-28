import React, { Component } from "react";
import StripeCheckout from "react-stripe-checkout";
import stripe from "./stripeKey";
import "./About.css";
import axios from "axios";
import { Grid, Row, Col } from "react-bootstrap";

class About extends Component {
    constructor(props) {
        super(props);

        this.state = {
            donationAmount: "",
            active: null
        };
    }

    onToken = token => {
        token.card = void 0;
        console.log("token", token);
        axios
            .post("http://localhost:3535/api/payment", {
                token,
                amount: this.state.donationAmount
            })
            .then(response => {
                alert("we are in business");
            });
    };

    handleAmountClick(value, active) {
        this.setState({ donationAmount: value, active: active });
    }

    render() {
        return (
            <Grid>
                <div className="show-grid about-one">
                    <div className="main-col" xs={12}>
                        <div className="about-wrapper">
                            <div className="about-section1">
                                <h1>Grail / gräel / (noun)</h1>
                                <p>
                                    that specific piece you obsess over owning,
                                    but can’t ever find or afford
                                    <br />
                                    <br />
                                    Grailed is a curated community marketplace
                                    for men’s clothing. Our goal is to make
                                    great clothing affordable and available to
                                    everyone.
                                    <br />
                                    <br />
                                    It’s hard to find that perfect item,
                                    especially at the right price. That’s why we
                                    built Grailed. Each piece is sourced
                                    directly from the closets of like-minded
                                    fashion-conscious individuals. Not only is
                                    our catalog highly curated, but since every
                                    item is secondhand our prices are
                                    unbeatable. It’s the single best way to
                                    build your wardrobe with high-quality,
                                    stylish pieces.
                                    <br />
                                    <br />
                                    Saving up for your Grail? Have great clothes
                                    you rarely wear? Turn your closet into cash
                                    by posting your clothing for sale right now.
                                </p>
                            </div>

                            <div className="donation-container">
                                <div className="donation-div1">
                                    <div className="donation-div">
                                        <button
                                            onClick={() =>
                                                this.handleAmountClick("1", 1)
                                            }
                                            className={
                                                this.state.active == 1
                                                    ? "donate-amount-button-active"
                                                    : "donate-amount-button"
                                            }
                                        >
                                            $1
                                        </button>
                                        <button
                                            onClick={() =>
                                                this.handleAmountClick("5", 2)
                                            }
                                            className={
                                                this.state.active == 2
                                                    ? "donate-amount-button-active"
                                                    : "donate-amount-button"
                                            }
                                        >
                                            $5
                                        </button>
                                        <button
                                            onClick={() =>
                                                this.handleAmountClick("10", 3)
                                            }
                                            className={
                                                this.state.active == 3
                                                    ? "donate-amount-button-active"
                                                    : "donate-amount-button"
                                            }
                                        >
                                            $10
                                        </button>
                                        <button
                                            onClick={() =>
                                                this.handleAmountClick("20", 4)
                                            }
                                            className={
                                                this.state.active == 4
                                                    ? "donate-amount-button-active"
                                                    : "donate-amount-button"
                                            }
                                        >
                                            $20
                                        </button>
                                        <button
                                            onClick={() =>
                                                this.handleAmountClick("100", 5)
                                            }
                                            className={
                                                this.state.active == 5
                                                    ? "donate-amount-button-active"
                                                    : "donate-amount-button"
                                            }
                                        >
                                            $100
                                        </button>
                                    </div>
                                </div>
                                <StripeCheckout
                                    name="Sangraal"
                                    bitcoin
                                    panelLabel="Donate"
                                    token={this.onToken}
                                    stripeKey={stripe.pub_key}
                                    amount={this.state.donationAmount * 100}
                                    data-label="Donate"
                                >
                                    <button className="donate-button">
                                        DONATE
                                    </button>
                                </StripeCheckout>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="show-grid">
                    <div xs={12}>
                        <div className="jobs-container">
                            <h1 className="about_jobs-header">Jobs</h1>
                            <p className="about_jobs-paragraph">
                                We are always looking for talented individuals
                                to join our NYC-based team. Our team is full of
                                people who are passionate about fashion and
                                committed to constantly improving our community
                                marketplace.
                            </p>
                            <p className="about_jobs-paragraph">
                                Interested in working with us? We are always
                                hiring engineers, and you can see all job
                                postings here.
                            </p>
                            <p className="about_jobs-paragraph">
                                Don't see what you're looking for? Send us an
                                email at jobs@grailed.com and tell us about
                                yourself. Please make sure to attach a CV and
                                relevant work experience.
                            </p>
                        </div>
                    </div>
                </div>

                <div>
                    <div>
                        <div className="code-of-conduct">
                            <h1 className="about_code-header">
                                Marketplace Code of Conduct
                            </h1>
                            <ol className="about_rules-list">
                                <li>
                                    Be respectful when dealing with other users.
                                    Bad behavior will not be tolerated.
                                </li>
                                <li>Follow rule #1.</li>
                                <li>
                                    Do not send frivolous offers. We understand
                                    that you cannot always follow through, but
                                    you should make a good faith effort to do so
                                    on each and every offer you make.
                                </li>
                                <li>
                                    Do not sell fake or replica items. Any
                                    seller doing so will be banned.
                                </li>
                                <li>
                                    Ship items you sell in a timely manner,
                                    ideally within 72 hours and no longer than 5
                                    days after purchase.
                                </li>
                                <li>
                                    Be honest and accurate in your item
                                    descriptions. Make sure to highlight any
                                    flaws or distinctive details.
                                </li>
                                <li>
                                    Communicate well. Keep buyers updated on the
                                    status of their orders and send tracking
                                    whenever possible.
                                </li>
                                <li>
                                    Respect the Grailed Curation team. Items are
                                    moved and deleted at their discretion.
                                </li>
                                <li>
                                    Do not advertise your items in any of the
                                    comment sections (listings or editorial
                                    articles). These sections are designated for
                                    discussion and any solicitations will be
                                    removed.
                                </li>
                            </ol>
                        </div>
                    </div>
                </div>
            </Grid>
        );
    }
}

export default About;
