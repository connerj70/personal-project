import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getGrails, getListings } from '../../ducks/users';
import { Grid, Row, Col, Button } from 'react-bootstrap';
import { Card } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import './MyGrails.css';

class MyGrails extends Component {
    constructor(props) {
        super(props);

    }

    componentDidMount() {
        this.props.getGrails(this.props.user.user_id)
        this.props.getListings()
    }

    removeGrail(listingId) {
        
    }

    render() {
        
        var listingsIds = _.map(this.props.userGrails[0], 'listing_id');
        
        console.log(this.props.listings[0]);

        listingsIds = _.uniq(listingsIds)
        console.log(listingsIds);

        var listingsToRender = listingsIds.map( id => {
           return this.props.listings[0].map( listing => {
                if(listing.listing_id == id) {
                    return listing
                }
                
            })
        });


        listingsToRender = listingsToRender.map( listing => {
            return (
                _.remove(listing, function(value) {
                    return value != undefined;
                })
            )
        })

        

        listingsToRender = _.flattenDeep(listingsToRender);

        listingsToRender = listingsToRender.map( listing => {

            const URL = `/biglisting/${listing.listing_id}`;

            const price = (
                <div>
                    <div>
                        {"$" + listing.price}
                    </div>
                    <div className='remove-button'>
                        <Button onClick={() => this.removeGrail(listing.listing_id) } bsStyle='danger'>REMOVE</Button>
                    </div>
                </div>
            )

            return (
                <Link to={URL}>
                <Card
                className='small-listing'
                image={listing.image_url}
                header={listing.listing_brand}
                meta={listing.listing_name}
                description={listing.listing_description}
                extra={price}
                />
                </Link>
            )
        })

        return (
            <div>
                 <h1 className='my-grails-heading'>MY GRAILS</h1>
                <Grid>
                    <Row className='show-grid'> 
                        <Col xs={12}>
                        <div className='listings'>
                            {listingsToRender}
                        </div>
                        </Col>
                    </Row>
                </Grid>
            </div>
        )
    }
}

function mapStateToProps(state) {
   return {
    user: state.user,
    userGrails: state.userGrails,
    listings: state.listings
   } 
}

export default connect(mapStateToProps, {getGrails, getListings})(MyGrails);