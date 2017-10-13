import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import { Card } from 'semantic-ui-react';
import { connect } from 'react-redux';
import './BigListing.css'

class BigListing extends Component {
    render() {
        //console.log(this.props.match.params.id);
        const specificListing = this.props.listings[0] ? this.props.listings[0].filter( listing => listing.listing_id == this.props.match.params.id) : null;
        console.log(specificListing);
        
        const specificListingUser = this.props.users[0] ? this.props.users[0].filter(user => user.user_id == specificListing[0].user_id): null;
        console.log(specificListingUser)

        const extra = this.props.listings[0] ? (
            <div>
                <div>
                   Size: {specificListing[0].size}
                </div>
                <div>
                    Category: {specificListing[0].category}
                </div>
                <div>
                    Condition: {specificListing[0].condition}
                </div>
                <div>
                    Brand: {specificListing[0].brand}
                </div>
                <div>
                    User: {specificListingUser[0].username}
                </div>
            </div>
        ) : null;

        return (
            <div>
                <Grid>
                    <Row className='show-grid'>
                        <Col xs={12}>
                            <Card
                            className='large-card' 
                            image= {this.props.listings[0] ? specificListing[0].image_url : null}
                            header= {this.props.listings[0] ? specificListing[0].listing_name : null}
                            meta= {this.props.listings[0] ? specificListing[0].price : null}
                            description= {this.props.listings[0] ? specificListing[0].description : null}
                            extra={extra}
                            />
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
        users: state.users
    }
}

export default connect(mapStateToProps)(BigListing);